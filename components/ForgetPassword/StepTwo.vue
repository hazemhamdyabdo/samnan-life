<script setup lang="ts">
import OTP from "../app/OTP.vue";
import StepThree from "~/components/ForgetPassword/StepThree.vue";

defineProps<{
  title: string;
  isLoading: boolean;
  reset: boolean;
  number: string;
}>();
const emits = defineEmits(["resend:otp", "verify:otp", "change:step-three"]);
const passwordUpdates = defineModel("passwordUpdates");
const otp = defineModel("otp", {
  type: String,
  required: true,
});

const route = useRoute();
const isRegister = computed(() => route.path.includes("register"));

const handleVerifyOTP = () => {
  if (isRegister.value) {
    emits("verify:otp");
  }
};
</script>

<template>
  <div>
    <h3>
      {{ title }}
    </h3>
    <span>
      {{ $t("forget_password.otp_instructions") }}
      {{ number }}
    </span>
  </div>
  <OTP
    v-model:otp="otp"
    :isLoading="isLoading"
    :reset
    @verify:otp="handleVerifyOTP"
    @resend:otp="emits('resend:otp')"
  />
  <StepThree
    v-if="!isRegister"
    v-model:passwordUpdates="passwordUpdates"
    @change:step-three="emits('change:step-three')"
  />
</template>
