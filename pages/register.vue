<script setup lang="ts">
import { useDisplay } from "vuetify";
import type { UserRegistrationDetails } from "~/types";
import StepOne from "~/components/Register/StepOne.vue";
import StepTwo from "~/components/ForgetPassword/StepTwo.vue";

const { mobile } = useDisplay();
const { register, verifyOTP } = useAuthStore();
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

const handleResendOTP = async () => {
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
          :is="steps[currentStep]"
          :isLoading="isLoading"
          title="توثيق حسابك"
          v-model:registerDetails="registerDetails"
          v-model:otp="otp"
          @change:step-one="handleRegisterStep"
          @verify:otp="handleOTPStep"
          @resend:otp="handleResendOTP"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
