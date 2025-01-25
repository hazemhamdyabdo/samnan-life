<script setup>
import AllRequestsChart from "~/components/Technical/AllRequestsChart.vue";
import DoneRequestsChart from "~/components/Technical/DoneRequestsChart.vue";
import Rates from "~/components/Technical/Rates.vue";
</script>
<template>
  <v-row>
    <v-col cols="4">
      <DoneRequestsChart />
    </v-col>
    <v-col cols="5">
      <AllRequestsChart />
    </v-col>
    <v-col cols="3">
      <Rates />
    </v-col>
  </v-row>
</template>
