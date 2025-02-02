<script setup lang="ts">
import Invoices from "~/components/Settings/invoices/Invoices.vue";
import viewBill from "../operations/view-bill.vue";
const technicianStore = useTechnicianStore();
const { getTechnicianAllRequests, invoiceInterface } = technicianStore;
const { selectedInvoiceId, currentInvoiceDetails } =
  storeToRefs(technicianStore);
const componentMap = {
  Invoices,
  viewBill,
};

const currentComponent = ref("Invoices");
const changeComponent = (newComponent: string, id: number) => {
  selectedInvoiceId.value = id;
  currentComponent.value = newComponent;
};
const currentComponentView = computed(() => {
  // @ts-ignore
  return componentMap[currentComponent.value];
});

await getTechnicianAllRequests();
</script>
<template>
  <component
    :is="currentComponentView"
    :showActions="false"
    :invoicesInterface="invoiceInterface"
    :invoiceDetails="currentInvoiceDetails"
    @change-component="changeComponent"
  />
</template>
