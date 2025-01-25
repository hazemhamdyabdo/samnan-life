<script setup lang="ts">
const rates = ref([
  {
    rate: 70,
    label: "5 نجوم",
  },
  {
    rate: 40,
    label: "4 نجوم",
  },
  {
    rate: 30,
    label: "3 نجوم",
  },
  {
    rate: 20,
    label: "2 نجوم",
  },
  {
    rate: 10,
    label: "1 نجوم",
  },
]);
</script>
<template>
  <v-card
    rounded="xl"
    elevation="0"
    border="sm black"
    class="py-4 px-2"
    min-height="100%"
  >
    <h3 class="text-header font-weight-bold">{{ $t("technical.rates") }}</h3>
    <p class="text-dark-slate-gray font-weight-bold text-30">4.2</p>
    <section class="d-flex flex-column ga-4">
      <div v-for="rate in rates" :key="rate.label">
        <p class="text-header font-weight-bold text-12 mb-2 mt-4">
          {{ rate.label }}
        </p>
        <v-progress-linear
          :model-value="rate.rate"
          :max="100"
          color="#FDCA40"
        ></v-progress-linear>
      </div>
    </section>
  </v-card>
</template>

<style scoped></style>
