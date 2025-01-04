<script setup lang="ts">
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
    <p class="text-light-gray-2 font-weight-medium" style="font-size: 24px">
      سجل العمليات
    </p>
    <v-spacer />
    <p class="text-grey-300" style="font-size: 18px">عرض الكل</p>
  </div>
</template>
