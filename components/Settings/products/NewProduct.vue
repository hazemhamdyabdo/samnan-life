<script setup lang="ts">
import type { Product } from "~/types/settings";
import ProductCard from "./ProductCard.vue";
import ProductFilterDialog from "./ProductFilterDialog.vue";

const emits = defineEmits<{
  (e: "change-component", value: string): void;
}>();

const { addProduct } = useSettingsStore();
const { showSuccess } = useAlertStore();
const settingsStore = useSettingsStore();
const { allProducts } = storeToRefs(settingsStore);
const { fetchAllProducts, fetchCategories } = settingsStore;

const { t } = useI18n();
const filterDialog = ref();

const showFilterDialog = () => {
  filterDialog.value.showDialog();
};

const selectedProductId = ref<number>();

const handleSelectProduct = async (productId: number) => {
  selectedProductId.value = productId;
};

const dataLoading = ref(true);
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

await fetchAllProducts();

const params = ref({
  search: "",
});

const searchLoading = ref(false);
const setSearch = async (categories: any = null) => {
  const payload = {};

  if (params.value.search) payload.search = params.value.search;
  if (categories) {
    const categoryIds = categories.map((item: any) => item.id).join(",");
    if (categoryIds) payload.category_id = categoryIds;
  }
  searchLoading.value = true;
  await fetchAllProducts(payload);
  searchLoading.value = false;
};
const categoriesList = ref();
onMounted(async () => {
  dataLoading.value = true;
  categoriesList.value = (await fetchCategories()).data.value?.data;
  dataLoading.value = false;
});
</script>

<template>
  <section v-if="!dataLoading" class="d-flex flex-column ga-12">
    <section class="d-flex ga-2 justify-space-between">
      <h4 class="text-20 text-grey-900">
        {{ t("dashboard.settings.products.add_product") }}
      </h4>
      <div class="d-flex ga-2">
        <v-btn
          @click="setSearch()"
          color="pri-light"
          height="42"
          size="small"
          rounded="lg"
          :loading="searchLoading"
          :disabled="searchLoading"
        >
          {{ t("buttons.search") }}
        </v-btn>
        <v-text-field
          bg-color="disabled-gray"
          density="compact"
          flat
          variant="solo"
          :placeholder="t('operations.search')"
          height="42px"
          hide-details
          width="300px"
          v-model="params.search"
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
  <v-row v-else>
    <v-col v-for="i in 3" cols="4">
      <v-skeleton-loader height="300" type="image"></v-skeleton-loader>
    </v-col>
  </v-row>
  <ProductFilterDialog ref="filterDialog" :categoriesList @filter="setSearch" />
</template>
