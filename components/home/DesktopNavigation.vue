<script setup>
const goToLogin = () => {
  navigateTo("/login");
};
</script>
<template>
  <div class="d-flex ga-12 align-center">
    <!-- Navigation links -->
    <div class="d-flex ga-12 text-gray-400">
      <a href="#header" class="text-primary font-weight-bold">{{
        $t("landing.nav.home")
      }}</a>
      <a href="#about-us" class="font-weight-medium">{{
        $t("landing.nav.about_us")
      }}</a>
      <a href="#services" class="font-weight-medium">{{
        $t("landing.nav.services")
      }}</a>
      <a href="#store" class="font-weight-medium">{{
        $t("landing.nav.store")
      }}</a>
      <a href="#branches" class="font-weight-medium">{{
        $t("landing.nav.branches")
      }}</a>
    </div>
    <v-btn
      @click="goToLogin"
      color="primary"
      class="rounded-lg px-8"
      size="large"
    >
      {{ $t("landing.nav.subscribe") }}
    </v-btn>
  </div>
</template>
