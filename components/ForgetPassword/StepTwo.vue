<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "استعادة الحساب",
  },
});
const emits = defineEmits(["resend:otp", "verify:otp"]);
const countdownLimit = 60;

const timeLeft = ref(countdownLimit);
const otp = defineModel("otp", {
  type: String,
  required: true,
});
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
    <h3>
      {{ title }}
    </h3>
    <span
      >قم بادخال الرمز المكون من 4 ارقام الذي قمنا بارساله على رقم الهاتف 0000
      00 0000</span
    >
  </div>
  <v-row>
    <v-col cols="6" sm="12">
      <v-otp-input
        dir="ltr"
        :length="4"
        rounded="xl"
        @finish="emits('verify:otp')"
        v-model="otp"
      ></v-otp-input>
      <p class="text-primary text-center font-weight-bold">{{ countdown }}</p>
    </v-col>
    <v-col cols="12" sm="12" class="pt-0">
      <v-btn
        @click="emits('resend:otp')"
        color="primary"
        round
        block
        size="50"
        rounded="lg"
        >ارسل الرمز مرة اخرى</v-btn
      >
    </v-col>
  </v-row>
</template>
