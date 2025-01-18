<script setup lang="ts">
import Update from "./Update.vue";
import OTPVerification from "~/components/Settings/OTPVerification.vue";
import SuccessVerification from "~/components/Settings/SuccessVerification.vue";

const { updatePhone } = useSettingsStore();
const { verifyOTP } = useAuthStore();

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

const phoneNumber = ref("");
const isLoading = ref(false);
const reset = ref(false);
const handlePhoneStep = async (nextStep: string) => {
  isLoading.value = true;
  try {
    await updatePhone(phoneNumber.value);
    nextStep && changeComponent(nextStep);
    reset.value = true;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const otp = ref("");
const handleOTPStep = async (newStep: string) => {
  isLoading.value = true;
  try {
    // verifyOTP(otp.value, phoneNumber.value);
    changeComponent(newStep);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <component
    :is="currentComponentView"
    :title="$t('dashboard.settings.profile.update_phone.header')"
    :receiver="$t('dashboard.settings.verification.phone')"
    :content="$t('dashboard.settings.verification.phone_content')"
    :target="phoneNumber"
    v-model:phone-number="phoneNumber"
    v-model:otp="otp"
    :isLoading="isLoading"
    :reset="reset"
    @change-component="changeComponent"
    @submit:phone-number="handlePhoneStep"
    @change-action="emits('change-action', $event)"
    @verify:otp="handleOTPStep"
    @resend:otp="handlePhoneStep"
  />
</template>

<style scoped></style>
