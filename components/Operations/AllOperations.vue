<script setup>
const emit = defineEmits(["refresh"]);
const { isTechnician } = storeToRefs(useAuthStore());
const { onMyWay, inProgress } = useTechnicianStore();
const { cancelOrder } = useMaintainStore();
const { formatToDateString } = useDateTimeFormate("ar");
const getStatus = useStatus();
const props = defineProps(["operations"]);
const panel = ref();
const cancelLoading = ref(false);
const { orderData } = storeToRefs(useMaintainStore());
const showModal = ref(false);
const showEditOrderModal = ref(false);
const id = ref(null);
const onWayLoading = ref(false);
const showPayment = ref(false);
const chosenOrder = ref(null);

const cancel = async () => {
  try {
    cancelLoading.value = true;
    await cancelOrder(id.value);
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
const changeStatus = async (item) => {
  try {
    onWayLoading.value = true;
    if (item?.current_status?.status === "technician_assigned") {
      await onMyWay(item.id);
      emit("refresh");
    } else if (item?.current_status?.status === "technician_on_the_way") {
      await inProgress(item.id);
      emit("refresh");
    } else if (item?.current_status?.status === "in_progress") {
      chosenOrder.value = item.id;
      showPayment.value = true;
    }
  } catch (error) {
    throw error;
  } finally {
    onWayLoading.value = false;
  }
};
</script>

<template>
  <div>
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

    <div class="d-flex align-center ga-2">
      <h2>
        {{ $t("operations.all_operations") }}
      </h2>
    </div>
    <v-expansion-panels v-if="operations.length" v-model="panel" class="mt-5">
      <v-row>
        <v-col cols="12" v-for="item in operations" :key="item.id">
          <v-expansion-panel class="border radius-16" elevation="0">
            <v-expansion-panel-title>
              <div class="d-flex align-center ga-2">
                <v-avatar
                  v-if="item?.products?.length"
                  size="48"
                  color="primary"
                >
                  <v-img :src="item?.products[0]?.image_url"></v-img>
                </v-avatar>
                <div>
                  <h3>{{ $t("operations." + item.type) }}</h3>
                  <p v-if="item.slot" class="text-12 mt-2 text-caption date">
                    {{
                      formatToDateString(item.slot.date) + " " + item.slot.time
                    }}
                  </p>
                </div>
              </div>
              <v-spacer></v-spacer>
              <v-chip :color="getStatus(item.current_status?.status)"
                >{{ "\u2022" }}
                {{ $t(`operations.${item.current_status?.status}`) }}
              </v-chip>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <!-- Details -->
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
                      :to="
                        localePath(
                          '/dashboard/operations/order-bill/' + item.id
                        )
                      "
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
                    {{
                      item.customer.first_name + " " + item.customer.last_name
                    }}
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
                :loading="onWayLoading"
                :disabled="onWayLoading"
                @click="changeStatus(item)"
                color="primary"
                block
                class="mt-7"
              >
                {{ $t(statusText(item?.current_status?.status)) }}
              </v-btn>
              <operations-feedback
                :id="item.id"
                v-if="
                  !isTechnician && item?.current_status?.status == 'completed'
                "
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
      </v-row>
    </v-expansion-panels>

    <h2 class="text-center mt-5" v-else>
      {{ $t("operations.no_operations") }}
    </h2>
  </div>
</template>

<style>
.date {
  color: #959595;
}
</style>
