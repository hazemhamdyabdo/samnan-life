<script setup lang="ts">
import Products from "~/components/Settings/products/Products.vue";
import NewProduct from "~/components/Settings/products/NewProduct.vue";

const { t } = useI18n();

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
</script>
<template>
  <section class="mb-8">
    <h3 class="text-20 text-header">
      {{ t("dashboard.settings.products.header") }}
    </h3>
  </section>
  <component :is="currentComponentView" @change-component="changeComponent" />
</template>
