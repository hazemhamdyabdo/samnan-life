<template>
  <v-card
    class="d-flex justify-space-between align-center pa-4 shadow-xl"
    rounded="xl"
  >
    <div class="d-flex justify-center align-center ga-2">
      <AppSvgIcon name="logo" />
      <AppSvgIcon name="title" />
    </div>
    <v-spacer />
    <div class="d-flex justify-center align-center ga-6">
      <NuxtLink to="/dashboard/notifications">
        <AppSvgIcon name="bell" />
      </NuxtLink>
      <v-btn color="primary" class="px-4 rounded-lg" size="large">
        <v-icon class="me-1">mdi-calendar-outline</v-icon>
        {{ $t("dashboard.nav.button") }}
      </v-btn>
    </div>
  </v-card>
</template>
