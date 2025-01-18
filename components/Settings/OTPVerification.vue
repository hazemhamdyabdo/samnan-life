<script setup lang="ts">
import OTP from "../app/OTP.vue";
defineProps<{
  title: string;
  receiver: string;
  content: string;
  target?: string;
  isLoading: boolean;
  reset: boolean;
}>();

const emits = defineEmits(["resend:otp", "verify:otp"]);
const otp = defineModel("otp", {
  type: String,
  required: true,
});
</script>
<template>
  <v-row class="px-4 d-flex flex-column">
    <v-col class="text-20 text-header pt-8">
      {{ title }}
    </v-col>
    <v-col>
      <p class="text-header font-weight-medium mb-2">
        {{ $t("dashboard.settings.verification.message") }} {{ receiver }}
      </p>
      <p class="text-light-gray-2 text-12 font-weight-medium">
        {{ content }} {{ target }}
      </p>
    </v-col>
    <v-col cols="4">
      <OTP
        v-model:otp="otp"
        :reset="reset"
        :isLoading="isLoading"
        @resend:otp="emits('resend:otp')"
        @verify:otp="emits('verify:otp', 'SuccessVerification')"
      />
    </v-col>
  </v-row>
</template>
