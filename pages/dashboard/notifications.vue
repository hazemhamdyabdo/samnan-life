<script setup lang="ts">
const { dateAndTime } = useDateTimeFormate();
const { t } = useI18n();

const notificationCards = [
  {
    title: "حالة الصيانة",
    description: "تم اتمام عملية الصيانة بنجاح يرجى مراحعة جدولك",
    created_at: new Date(Date.now() + 10000),
  },
  {
    title: "حالة الصيانة",
    description: "تم اتمام عملية الصيانة بنجاح يرجى مراحعة جدولك",
    created_at: new Date(Date.now() + 20000),
  },
  {
    title: "حالة الصيانة",
    description: "تم اتمام عملية الصيانة بنجاح يرجى مراحعة جدولك",
    created_at: new Date(Date.now() + 30000),
  },
  {
    title: "حالة الصيانة",
    description: "تم اتمام عملية الصيانة بنجاح يرجى مراحعة جدولك",
    created_at: new Date(Date.now() + 40000),
  },
];
</script>
<template>
  <main>
    <section class="d-flex justify-space-between align-center py-3">
      <h3 class="font-weight-medium text-light-gray-2" style="font-size: 20px">
        {{ t("dashboard.home.notifications.title") }}
      </h3>
      <div class="me-4 bg-pri-light rounded-xl px-3 py-1 cursor-pointer">
        <span class="font-weight-medium text-primary" style="font-size: 14px">
          {{ t("dashboard.home.notifications.button") }}
        </span>
      </div>
    </section>

    <section class="py-3">
      <v-card
        v-for="card in notificationCards"
        class="d-flex justify-space-between align-center ga-4 pa-3 mb-4"
        border="sm black"
        rounded="lg"
        elevation="0"
      >
        <img
          :src="`/images/notifications-bill.png`"
          :alt="`${card.title} image`"
          class="me-2"
        />
        <div class="d-flex flex-column ga-2">
          <h5 style="font-size: 14px" class="text-light-gray-2">
            {{ card.title }}
          </h5>
          <p class="text-grey-300" style="font-size: 12px">
            {{ card.description }}
          </p>
        </div>
        <v-spacer />
        <p class="text-grey-300" style="font-size: 12px">
          {{ dateAndTime(card.created_at) }}
        </p>
      </v-card>
    </section>
  </main>
</template>
