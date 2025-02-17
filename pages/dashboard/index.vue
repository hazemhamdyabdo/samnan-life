<script setup>
const { t } = useI18n();
const { getAllOrders } = useMaintainStore();
const { dateAndTime } = useDateTimeFormate();
const dashboardStore = useDashboardStore();
const { fetchSlides } = dashboardStore;
const allOperations = ref([]);
const cards = [
  {
    title: t("dashboard.home.cards.new_device"),
    link: "/dashboard/operations/new-installation",
    image: "new-device",
  },
  {
    title: t("dashboard.home.cards.urgent_maintenance"),
    link: "/dashboard/operations/order-maintenance/emergency_maintenance",
    image: "urgent-maintenance",
  },
  {
    title: t("dashboard.home.cards.regular_maintenance"),
    link: "/dashboard/operations/order-maintenance/regular_maintenance",
    image: "regular-maintenance",
  },
];

const {
  data: {
    value: { data: slides },
  },
} = await fetchSlides();

const { data, refresh, status } = await getAllOrders();

watch(
  () => data.value,
  () => {
    allOperations.value = data.value?.data.data;
  },
  { deep: true, immediate: true }
);
</script>
<template>
  <div v-if="status != 'pending'">
    <header>
      <v-carousel min-height="100%" hide-delimiter-background>
        <template v-slot:prev="{ props }">
          <div
            class="pa-2 rounded-circle"
            style="background-color: rgba(195, 195, 195, 0.4)"
          >
            <v-icon color="white" @click="props.onClick"
              >mdi-arrow-right</v-icon
            >
          </div>
        </template>
        <template v-slot:next="{ props }">
          <div
            class="pa-2 rounded-circle"
            style="background-color: rgba(195, 195, 195, 0.4)"
          >
            <v-icon color="white" @click="props.onClick">mdi-arrow-left</v-icon>
          </div>
        </template>
        <v-carousel-item
          v-for="slide in slides"
          :key="slide.id"
          :src="slide.image_url"
          min-width="100%"
          cover
          rounded="xl"
        />
      </v-carousel>
    </header>

    <section class="d-flex justify-space-between align-center ga-6 py-3">
      <v-card
        v-for="(card, index) in cards"
        :key="index"
        :to="card.link"
        class="d-flex align-center justify-space-between ga-4 flex-grow-1 cursor-pointer"
        border="sm black"
        rounded="lg"
        elevation="0"
      >
        <v-card-title
          class="text-light-gray-2 font-weight-bold"
          style="font-size: 14px"
          >{{ card.title }}</v-card-title
        >
        <AppSvgIcon name="arrow-left" />
        <v-spacer />
        <img :src="`/images/${card.image}.svg`" :alt="`${card.title} image`" />
      </v-card>
    </section>
    <div class="d-flex align-center">
      <p class="text-light-gray-2 font-weight-medium">
        {{ t("dashboard.home.operations_logs") }}
      </p>
      <v-spacer />
      <nuxt-link
        :to="localePath('/dashboard/operations')"
        class="text-grey-300"
        style="font-size: 12px"
      >
        {{ t("dashboard.home.show_all") }}
      </nuxt-link>
    </div>
    <section class="py-3">
      <operations-all-operations
        @refresh="refresh"
        :operations="allOperations"
      />
    </section>
  </div>
  <v-skeleton-loader
    v-else
    class="radius-16"
    type="image, list-item-two-line, list-item-two-line, list-item-two-line"
  ></v-skeleton-loader>
</template>
