<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

import type { UserRegistrationDetails } from "~/types";
import StepOne from "~/components/Register/StepOne.vue";
import StepTwo from "~/components/ForgetPassword/StepTwo.vue";

const { register, verifyOTP, handleForgetPassword } = useAuthStore();
const { showSuccess } = useAlertStore();
const currentStep = ref(0);
const steps = ref([StepOne, StepTwo]);
const isLoading = ref(false);

const registerDetails = reactive<UserRegistrationDetails>({
  first_name: "Ahmed",
  last_name: "Salem",
  phone: "597875665",
  password: "12345678",
  confirm_password: "12345678",
});

const handleRegisterStep = async () => {
  isLoading.value = true;
  try {
    await register(registerDetails);
    currentStep.value = 1;
  } catch (error) {
    // handle UI changes
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const otp = ref("");
const handleOTPStep = async () => {
  isLoading.value = true;
  try {
    await verifyOTP(otp.value, registerDetails.phone);
    navigateTo("/dashboard");
  } catch (error) {
    // handle UI changes
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const reset = ref(false);
const handleResendOTP = async () => {
  isLoading.value = true;
  try {
    await handleForgetPassword(registerDetails.phone);
    showSuccess("OTP has been resent");
    reset.value = true;
  } catch (error) {
    // handle UI changes
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="wrapper d-flex align-center">
    <v-row class="align-center align-center h-100">
      <v-col class="d-none d-md-block h-100" cols="12" md="6">
        <v-img
          src="../assets/imgs/image 3.png"
          alt="Responsive Image"
          class="rounded-xl"
          cover
        />
      </v-col>
      <v-col cols="12" md="6" class="d-flex flex-column ga-6">
        <div class="d-flex ga-2 align-center">
          <AppSvgIcon name="logo" size="lg" />
          <AppSvgIcon name="title" :size="60" />
        </div>
        <component
          :is="steps[currentStep]"
          :isLoading="isLoading"
          :title="$t('register.title')"
          :reset="reset"
          :number="registerDetails.phone"
          v-model:registerDetails="registerDetails"
          v-model:otp="otp"
          @change:step-one="handleRegisterStep"
          @verify:otp="handleOTPStep"
          @resend:otp="handleResendOTP"
        />
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  padding: 20px;
}
</style>
