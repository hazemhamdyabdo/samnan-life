<template>
  <v-card
    class="d-flex justify-space-between align-center pa-4"
    elevation="1"
    rounded="lg"
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
        حجز موعد جديد
      </v-btn>
    </div>
  </v-card>
</template>
