<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

import OTPVerification from "~/components/Settings/OTPVerification.vue";
import SuccessVerification from "~/components/Settings/SuccessVerification.vue";

const { t } = useI18n();

const currentComponent = ref("OTPVerification");
const components = {
  OTPVerification,
  SuccessVerification,
};

const currentComponentView = computed(() => {
  // @ts-ignore
  return components[currentComponent.value];
});

// const componentProps = computed(() => ({
//   title: currentComponent? t("dashboard.settings.profile.email"),
//   receiver: t("dashboard.settings.verification.email"),
//   content: t("dashboard.settings.verification.email_content"),
//   target: "name@email.com",
// }));
</script>
<template>
  <component
    :is="currentComponentView"
    :title="t('dashboard.settings.profile.email')"
    :receiver="t('dashboard.settings.verification.email')"
    :content="t('dashboard.settings.verification.email_content')"
    target="name@email.com"
  />
</template>

<style scoped></style>
