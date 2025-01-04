<script setup lang="ts">
const { getFormattedDate } = useFormatDate();

const cards = [
  {
    title: "تركيب جهاز جديد",
    link: "/new-device",
    image: "new-device",
  },
  {
    title: "صيانة عاجلة",
    link: "/",
    image: "urgent-maintenance",
  },
  {
    title: "صيانة دورية",
    link: "/",
    image: "regular-maintenance",
  },
];

const operationLogs = [
  {
    title: "صيانة عاجلة",
    created_at: Date.now() + 10000,
    status: "ناجحه",
    icon: "sm-urgent-maintenance",
  },
  {
    title: "صيانة دورية",
    created_at: Date.now() + 20000,
    status: "ناجحه",
    icon: "sm-urgent-maintenance",
  },
  {
    title: "صيانة عاجلة",
    created_at: Date.now() + 30000,
    status: "ناجحه",
    icon: "sm-urgent-maintenance",
  },
  {
    title: "صيانة دورية",
    created_at: Date.now() + 40000,
    status: "ناجحه",
    icon: "sm-urgent-maintenance",
  },
  {
    title: "صيانة دورية",
    created_at: Date.now() + 50000,
    status: "ناجحه",
    icon: "sm-urgent-maintenance",
  },
];
</script>
<template>
  <header>
    <v-carousel height="100%" hide-delimiter-background>
      <template v-slot:prev="{ props }">
        <div
          class="pa-2 rounded-circle"
          style="background-color: rgba(195, 195, 195, 0.4)"
        >
          <v-icon color="white" @click="props.onClick">mdi-arrow-right</v-icon>
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
      <v-carousel-item v-for="i in 3" src="/images/dashboard-panner.png" />
    </v-carousel>
  </header>

  <section class="d-flex justify-space-between align-center ga-6 py-3">
    <v-card
      v-for="card in cards"
      class="d-flex align-center justify-space-between ga-4 flex-grow-1 cursor-pointer"
      border="md border-light-200"
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
    <p class="text-light-gray-2 font-weight-medium">سجل العمليات</p>
    <v-spacer />
    <p class="text-grey-300" style="font-size: 12px">عرض الكل</p>
  </div>
  <section class="py-3">
    <v-expansion-panels v-for="log in operationLogs" elevation="0">
      <v-expansion-panel class="mb-4" rounded="xl">
        <v-expansion-panel-title>
          <template v-slot:actions>
            <v-icon color="primary" icon="mdi-chevron-down"></v-icon>
          </template>
          <img
            :src="`/images/${log.icon}.svg`"
            :alt="`${log.title} image`"
            class="me-2"
          />
          <div class="d-flex flex-column ga-2">
            <h5 style="font-size: 14px" class="text-light-gray-2">
              {{ log.title }}
            </h5>
            <p class="text-grey-300" style="font-size: 12px">
              {{ getFormattedDate(log.created_at) }}
            </p>
          </div>
          <v-spacer />
          <v-chip color="success" class="me-4">
            <v-icon
              start
              size="x-small"
              :color="log.status === 'ناجحه' ? 'success' : 'error'"
              >mdi-circle</v-icon
            >
            <span class="font-weight-medium">
              {{ log.status }}
            </span>
          </v-chip>
        </v-expansion-panel-title>
        <v-expansion-panel-text> Some content </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </section>
</template>
