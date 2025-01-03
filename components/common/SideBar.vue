<script setup lang="ts"></script>

<template>
  <v-layout>
    <v-card width="100" elevation="2" class="mt-4 mb-4 rounded-xl" app>
      <v-list
        density="compact"
        nav
        height="100%"
        class="d-flex flex-column ga-8 py-8"
      >
        <NuxtLink
          to="/dashboard"
          class="d-flex flex-column ga-1 justify-center align-center"
        >
          <AppSvgIcon name="home-nav" />
          <p class="text-grey-300">الرئيسية</p>
        </NuxtLink>
        <NuxtLink
          to="/dashboard/operations"
          class="d-flex flex-column ga-1 justify-center align-center"
        >
          <AppSvgIcon name="operations-nav" />
          <p class="text-grey-300">العمليات</p>
        </NuxtLink>
        <NuxtLink
          to="/dashboard/settings"
          class="d-flex flex-column ga-1 justify-center align-center"
        >
          <AppSvgIcon name="setting-nav" />
          <p class="text-grey-300">الاعدادات</p>
        </NuxtLink>
      </v-list>
    </v-card>
    <v-main style="height: calc(100vh - 150px)" class="mt-5 ms-6">
      <slot></slot>
    </v-main>
  </v-layout>
</template>

<style scoped></style>
