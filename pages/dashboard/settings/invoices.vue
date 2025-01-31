<script setup lang="ts">
import Invoices from "~/components/Settings/invoices/Invoices.vue";
import viewBill from "../operations/view-bill.vue";
const componentMap = {
  Invoices,
  viewBill,
};

const currentComponent = ref("Invoices");
const changeComponent = (newComponent: string) => {
  currentComponent.value = newComponent;
};
const currentComponentView = computed(() => {
  // @ts-ignore
  return componentMap[currentComponent.value];
});
</script>
<template>
  <component
    :is="currentComponentView"
    :showActions="false"
    @change-component="changeComponent"
  />
</template>
