<template>
  <AppAlert />
  <AppNotificationDialog />
  <v-locale-provider :locale="locale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-locale-provider>
</template>

<script setup>
const { locale } = useI18n();

const htmlAttrs = computed(() => ({
  dir: locale.value === "ar" ? "rtl" : "ltr",
}));

useSeoMeta({
  charset: "utf-8",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  ogLocaleAlternate: locale.value,
  title: "سمنان لحلول المياه",
});

useHead({
  htmlAttrs,
});
</script>
