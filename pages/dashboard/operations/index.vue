<script setup>
const maintainStore = useMaintainStore();
const { pagination } = storeToRefs(maintainStore);
const allOperations = ref([]);
const filtering = ref(false);
const filters = ref({
  "types[]": [],
  "statuses[]": [],
});

const { momentLikeDate } = useDateTimeFormate();

const setFilter = async (filter) => {
  filtering.value = true;
  pagination.value.currentPage = 1;
  if (filter.date) {
    filters.value.start_date = momentLikeDate(filter.date[0]);
    filters.value.end_date = momentLikeDate(
      filter.date[filter.date.length - 1]
    );
  } else {
    delete filters.value.start_date;
    delete filters.value.end_date;
  }

  filters.value["types[]"] = filter.types;
  filters.value["statuses[]"] = filter.statuses;
  await refresh();
};

const { data, status, refresh } = await maintainStore.getAllOrders(
  filters.value
);
watch(
  () => data.value,
  () => {
    if (filtering.value) {
      allOperations.value = data.value?.data.data;
    } else {
      allOperations.value.push(...data.value?.data.data);
    }
  },
  { deep: true, immediate: true }
);

const loadMore = async () => {
  filtering.value = false;
  pagination.value.currentPage += 1;
  await refresh();
};
</script>
<template>
  <v-row>
    <v-col lg="4" md="5" cols="12">
      <operations-filters @filter="setFilter" class="h-100" />
    </v-col>
    <v-col lg="8" md="7" cols="12">
      <v-skeleton-loader
        class="radius-16"
        v-if="status === 'pending'"
        type="list-item-two-line, list-item-two-line, list-item-two-line"
      ></v-skeleton-loader>
      <operations-all-operations
        @refresh="
          filtering = true;
          refresh();
        "
        v-else
        :operations="allOperations"
      />
      <div
        v-if="pagination.currentPage < pagination.lastPage"
        class="d-flex justify-center mt-10"
      >
        <v-btn @click="loadMore" color="primary">
          {{ $t("buttons.load_more") }}
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>
