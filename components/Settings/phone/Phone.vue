<script setup lang="ts">
import Update from "./Update.vue";
import OTPVerification from "~/components/Settings/OTPVerification.vue";
import SuccessVerification from "~/components/Settings/SuccessVerification.vue";

const emits = defineEmits<{ (e: "change-action", value: string): void }>();
const components = {
  Update,
  OTPVerification,
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
    :title="$t('dashboard.settings.profile.update_phone.header')"
    :receiver="$t('dashboard.settings.verification.phone')"
    :content="$t('dashboard.settings.verification.phone_content')"
    :target="'+9665555555'"
    @change-component="changeComponent"
    @change-action="emits('change-action', $event)"
    @verify:otp="changeComponent('SuccessVerification')"
  />
</template>

<style scoped></style>
