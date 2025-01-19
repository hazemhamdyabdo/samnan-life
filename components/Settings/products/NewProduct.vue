<script setup lang="ts">
import type { Product } from "~/types/settings";
import ProductCard from "./ProductCard.vue";
import ProductFilterDialog from "./ProductFilterDialog.vue";

const emits = defineEmits<{
  (e: "change-component", value: string): void;
}>();
defineProps<{
  products: Product[];
}>();

const { addProduct } = useSettingsStore();
const { showSuccess } = useAlertStore();
const settingsStore = useSettingsStore();
const { allProducts } = storeToRefs(settingsStore);
const { fetchAllProducts } = settingsStore;

const { t } = useI18n();
const filterDialog = ref();

const showFilterDialog = () => {
  filterDialog.value.showDialog();
};

const selectedProductId = ref<number>();

const handleSelectProduct = async (productId: number) => {
  selectedProductId.value = productId;
};

const isLoading = ref(false);
const handleAddProduct = async () => {
  isLoading.value = true;
  try {
    // @ts-ignore
    await addProduct(selectedProductId.value);
    showSuccess("تمت العملية بنجاح");
    emits("change-component", "Products");
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};
onMounted(async () => {
  await fetchAllProducts();
  // await fetchCustomerProducts();
});
</script>

<template>
  <section class="d-flex flex-column ga-12">
    <section class="d-flex ga-2 justify-space-between">
      <h4 class="text-20 text-grey-900">
        {{ t("dashboard.settings.products.add_product") }}
      </h4>
      <div class="d-flex ga-2">
        <v-text-field
          bg-color="disabled-gray"
          density="compact"
          flat
          variant="solo"
          :placeholder="t('operations.search')"
          height="42px"
          hide-details
          width="300px"
        >
        </v-text-field>
        <v-btn
          @click="showFilterDialog"
          color="primary"
          height="42"
          size="small"
          rounded="lg"
        >
          <AppSvgIcon name="filter" />
        </v-btn>
      </div>
    </section>

    <ProductCard
      :products="allProducts"
      @select-product="handleSelectProduct"
    />

    <div class="d-flex w-50">
      <v-btn
        color="primary"
        type="submit"
        round
        block
        size="50"
        :loading="isLoading"
        @click="handleAddProduct"
        >{{ $t("dashboard.save") }}</v-btn
      >
    </div>
  </section>
  <ProductFilterDialog ref="filterDialog" />
</template>
