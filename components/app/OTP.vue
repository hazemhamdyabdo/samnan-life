<script setup lang="ts">
defineProps<{
  isLoading: boolean;
}>();
const emits = defineEmits(["resend:otp", "verify:otp"]);
const otp = defineModel("otp", {
  type: String,
  required: true,
});

const timeLeft = ref(60);
const countdown = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

onMounted(() => {
  const countdownInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value -= 1;
    } else {
      clearInterval(countdownInterval);
    }
  }, 1000);
});
</script>
<template>
  <div>
    <v-otp-input
      dir="ltr"
      :length="4"
      rounded="xl"
      @finish="emits('verify:otp')"
      v-model="otp"
    />
    <p class="text-primary text-center font-weight-bold mb-4">
      {{ countdown }}
    </p>
  </div>
  <div class="pt-0">
    <v-btn
      @click="emits('resend:otp')"
      :loading="isLoading"
      color="primary"
      round
      block
      size="50"
      rounded="lg"
      >{{ $t("forget_password.resend_otp") }}</v-btn
    >
  </div>
  <!-- </v-row> -->
</template>

<style scoped></style>
