import { defineStore } from "pinia";
import type { CreateRequest } from "~/types/maintain/index";

export const useMaintainStore = defineStore("maintain", () => {
  const { $api } = useNuxtApp();
  const { showSuccess } = useAlertStore();

  const isTechnician = useCookie<boolean | null>("isTechnician");
  const orderData = ref<any>(null);
  const pagination = ref({
    currentPage: 1,
    lastPage: 1,
  });

  const createOrder = async (request: CreateRequest) => {
    const { momentLikeDate } = useDateTimeFormate();
    if (
      request.type === "emergency_maintenance" ||
      !request.last_maintenance_date
    ) {
      delete request.last_maintenance_date;
    } else {
      request.last_maintenance_date = momentLikeDate(
        request.last_maintenance_date
      );
    }

    const formData = useFormData(request);
    const { data, error } = await useAPI("/maintenance-request", {
      method: "POST",
      body: formData,
      watch: false,
    });

    orderData.value = data.value.data;
    if (error.value) {
      throw new Error(error.value.message);
    }
  };

  const getAvailableSlot = (date: string) => {
    const { momentLikeDate } = useDateTimeFormate();
    return useAPI("/get-available-slots", {
      method: "POST",
      body: {
        request_id: orderData.value.id,
        date: momentLikeDate(date),
      },
    });
  };

  const confirmOrder = (slot_id: number) => {
    return useAPI("/maintenance-request/assign", {
      method: "POST",
      body: {
        request_id: orderData.value.id,
        slot_id,
      },
    });
  };

  const getSingleOrder = (id: number) => {
    return useAPI(`/maintenance-request/${id ? id : orderData.value.id}`);
  };

  const getAllOrders = (params: any) => {
    return useAsyncData(() =>
      $api(
        isTechnician.value ? "/technician/requests" : "/maintenance-requests",
        {
          query: {
            ...params,
            per_page: 5,
            page: pagination.value.currentPage,
          },
          onResponse: ({ response }) => {
            pagination.value = {
              currentPage: response._data.data.current_page,
              lastPage: response._data.data.last_page,
            };
          },
        }
      )
    );
  };

  const cancelOrder = async (id: number) => {
    const { data } = await useAPI(`/maintenance-request/${id}/cancel`, {
      method: "POST",
    });

    showSuccess(data.value.message);
    return data;
  };

  const setPayMethod = (id: number, method: string) => {
    return useAPI(`/maintenance-request/${id}/set-payment-method`, {
      method: "POST",
      body: {
        payment_method: method,
      },
    });
  };

  const sendFeedback = (id: number, data: any) => {
    return useAPI(`/maintenance-request/${id}/submit-feedback`, {
      method: "POST",
      body: data,
    });
  };
  return {
    createOrder,
    getAvailableSlot,
    confirmOrder,
    orderData,
    getSingleOrder,
    getAllOrders,
    cancelOrder,
    pagination,
    setPayMethod,
    sendFeedback,
  };
});
