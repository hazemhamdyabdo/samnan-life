<script setup lang="ts">
import { useDisplay } from "vuetify";
import StepOne from "~/components/ForgetPassword/StepOne.vue";
import StepTwo from "~/components/ForgetPassword/StepTwo.vue";
import StepThree from "~/components/ForgetPassword/StepThree.vue";

const { mobile } = useDisplay();
const { verifyOTP, resetPassword, handleForgetPassword } = useAuthStore();

const forgetPasswordSteps = ref([StepOne, StepTwo, StepThree]);
const phoneNumber = ref("");
const currentStep = ref(0);
const isLoading = ref(false);

const goToNextStep = () => {
  currentStep.value += 1;
};

const handlePhoneNumStep = async () => {
  isLoading.value = true;
  try {
    await handleForgetPassword(phoneNumber.value);
    goToNextStep();
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
    await verifyOTP(otp.value, phoneNumber.value);
    goToNextStep();
  } catch (error) {
    // handle UI changes
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const passwordUpdates = ref({
  password: "",
  confirm_password: "",
});

const handlePasswordStep = async () => {
  // @TODO: make sure about the flow with backend
  isLoading.value = true;
  try {
    await resetPassword({
      phoneNumber: phoneNumber.value,
      otp: otp.value,
      passwordUpdates: passwordUpdates.value,
    });
    alert("Password Updated");
    // @TODO: navigate to login page
  } catch (error) {
    // handle UI changes
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const handleResendOTP = () => {
  // @TODO: Ask for resend OTP api
};
</script>

<template>
  <v-container fluid>
    <v-row class="justify-space-between align-center">
      <v-col cols="12" sm="12" md="4">
        <img
          class="rounded-xl"
          src="../assets/imgs/image 3.png"
          :width="mobile ? '100%' : '600'"
          :height="mobile ? '100%' : '620'"
        />
      </v-col>
      <v-col cols="12" sm="6" md="5" class="d-flex flex-column ga-6">
        <div class="d-flex ga-2 align-center">
          <SvgIcon name="logo" />
          <SvgIcon name="title" />
        </div>
        <component
          :is="forgetPasswordSteps[currentStep]"
          :isLoading="isLoading"
          v-model:phoneNumber="phoneNumber"
          v-model:otp="otp"
          v-model:passwordUpdates="passwordUpdates"
          @change:step-one="handlePhoneNumStep"
          @verify:otp="handleOTPStep"
          @change:step-three="handlePasswordStep"
          @resend:otp="handleResendOTP"
        ></component>
      </v-col>
    </v-row>
  </v-container>
</template>
