<script setup lang="ts">
const { isTechnician } = storeToRefs(useAuthStore());
</script>

<template>
  <v-card elevation="2" min-width="60" class="rounded-xl" app>
    <v-list
      density="compact"
      nav
      height="100%"
      class="d-flex flex-sm-column justify-center ga-8 py-8"
    >
      <div class="d-flex flex-column ga-1 justify-center align-center">
        <NuxtLink
          :to="isTechnician ? '/technical/dashboard' : '/dashboard'"
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
          {{ $t("dashboard.sidebar.home") }}
        </p>
      </div>
      <div
        v-if="!isTechnician"
        class="d-flex flex-column ga-1 justify-center align-center"
      >
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
          {{ $t("dashboard.sidebar.operations") }}
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
            $route.path.includes('settings')
              ? 'text-primary font-weight-bold'
              : 'text-grey-300'
          }`"
        >
          {{ $t("dashboard.sidebar.settings") }}
        </p>
      </div>
    </v-list>
  </v-card>
</template>
