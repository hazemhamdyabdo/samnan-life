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

  const sapProducts = ref([
    {
      id: 1,
      sap_id: "33443",
      name_ar: "اختبار",
      name_en: "test",
      description_ar: "fdfd",
      description_en: "fdfd",
      image: "01JFNWGKBPCTDWMFE5PKY713WP.png",
      category_id: 1,
      created_at: "2024-12-21T22:33:13.000000Z",
      updated_at: "2024-12-21T22:33:13.000000Z",
      name: "test",
      description: "fdfd",
      category_name: "test",
      image_url:
        "https://app.rezeqstore.com/public/storage/01JFNWGKBPCTDWMFE5PKY713WP.png",
      category: {
        id: 1,
        name_ar: "اختبار",
        name_en: "test",
        created_at: "2024-12-21T22:31:33.000000Z",
        updated_at: "2024-12-21T22:31:33.000000Z",
        name: "test",
      },
    },
    {
      id: 2,
      sap_id: "5656",
      name_ar: "برادة سمنان الذكية",
      name_en: "Samnan water purifier",
      description_ar: "برادة سمنان الذكية",
      description_en:
        "It provides 300L per day, and can be self-filled by connecting it to a water source.",
      image: "01JFX9DJRQ4Q5V9AGJRR07CHV6.webp",
      category_id: 3,
      created_at: "2024-12-24T19:33:26.000000Z",
      updated_at: "2024-12-24T19:38:57.000000Z",
      name: "Samnan water purifier",
      description:
        "It provides 300L per day, and can be self-filled by connecting it to a water source.",
      category_name: "coolers",
      image_url:
        "https://app.rezeqstore.com/public/storage/01JFX9DJRQ4Q5V9AGJRR07CHV6.webp",
      category: {
        id: 3,
        name_ar: "البرادات",
        name_en: "coolers",
        created_at: "2024-12-24T19:38:17.000000Z",
        updated_at: "2024-12-24T19:38:17.000000Z",
        name: "coolers",
      },
    },
  ]);
  const sapNom = ref("");
  const getSapOrder = async (id: number) => {
    const { data } = await useAPI(`/sap-order/${id}`);
    sapProducts.value = data.value.data;
    sapNom.value = id;
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
    getSapOrder,
    sapProducts,
    sapNom,
  };
});
