<script setup lang="ts">
defineProps<{
  products: any;
}>();

const emits = defineEmits<{
  (e: "select-product", value: number): Promise<void>;
}>();

const selectedProductId = ref<number | null>(null);
const selectProduct = (productId: number) => {
  if (selectedProductId.value === productId) {
    selectedProductId.value = null;
  } else {
    selectedProductId.value = productId;
  }
  // @ts-ignore
  emits("select-product", selectedProductId.value);
};
</script>

<template>
  <v-row>
    <v-col
      v-for="product in products"
      :key="product.id"
      cols="12"
      md="4"
      lg="3"
    >
      <v-card
        rounded="xl"
        border="sm black"
        class="pa-4 cursor-pointer position-relative h-100"
        elevation="0"
        @click="selectProduct(product.id)"
      >
        <div class="d-flex flex-column h-100 justify-space-between">
          <v-checkbox
            v-model="selectedProductId"
            :value="product.id"
            class="checkbox"
            color="primary"
            density="compact"
            hide-details
          />
          <v-img :src="product.image_url" max-width="100%" />
          <p class="text-light-gray-2 text-14 font-weight-bold">
            {{ product.name }}
          </p>
        </div>
      </v-card>
    </v-col>
    <v-col v-if="!products.length" cols="12">
      <h3 class="text-center">
        {{ $t("operations.no_products") }}
      </h3>
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
