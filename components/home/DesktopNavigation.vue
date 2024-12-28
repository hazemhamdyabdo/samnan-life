<script setup >

const goToLogin = () => {
  navigateTo("/login");
}
</script>
<template>
  <div class="d-flex ga-12 align-center">
    <!-- Navigation links -->
    <div class="d-flex ga-12 text-gray-400">
      <a href="#header" class="text-primary font-weight-bold">الرئيسية</a>
      <a href="#about-us" class="font-weight-medium">عن سمنان</a>
      <a href="#services" class="font-weight-medium">خدماتنا</a>
      <a href="#store" class="font-weight-medium">متجرنا الالكتروني</a>
      <a href="#branches" class="font-weight-medium">فروعنا</a>
    </div>
    <v-btn @click="goToLogin" color="primary" class="rounded-lg px-8" size="large">
      اشتراك
    </v-btn>
  </div>
</template>
