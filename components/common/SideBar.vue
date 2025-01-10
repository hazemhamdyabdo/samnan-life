<template>
  <v-layout>
    <v-card elevation="2" min-width="100" class="mt-4 mb-4 rounded-xl" app>
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
            {{ $t("dashboard.sidebar.home") }}
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
    <v-container fluid class="mt-3 px-0 me-0">
      <slot></slot>
    </v-container>
  </v-layout>
</template>
