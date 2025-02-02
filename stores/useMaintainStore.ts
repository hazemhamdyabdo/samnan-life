import { defineStore } from "pinia";
import type { CreateRequest } from "~/types/maintain/index";

export const useMaintainStore = defineStore("maintain", () => {
  const { $api } = useNuxtApp();
  const { isTechnician } = storeToRefs(useAuthStore());
  const orderData = ref<any>(null);
  const pagination = ref({
    currentPage: 1,
    lastPage: 1,
  });

  const createOrder = async (request: CreateRequest) => {
    const { momentLikeDate } = useDateTimeFormate();
    if (request.type === "emergency_maintenance") {
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

  const getSingleOrder = () => {
    return useAPI(`/maintenance-request/${orderData.value.id}`);
  };

  const getAllOrders = (params: any) => {
    return useAsyncData(() =>
      $api(isTechnician ? "/technician/requests" : "/maintenance-requests", {
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
      })
    );
  };

  const cancelOrder = (id: number) => {
    return useAPI(`/maintenance-request/${id}/cancel`, {
      method: "POST",
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
  };
});
