<script setup lang="ts">
defineProps<{
  productTitle: string;
  productImage: string;
  productId: number;
}>();

const checked = ref(false);

const emits = defineEmits<{
  (e: "select-product", value: { productId: number; checked: boolean }): void;
}>();

const selectProduct = (productId: number) => {
  checked.value = !checked.value;
  emits("select-product", { productId, checked: checked.value });
};
</script>

<template>
  <v-card
    rounded="xl"
    width="fit-content"
    border="sm black"
    class="pa-4 cursor-pointer position-relative"
    elevation="0"
    @click="selectProduct(productId)"
  >
    <v-checkbox
      v-model="checked"
      class="checkbox"
      color="primary"
      density="compact"
      hide-details
    />
    <!-- :src="`https://app.rezeqstore.com/public/storage/${product.image}`" -->
    <img src="/images/product.png" />
    <p class="text-light-gray-2 text-14 font-weight-bold">
      {{ productTitle }}
    </p>
  </v-card>
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
