<script setup lang="ts">
import Addresses from "~/components/Settings/addresses/Addresses.vue";
import NewAddress from "~/components/Settings/addresses/NewAddress.vue";

const { t } = useI18n();

const componentsMap = {
  Addresses,
  NewAddress,
};

const currentComponent = ref("Addresses");

const changeComponent = (value: string) => {
  currentComponent.value = value;
};

const currentComponentView = computed(() => {
  // @ts-ignore
  return componentsMap[currentComponent.value];
});
</script>

<template>
  <section class="mb-8">
    <h3 class="text-20 text-header">
      {{ t("dashboard.settings.addresses.header") }}
    </h3>
  </section>
  <component :is="currentComponentView" @change-component="changeComponent" />
</template>
