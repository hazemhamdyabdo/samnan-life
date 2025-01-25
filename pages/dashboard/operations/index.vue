<script setup>
const { getAllOrders } = useMaintainStore();
const allOperations = ref([]);
const filters = ref({
  types: [],
  statuses: [],
  start_date: null,
  end_date: null,
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
};

const { data, status } = await getAllOrders(filters.value);
watch(
  () => data.value,
  () => {
    allOperations.value = data.value?.data.data;
    console.log(data.value);
  },
  { deep: true }
);

console.log(data.value);
</script>
<template>
  <v-row>
    {{ status }}
    <v-col lg="4" md="5" cols="12">
      <operations-filters @filter="setFilter" class="h-100" />
    </v-col>
    <v-col lg="8" md="7" cols="12">
      <operations-all-operations :operations="allOperations" />
    </v-col>
  </v-row>
</template>
