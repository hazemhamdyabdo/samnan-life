<script setup>
const { getAllOrders } = useMaintainStore();
const allOperations = ref([]);
const filters = ref({
  "types[]": [],
  "statuses[]": [],
});

const { momentLikeDate } = useDateTimeFormate();

const setFilter = async (filter) => {
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
};

const { data, status } = await getAllOrders(filters.value);
watch(
  () => data.value,
  () => {
    allOperations.value = data.value?.data.data;
  },
  { deep: true, immediate: true }
);
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
      <operations-all-operations v-else :operations="allOperations" />
    </v-col>
  </v-row>
</template>
