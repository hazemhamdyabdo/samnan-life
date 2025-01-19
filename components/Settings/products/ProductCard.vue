<script setup lang="ts">
defineProps<{
  products: any;
}>();

const emits = defineEmits<{
  (e: "select-product", value: number | null): void;
}>();

const selectedProductId = ref(null);
const selectProduct = (productId: any) => {
  if (selectedProductId.value === productId) {
    selectedProductId.value = null;
  } else {
    selectedProductId.value = productId;
  }
  emits("select-product", selectedProductId.value);
};
</script>

<template>
  <v-row>
    <v-col v-for="product in products" :key="product.id">
      <v-card
        rounded="xl"
        border="sm black"
        class="pa-4 cursor-pointer position-relative"
        elevation="0"
        @click="selectProduct(product.id)"
      >
        <v-checkbox
          v-model="selectedProductId"
          :value="product.id"
          class="checkbox"
          color="primary"
          density="compact"
          hide-details
        />
        <img src="/images/product.png" />
        <p class="text-light-gray-2 text-14 font-weight-bold">
          {{ product.name }}
        </p>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.checkbox {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 50;
  background-color: #e9efff;
  border-radius: 8px;
}

:deep(.checkbox.v-checkbox .v-selection-control) {
  min-height: unset !important;
}
:deep(.checkbox .v-selection-control__input > .v-icon) {
  opacity: 0.2;
}

:deep(
    .checkbox .v-selection-control--dirty .v-selection-control__input > .v-icon
  ) {
  opacity: 1;
}
</style>
