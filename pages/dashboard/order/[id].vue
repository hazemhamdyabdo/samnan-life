<template>
  <div>
    <!-- NOTE: change status  MODAL -->
    <app-modal
      :title="$t('operations.change_status')"
      :text="$t('operations.enter_note')"
      v-model:dialog="showChangeStatusModal"
      :isLoading="onWayLoading"
      @submit="changeStatus"
    >
      <v-form class="mt-5">
        <v-textarea
          hide-details
          item-title="name"
          v-model="note"
          :placeholder="$t('operations.enter_note')"
          item-value="id"
          return-object
        ></v-textarea>
      </v-form>
    </app-modal>

    <operations-enter-payment
      v-if="showPayment"
      v-model="showPayment"
      :id="chosenOrder"
      @refresh="emit('refresh')"
    />

    <app-modal
      :title="$t('operations.cancel_order')"
      :text="$t('operations.cancel_order_desc')"
      icon="box-remove"
      v-model:dialog="showModal"
      isDelete
      :is-loading="cancelLoading"
      @submit="cancel"
    ></app-modal>

    <app-modal
      :title="$t('operations.edit_order')"
      :text="$t('operations.choose_new_time')"
      icon="calendar-edit"
      v-model:dialog="showEditOrderModal"
      :is-loading="cancelLoading"
      hide-actions
      @submit="cancel"
    >
      <template #default>
        <operations-create-order-choose-date-time
          popUp
          @closeModal="showEditOrderModal = false"
        />
      </template>
    </app-modal>

    <v-card class="pa-5" rounded="xl">
      <v-chip class="mb-10" :color="getStatus(item.current_status?.status)"
        >{{ "\u2022" }}
        {{ $t(`operations.${item.current_status?.status}`) }}
      </v-chip>

      <operations-tech-request v-if="isTechnician" :item="item" />
      <operations-client-request
        @delete="
          id = item.id;
          showModal = true;
        "
        @edit="
          showEditOrderModal = true;
          orderData = { id: item.id };
        "
        v-else
        :item="item"
      />

      <!-- payment details -->
      <div v-if="item?.invoice">
        <v-divider class="mt-7"></v-divider>
        <div class="mt-7">
          <div class="d-flex align-center">
            <h5 class="text-14">
              {{ $t("operations.payment_details") }}
            </h5>
            <v-spacer></v-spacer>
            <nuxt-link
              class="text-primary text-12 d-flex align-center ga-3"
              :to="localePath('/dashboard/operations/order-bill/' + item.id)"
            >
              <AppSvgIcon name="document-normal" />
              <span>{{ $t("operations.view_bill") }}</span>
            </nuxt-link>
          </div>

          <div class="d-flex align-center ga-3 mt-2">
            <h5 class="text-14">
              {{ $t("operations.total") }}
            </h5>
            <v-spacer></v-spacer>
            <h5 class="text-14">{{ item?.invoice.total }} ر.س</h5>
          </div>
        </div>
      </div>

      <!-- review -->
      <v-divider class="mt-7"></v-divider>
      <div v-if="item.feedback" class="mt-7">
        <div class="d-flex align-center ga-2">
          <h5>
            {{ item.customer.first_name + " " + item.customer.last_name }}
          </h5>
          <span class="d-flex align-center text-14">
            {{ item.feedback?.rating }}
            <v-icon color="#FFD33C">mdi-star</v-icon>
          </span>
        </div>
        <h5>{{ item.feedback?.feedback_text }}</h5>
        <div class="date text-12">
          {{ formatToDateString(item.feedback?.updated_at) }}
        </div>
      </div>

      <v-btn
        v-if="isTechnician && showAction(item?.current_status?.status)"
        @click="showStatusModal(item)"
        color="primary"
        block
        class="mt-7"
      >
        {{ $t(statusText(item?.current_status?.status)) }}
      </v-btn>
      <operations-feedback
        :id="item.id"
        v-if="!isTechnician && item?.current_status?.status == 'completed'"
      />
    </v-card>
  </div>
</template>

<script setup>
const emit = defineEmits(["refresh"]);
const { isTechnician } = storeToRefs(useAuthStore());
const { onMyWay, inProgress } = useTechnicianStore();
const { cancelOrder } = useMaintainStore();
const { formatToDateString } = useDateTimeFormate("ar");
const getStatus = useStatus();
const props = defineProps(["operations"]);
const cancelLoading = ref(false);
const onWayLoading = ref(false);
const showPayment = ref(false);
const chosenOrder = ref(null);
const { getSingleOrder, setPayMethod } = useMaintainStore();
const { orderData } = storeToRefs(useMaintainStore());
const item = ref({});
const showModal = ref(false);
const showEditOrderModal = ref(false);
const id = ref(null);
const showChangeStatusModal = ref(false);
const note = ref("");

const { data } = await getSingleOrder(useRoute().params.id);
item.value = data.value.data;

const cancel = async () => {
  try {
    cancelLoading.value = true;
    await cancelOrder(id.value);
    emit("refresh");
  } catch (error) {
    throw error;
  } finally {
    showModal.value = false;
    cancelLoading.value = false;
  }
};

const showAction = (status) => {
  if (
    status === "technician_assigned" ||
    status === "technician_on_the_way" ||
    status === "in_progress"
  ) {
    return true;
  }
};

const statusText = (status) => {
  if (status === "technician_assigned") {
    return "operations.on_my_way";
  } else if (status === "technician_on_the_way") {
    return "operations.in_progress";
  } else {
    return "operations.waiting_for_payment";
  }
};

const changeStatus = async () => {
  try {
    if (item.value?.current_status?.status === "technician_assigned") {
      onWayLoading.value = true;
      await onMyWay(item.value.id, note.value);
      emit("refresh");
    } else if (item.value?.current_status?.status === "technician_on_the_way") {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;

            const data = {
              id: item.value.id,
              note: note.value,
              lat,
              long,
            };

            try {
              onWayLoading.value = true;

              await inProgress(data);
              emit("refresh");
              showChangeStatusModal.value = false;
              onWayLoading.value = false;
            } catch {}
          },
          (error) => {
            console.error("Error getting location:", error.message);
          }
        );
      } else {
        alrt("Geolocation is not supported by this browser.");
      }
    }
  } catch (error) {
    throw error;
  } finally {
    onWayLoading.value = false;
  }
};

const showStatusModal = (data) => {
  if (data?.current_status?.status === "in_progress") {
    chosenOrder.value = data.id;
    showPayment.value = true;
    return;
  }
  item.value = data;
  showChangeStatusModal.value = true;
};
</script>

<style>
.date {
  color: #959595;
}
</style>
