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

useHead({
  htmlAttrs,
});
</script>
