<script setup lang="ts">
import type { Address } from "~/types/settings";
import Addresses from "~/components/Settings/addresses/Addresses.vue";
import NewAddress from "~/components/Settings/addresses/NewAddress.vue";

const { showSuccess } = useAlertStore();
const { t } = useI18n();
const settingsStore = useSettingsStore();
const { allAddresses } = storeToRefs(settingsStore);
const { fetchAllAddresses, createAddress } = settingsStore;

const componentsMap = {
  Addresses,
  NewAddress,
};

const currentComponent = ref("Addresses");
const changeComponent = (newComponent: string) => {
  currentComponent.value = newComponent;
};
const currentComponentView = computed(() => {
  // @ts-ignore
  return componentsMap[currentComponent.value];
});

const isLoadingNewAddress = ref(false);
const addNewAddress = async (newAddress: Address) => {
  isLoadingNewAddress.value = true;
  try {
    await createAddress(newAddress);
    await fetchAllAddresses();
    changeComponent("Addresses");
    showSuccess("تمت اضافة العنوان بنجاح");
  } catch (error) {
    console.error("Error creating address:", error);
  } finally {
    isLoadingNewAddress.value = false;
  }
};

onMounted(async () => {
  await fetchAllAddresses();
});
</script>

<template>
  <section class="mb-8">
    <h3 class="text-20 text-header">
      {{ t("dashboard.settings.addresses.header") }}
    </h3>
  </section>
  <component
    :is="currentComponentView"
    :addresses="allAddresses"
    :isLoading="isLoadingNewAddress"
    @add:new-address="addNewAddress"
    @change-component="changeComponent"
  />
</template>
