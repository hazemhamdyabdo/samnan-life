<template>
  <v-card rounded="xl" class="h-100">
    <v-card-text>
      <h2 class="mb-10">{{ $t("operations.new_device") }}</h2>

      <operations-create-order-enter-bill-number
        v-if="step === 1"
        @next="step = 2"
      />
      <operations-create-order-enter-info v-if="step === 2" @next="step = 3" />
      <operations-create-order-review v-if="step === 3" @next="step = 4" />
      <operations-create-order-success v-if="step === 4" />
    </v-card-text>
  </v-card>
</template>

<script setup>
const step = ref(1);
</script>

<style lang="scss" scoped></style>
