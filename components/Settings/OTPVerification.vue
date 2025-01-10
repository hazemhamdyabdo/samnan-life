<script setup lang="ts">
import OTP from "../app/OTP.vue";
defineProps<{
  title: string;
  receiver: string;
  content: string;
  target?: string;
}>();

const otp = ref("");
const isLoading = ref(false);
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
        :isLoading="isLoading"
        @resend:otp="$emit('resend:otp')"
        @verify:otp="$emit('verify:otp')"
      />
    </v-col>
  </v-row>
</template>
