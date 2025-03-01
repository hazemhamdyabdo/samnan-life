<template>
  <v-card
    class="d-flex justify-space-between align-center pa-4 shadow-xl"
    rounded="xl"
  >
    <div class="d-flex justify-center align-center ga-2">
      <AppSvgIcon name="logo" size="lg" />
      <AppSvgIcon name="title" :size="60" />
    </div>
    <v-spacer />
    <div class="d-flex justify-center align-center ga-6">
      <NuxtLink to="/dashboard/notifications">
        <v-badge
          dot
          location="top start"
          :color="!isThereUnread ? 'transparent' : 'error'"
        >
          <!-- :color="isThereUnread ? 'transparent' : 'error'" -->
          <v-icon color="primary">mdi-bell-outline</v-icon>
        </v-badge>
      </NuxtLink>
      <v-menu v-if="!isTechnician">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            color="primary"
            class="px-4 rounded-lg"
            size="large"
          >
            <v-icon class="me-1">mdi-calendar-outline</v-icon>
            {{ $t("dashboard.nav.button") }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            :to="
              localePath(
                '/dashboard/operations/order-maintenance/emergency_maintenance'
              )
            "
          >
            <v-list-item-title>
              {{ $t("operations.emergency_maintenance") }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            :to="
              localePath(
                '/dashboard/operations/order-maintenance/regular_maintenance'
              )
            "
          >
            <v-list-item-title>
              {{ $t("operations.regular_maintenance") }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            :to="localePath('/dashboard/operations/new-installation')"
          >
            <v-list-item-title>
              {{ $t("operations.new_installation") }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-card>
</template>

<script setup>
const isTechnician = useCookie("isTechnician");
const { notifications } = storeToRefs(useSettingsStore());

const isThereUnread = computed(() => {
  return notifications.value.some((item) => !item.read_at);
});
</script>
