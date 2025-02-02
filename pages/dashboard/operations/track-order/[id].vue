<template>
  <v-card rounded="xl" class="track-order h-100">
    <v-card-text>
      <h2>{{ $t("operations.track_order") }}</h2>
      <div v-if="stepper != 6">
        <v-stepper flat bg-color="transparent" v-model="stepper">
          <v-stepper-header>
            <template v-for="step in steps" :key="step.id">
              <v-stepper-item
                class="px-0"
                :value="step.id"
                :color="stepper >= step.id ? 'success' : ''"
                :complete="stepper >= step.id"
                bg-color="red"
              >
                <template #icon>
                  <AppSvgIcon name="check"></AppSvgIcon>
                </template>
              </v-stepper-item>

              <div
                v-if="step.id !== steps.length"
                :class="['custom-divider', stepper >= step.id ? 'done' : '']"
              ></div>
            </template>
          </v-stepper-header>

          <v-stepper-window class="ma-0">
            <v-stepper-window-item
              v-for="step in steps"
              :key="step.id"
              :value="step.id"
            >
              <v-card flat color="#E9EFFF" rounded="lg">
                <v-card-text>
                  <h6 class="text-primary-dark font-weight-medium">
                    {{ $t(`operations.track_order_stages.${step.id}`) }}
                  </h6>
                  <h6 class="mt-2">
                    {{ $t(`operations.track_order_stages.${step.id}_desc`) }}
                  </h6>
                  <h6 class="font-weight-light mt-2 text-grey">
                    {{ dateAndTime(order?.current_status?.created_at) }}
                  </h6>
                </v-card-text>
              </v-card>
              <v-img
                class="mx-auto mt-10"
                contain
                max-height="279px"
                max-width="327px"
                :src="`/images/track-order-${step.id}.svg`"
                :lazy-src="`/images/track-order-${step.id}.svg`"
              />
            </v-stepper-window-item>
          </v-stepper-window>
        </v-stepper>
      </div>

      <div v-else>
        <v-card flat color="#E9EFFF" rounded="lg">
          <v-card-text>
            <h6 class="text-primary-dark font-weight-medium">
              {{ $t(`operations.track_order_stages.${stepper}`) }}
            </h6>
            <h6 class="mt-2">
              {{ $t(`operations.track_order_stages.${stepper}_desc`) }}
            </h6>
            <h6 class="font-weight-light mt-2 text-grey">
              {{ dateAndTime(order?.current_status?.created_at) }}
            </h6>
          </v-card-text>
        </v-card>
        <v-img
          class="mx-auto mt-10"
          contain
          max-height="279px"
          max-width="327px"
          :src="`/images/track-order-${stepper}.svg`"
          :lazy-src="`/images/track-order-${stepper}.svg`"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
const { dateAndTime } = useDateTimeFormate();
const stepper = ref(null);
const order = ref(null);

const currentStatus = ref(null);
const statuses = [
  // "pending",
  // "technician_assigned",
  // "technician_on_the_way",
  // "in_progress",
  // "waiting_for_payment",
  // "completed",
  // "canceled",
  "pending",
  "technician_assigned",
  "technician_on_the_way",
  "in_progress",
  "waiting_for_payment",
  "waiting_for_technician_confirm_payment",
  "completed",
  "canceled",
];

const steps = ref([
  {
    id: 1,
    status: "pending", // depend on backend status
  },
  {
    id: 2,
    status: "technician_on_the_way", // depend on backend status
  },
  {
    id: 3,
    status: "in_progress", // depend on backend status
  },
  {
    id: 4,
    status: "waiting_for_payment", // depend on backend status
  },
  {
    id: 5,
    status: "completed", // depend on backend status
  },
  {
    id: 6,
    status: "canceled", // depend on backend status
  },
]);

const { data } = await useAPI(`/maintenance-request/${useRoute().params.id}`);
order.value = data.value?.data;

currentStatus.value = order.value?.current_status?.status;

watch(
  () => currentStatus.value,
  () => {
    const index = statuses.findIndex((s) => {
      return s === currentStatus.value;
    });

    if (index !== -1) {
      stepper.value = index;
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.track-order {
  .custom-divider {
    width: 100%;
    height: 2px;
    background-image: linear-gradient(to right, #b6b6b6 53%, white 0%);
    background-position: bottom;
    background-size: 9px 2px;
    background-repeat: repeat-x;

    &.done {
      background-image: linear-gradient(
        to right,
        rgba(var(--v-theme-success), 1) 53%,
        white 0%
      );
    }
  }

  :deep(.v-stepper) {
    .v-avatar {
      margin: 0;
      padding: 3px;
    }
    .v-stepper-header {
      box-shadow: none;
    }
  }
}
</style>
