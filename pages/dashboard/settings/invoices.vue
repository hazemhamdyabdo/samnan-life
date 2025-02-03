<script setup lang="ts">
import Invoices from "~/components/Settings/invoices/Invoices.vue";
import viewBill from "../operations/view-bill.vue";
const technicianStore = useTechnicianStore();
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
const iewBillProps = computed(() => {
  if (currentComponent.value === "viewBill") {
    return {
      showActions: false,
      invoiceDetails: currentInvoiceDetails.value,
    };
  }
});
</script>
<template>
  <component
    :is="currentComponentView"
    v-bind="iewBillProps"
    @change-component="changeComponent"
  />
</template>
