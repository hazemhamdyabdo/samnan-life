<script setup lang="ts">
const drawer = ref(false);

const goToLogin = () => {
  navigateTo("/login");
};
</script>

<template>
  <v-app-bar-nav-icon
    variant="text"
    @click.stop="drawer = !drawer"
  ></v-app-bar-nav-icon>
  <v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'left' : undefined"
    temporary
  >
    <div class="d-flex flex-column pa-4 ga-12 text-gray-400">
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
      <v-btn
        @click="goToLogin"
        color="primary"
        class="rounded-lg px-8"
        size="large"
      >
        {{ $t("landing.nav.subscribe") }}
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>
