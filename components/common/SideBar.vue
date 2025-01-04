<script setup lang="ts"></script>

<template>
  <v-layout>
    <v-card
      style="height: calc(100vh - 150px)"
      elevation="2"
      class="mt-4 mb-4 rounded-xl"
      app
    >
      <v-list
        density="compact"
        nav
        height="100%"
        class="d-flex flex-column ga-8 py-8"
      >
        <div class="d-flex flex-column ga-1 justify-center align-center">
          <NuxtLink
            to="/dashboard"
            class="px-3 py-3 rounded-lg"
            active-class="bg-pri-light"
          >
            <AppSvgIcon name="home-nav" />
          </NuxtLink>
          <p
            :class="`${
              $route.path === '/dashboard'
                ? 'text-primary font-weight-bold'
                : 'text-grey-300'
            }`"
          >
            الرئيسية
          </p>
        </div>
        <div class="d-flex flex-column ga-1 justify-center align-center">
          <NuxtLink
            to="/dashboard/operations"
            class="px-3 py-3 rounded-lg"
            active-class="bg-pri-light"
          >
            <AppSvgIcon name="operations-nav" />
          </NuxtLink>
          <p
            :class="`${
              $route.path === '/dashboard/operations'
                ? 'text-primary font-weight-bold'
                : 'text-grey-300'
            }`"
          >
            العمليات
          </p>
        </div>
        <div class="d-flex flex-column ga-1 justify-center align-center">
          <NuxtLink
            to="/dashboard/settings"
            class="px-3 py-3 rounded-lg"
            active-class="bg-pri-light"
          >
            <AppSvgIcon name="setting-nav" />
          </NuxtLink>
          <p
            :class="`${
              $route.path === '/dashboard/settings'
                ? 'text-primary font-weight-bold'
                : 'text-grey-300'
            }`"
          >
            الاعدادات
          </p>
        </div>
      </v-list>
    </v-card>
    <v-container fluid class="mt-3 px-0 me-0">
      <slot></slot>
    </v-container>
  </v-layout>
</template>
