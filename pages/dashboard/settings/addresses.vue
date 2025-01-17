<script setup lang="ts">
import Addresses from "~/components/Settings/addresses/Addresses.vue";
import NewAddress from "~/components/Settings/addresses/NewAddress.vue";

const { t } = useI18n();
const settingsStore = useSettingsStore();
const { allAddresses } = storeToRefs(settingsStore);
const { fetchAllAddresses } = settingsStore;

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
    @change-component="changeComponent"
  />
</template>
