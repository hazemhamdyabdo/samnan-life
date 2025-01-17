<script setup lang="ts">
import Products from "~/components/Settings/products/Products.vue";
import NewProduct from "~/components/Settings/products/NewProduct.vue";

const { showSuccess } = useAlertStore();
const { t } = useI18n();
const settingsStore = useSettingsStore();
const { allProducts, customerProducts } = storeToRefs(settingsStore);
const { fetchAllProducts, deleteProduct, fetchCustomerProducts } =
  settingsStore;

const componentMap = {
  Products,
  NewProduct,
};

const currentComponent = ref("Products");
const changeComponent = (newComponent: string) => {
  currentComponent.value = newComponent;
};
const currentComponentView = computed(() => {
  // @ts-ignore
  return componentMap[currentComponent.value];
});

const handleDeleteProduct = async (productId: number) => {
  await deleteProduct(productId);
  await fetchAllProducts();
  showSuccess("تم حذف المنتج بنجاح");
};
onMounted(async () => {
  await fetchAllProducts();
  await fetchCustomerProducts();
});
</script>
<template>
  <section class="mb-8">
    <h3 class="text-20 text-header">
      {{ t("dashboard.settings.products.header") }}
    </h3>
  </section>
  <component
    :is="currentComponentView"
    :customer-products="customerProducts"
    :products="allProducts"
    @delete-product="handleDeleteProduct"
    @change-component="changeComponent"
  />
</template>

<style scoped></style>
