<script setup lang="ts">
const drawer = ref(false)

</script>

<template>
  <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'left' : undefined"
      temporary
  >
    <div class="d-flex flex-column pa-4 ga-12 text-gray-400">
      <a href="#header" class="text-primary font-weight-bold">الرئيسية</a>
      <a href="#about-us" class="font-weight-medium">عن سمنان</a>
      <a href="#services" class="font-weight-medium">خدماتنا</a>
      <a href="#store" class="font-weight-medium">متجرنا الالكتروني</a>
      <a href="#branches" class="font-weight-medium">فروعنا</a>
    </div>
  </v-navigation-drawer>
</template>