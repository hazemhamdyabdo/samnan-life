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

const { t } = useI18n();
const filterDialog = ref();

const showFilterDialog = () => {
  filterDialog.value.showDialog();
};

const selectedProductIds = ref<number[]>([]);

const handleSelectProduct = async ({
  productId,
  checked,
}: {
  productId: number;
  checked: boolean;
}) => {
  if (checked) {
    if (!selectedProductIds.value.includes(productId)) {
      selectedProductIds.value.push(productId);
    }
  } else {
    selectedProductIds.value = selectedProductIds.value.filter(
      (id) => id !== productId
    );
  }
};

const isLoading = ref(false);
const handleAddProduct = async () => {
  isLoading.value = true;
  try {
    await addProduct(selectedProductIds.value);
    showSuccess("تمت العملية بنجاح");
    emits("change-component", "Products");
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};
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

    <v-row>
      <v-col v-for="product in products" :key="product.id">
        <ProductCard
          :product-title="product.name"
          :product-image="product.image"
          :product-id="product.id"
          @select-product="handleSelectProduct"
        />
      </v-col>
    </v-row>

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
