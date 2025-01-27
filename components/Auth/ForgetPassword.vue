<script setup lang="ts">
const props = defineProps({
  technichian: {
    type: Boolean,
    default: false,
  },
});
import StepOne from "~/components/ForgetPassword/StepOne.vue";
import StepTwo from "~/components/ForgetPassword/StepTwo.vue";
import StepThree from "~/components/ForgetPassword/StepThree.vue";

const { verifyOTP, resetPassword, handleForgetPassword } = useAuthStore();
const { showSuccess } = useAlertStore();

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
  current_password: "",
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
    showSuccess("Password Updated");
    navigateTo("/login");
    // @TODO: navigate to login page
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
    await handleForgetPassword(phoneNumber.value);
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
          src="../../assets/imgs/image 3.png"
          alt="Responsive Image"
          class="rounded-xl"
          cover
        />
      </v-col>
      <v-col cols="12" md="6" class="d-flex flex-column ga-6">
        <div class="w-md-75 mx-auto">
          <div class="d-flex ga-2 align-center">
            <AppSvgIcon name="logo" size="lg" />
            <AppSvgIcon name="title" :size="60" />
          </div>
          <component
            :is="forgetPasswordSteps[currentStep]"
            :isLoading="isLoading"
            :reset="reset"
            :number="phoneNumber"
            v-model:phoneNumber="phoneNumber"
            v-model:otp="otp"
            v-model:passwordUpdates="passwordUpdates"
            @change:step-one="handlePhoneNumStep"
            @verify:otp="handleOTPStep"
            @change:step-three="handlePasswordStep"
            @resend:otp="handleResendOTP"
          ></component>
        </div>
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
