<script setup lang="ts">
const { showSuccess } = useAlertStore();
const { t } = useI18n();
const authStore = useAuthStore();
const { logout } = authStore;
const { isTechnician } = storeToRefs(authStore);

const items = computed(() => [
  {
    title: t("dashboard.settings.card.items.profile"),
    icon: "profile-circle",
    name: "/dashboard/settings",
  },
  {
    title: t("dashboard.settings.card.items.language"),
    icon: "language-square",
    name: "/dashboard/settings/language",
  },
  ...(isTechnician.value
    ? [
        {
          title: t("dashboard.settings.card.items.products_specialized_in"),
          icon: "box-1",
          name: "/dashboard/settings/products",
        },
      ]
    : [
        {
          title: t("dashboard.settings.card.items.products"),
          icon: "box-1",
          name: "/dashboard/settings/products",
        },
      ]),
  ...(isTechnician.value
    ? [
        {
          title: t("dashboard.settings.card.items.address_title"),
          icon: "location",
          name: "/dashboard/settings/addresses",
        },
      ]
    : [
        {
          title: t("dashboard.settings.card.items.addresses"),
          icon: "location",
          name: "/dashboard/settings/addresses",
        },
      ]),

  ...(isTechnician.value
    ? [
        {
          title: t("dashboard.settings.card.items.coverage_area"),
          icon: "routing-icon",
          name: "/dashboard/settings/routing",
        },
        {
          title: t("dashboard.settings.card.items.working_hours"),
          icon: "brifecase-timer",
          name: "/dashboard/settings/working-hours",
        },
        {
          title: t("dashboard.settings.card.items.invoices"),
          icon: "document-normal",
          name: "/dashboard/settings/invoices",
        },
      ]
    : []),

  {
    title: t("dashboard.settings.card.items.support_help"),
    icon: "24-support",
    name: "/dashboard/settings/support",
  },
  {
    title: t("dashboard.settings.card.items.notifications"),
    icon: "notification-bing",
    name: "/dashboard/settings/notifications",
  },
  {
    title: t("dashboard.settings.card.items.logout"),
    icon: "logout",
    name: "logout",
  },
]);

const isNotificationActive = ref(true);

const showSignOutDialog = ref(false);

const isLoading = ref(false);
const handleSignOut = async () => {
  isLoading.value = true;
  await logout();
  showSuccess("تم تسجيل الخروج بنجاح");
  navigateTo(`${isTechnician.value ? "/technical" : ""}/login`);
  isLoading.value = false;
  showSignOutDialog.value = false;
};
</script>

<template>
  <v-card class="pa-2 sticky" elevation="2" rounded="xl" border="sm black">
    <v-card-title>
      <h6 class="text-16">{{ $t("dashboard.settings.card.title") }}</h6>
    </v-card-title>
    <v-divider />
    <v-list
      density="compact"
      nav
      class="d-flex flex-column justify-space-between py-4 ga-2"
    >
      <NuxtLink
        v-for="item in items"
        :key="item.title"
        class="pa-2"
        :class="
          $route.path === item.name
            ? 'bg-pri-light text-primary font-weight-medium rounded-lg'
            : 'text-grey-400'
        "
        :to="
          item.name === 'logout'
            ? ''
            : item.name.includes('notifications')
            ? ''
            : item.name
        "
      >
        <div
          v-if="!item.name.includes('notifications') && item.name !== 'logout'"
          class="d-flex ga-2"
        >
          <AppSvgIcon :name="item.icon" />
          <span class="text-16">{{ item.title }}</span>
        </div>
        <div
          @click="showSignOutDialog = true"
          v-else-if="item.name == 'logout'"
          class="d-flex ga-2 cursor-pointer"
        >
          <AppSvgIcon :name="item.icon" />
          <span class="text-16">{{ item.title }}</span>
        </div>

        <section
          v-else-if="item.name.includes('notifications')"
          class="d-flex align-center justify-space-between cursor-pointer"
          @click="isNotificationActive = !isNotificationActive"
        >
          <div class="d-flex ga-2">
            <AppSvgIcon :name="item.icon" />
            <span class="text-16">{{ item.title }}</span>
          </div>
          <v-switch
            v-model="isNotificationActive"
            color="primary"
            density="compact"
            hide-details
          ></v-switch>
        </section>
      </NuxtLink>
    </v-list>
  </v-card>

  <AppModal
    v-model:dialog="showSignOutDialog"
    :title="t('dashboard.modal.logout')"
    icon="logout"
    :text="t('dashboard.modal.logout_confirm')"
    :is-loading="isLoading"
    @submit="handleSignOut"
  />
</template>
