<script setup lang="ts">
import Update from "./Update.vue";
import SuccessVerification from "~/components/Settings/SuccessVerification.vue";

const emits = defineEmits<{ (e: "change-action", value: string): void }>();

const components = {
  Update,
  SuccessVerification,
};
const currentComponent = ref("Update");

const changeComponent = (value: string) => {
  currentComponent.value = value;
};

const currentComponentView = computed(() => {
  // @ts-ignore
  return components[currentComponent.value];
});
</script>
<template>
  <component
    :is="currentComponentView"
    :title="$t('dashboard.settings.profile.update_password.header')"
    :success-message="$t('dashboard.settings.verification.changed_password')"
    @change-component="changeComponent"
    @change-action="emits('change-action', $event)"
  />
</template>

<style scoped></style>
