<template>
  <div>
    <div class="d-flex align-center mb-3">
      <h2>{{ $t("dashboard.sidebar.my_appointments") }}</h2>
      <v-spacer></v-spacer>
      <v-date-input
        bg-color="white"
        max-width="300"
        class="mt-4"
        dir="rtl"
        variant="outlined"
        color="primary"
        @keydown.prevent
        hide-details="auto"
        :width="'100%'"
        prepend-icon=""
        append-inner-icon="mdi-calendar-outline"
        rounded="xl"
        multiple="range"
        v-model="date"
        clearable
        @click:clear="maintainStore.getAllOrders()"
      />
    </div>
    <div class="my-appointments">
      <div
        v-for="item in allOperations"
        :key="item.id"
        class="d-flex item align-center ga-2 mb-5"
      >
        <span>{{ item.slot.time }}</span>
        <div class="bullet"></div>
        <v-card rounded="xl" class="flex-grow-1">
          <v-card-text>
            <div class="d-flex">
              <h2 class="mb-1">{{ item.products[0].name }}</h2>
              <v-spacer></v-spacer>
              <v-chip :color="getStatus(item.current_status?.status)">
                {{ "\u2022" }}
                {{ $t(`operations.${item.current_status?.status}`) }}
              </v-chip>
            </div>
            <h5 class="text-primary mb-3">
              {{ $t("operations." + item.type) }}
            </h5>
            <div class="d-flex align-center ga-2">
              <app-svg-icon size="sm" name="location" />
              <div>
                <p class="text-12 mt-2 text-caption date">
                  {{ item?.address?.name }}, {{ item?.address?.street }}
                </p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <div
      v-if="pagination.currentPage < pagination.lastPage"
      class="d-flex justify-center mt-10"
    >
      <v-btn @click="loadMore" color="primary">
        {{ $t("buttons.load_more") }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
const date = ref(null);
const getStatus = useStatus();
const maintainStore = useMaintainStore();
const { pagination } = storeToRefs(maintainStore);
const allOperations = ref([]);
const filters = ref({});

const { momentLikeDate } = useDateTimeFormate();

const setFilter = async () => {
  pagination.value.currentPage = 1;
  filters.value.start_date = momentLikeDate(date.value[0]);
  filters.value.end_date = momentLikeDate(date.value[date.value.length - 1]);
  await refresh();
};

const { data, status, refresh } = await maintainStore.getAllOrders(
  filters.value
);

console.log(data);
watch(
  () => date.value,
  () => {
    setFilter();
  }
);

watch(
  () => data.value,
  () => {
    allOperations.value = data.value?.data.data;
  },
  { deep: true, immediate: true }
);

const loadMore = async () => {
  pagination.value.currentPage += 1;
  await refresh();
};
</script>

<style lang="scss" scoped>
.my-appointments {
  .item {
    .bullet {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: rgba(var(--v-theme-primary), 1);
      position: relative;
    }
    &:not(:last-of-type) {
      .bullet {
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 2px;
          width: 1px;
          height: 139px;
          border: 1px dashed rgba(var(--v-theme-primary), 1);
        }
      }
    }
  }
}
</style>
