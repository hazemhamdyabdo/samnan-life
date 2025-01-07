<script setup lang="ts">
const { t } = useI18n();
const items = [
  {
    title: t("dashboard.settings.card.items.profile"),
    icon: "profile-circle",
    name: "profile",
  },
  {
    title: t("dashboard.settings.card.items.language"),
    icon: "language-square",
    name: "language",
  },
  {
    title: t("dashboard.settings.card.items.addresses"),
    icon: "location",
    name: "addresses",
  },
  {
    title: t("dashboard.settings.card.items.products"),
    icon: "box-1",
    name: "products",
  },
  {
    title: t("dashboard.settings.card.items.support_help"),
    icon: "24-support",
    name: "support",
  },
  {
    title: t("dashboard.settings.card.items.notifications"),
    icon: "notification-bing",
    name: "notifications",
  },
  {
    title: t("dashboard.settings.card.items.logout"),
    icon: "logout",
    name: "logout",
  },
];
const selectedCard = ref();
const selectCard = (item: { name: string; title: string; icon: string }) => {
  selectedCard.value = item;
};
</script>

<template>
  <v-card
    class="pa-2"
    elevation="2"
    rounded="xl"
    border="sm black"
    width="300"
    style="height: calc(100vh - 150px)"
  >
    <v-card-title>
      <h6 class="text-16">{{ $t("dashboard.settings.card.title") }}</h6>
    </v-card-title>
    <v-divider />
    <v-list
      density="compact"
      nav
      class="d-flex flex-column justify-space-between py-4 ga-2"
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        class="py-0"
        :class="
          selectedCard?.name === item.name
            ? 'bg-pri-light text-primary font-weight-medium rounded-lg'
            : 'text-grey-400'
        "
        @click="selectCard(item)"
      >
        <div class="d-flex ga-2">
          <AppSvgIcon :name="item.icon" />
          <span class="text-16">{{ item.title }}</span>
        </div>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped></style>
