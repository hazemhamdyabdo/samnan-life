import { defineStore } from "pinia";
import type { CreateRequest } from "~/types/maintain/index";

export const useMaintainStore = defineStore("maintain", () => {
  const orderData = ref<any>(null);
  const createOrder = async (request: CreateRequest) => {
    const { momentLikeDate } = useDateTimeFormate();
    if (request.type === "emergency_maintenance") {
      delete request.last_maintenance_date;
    } else {
      request.last_maintenance_date = momentLikeDate(
        request.last_maintenance_date
      );
    }

    const { data, error } = await useAPI("/maintenance-request", {
      method: "POST",
      body: request,
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

  const confirmOrder = async ({
    request_id,
    slot_id,
  }: {
    request_id: number;
    slot_id: number;
  }) => {
    const { data, error } = await useAPI("/maintenance-request/assign", {
      method: "POST",
      body: {
        request_id,
        slot_id,
      },
    });

    if (error.value) {
      throw new Error(error.value.message);
    }
  };
  return { createOrder, getAvailableSlot, confirmOrder, orderData };
});
