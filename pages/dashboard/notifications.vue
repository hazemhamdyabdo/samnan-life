<script setup>
const { dateAndTime } = useDateTimeFormate();
const { t } = useI18n();
const {
  fetchAllNotifications,
  setAllNotificationsRead,
  readSingleNotification,
} = useSettingsStore();
const btlnLoading = ref(false);
const { showSuccess } = useAlertStore();
const localePath = useLocalePath();
const { data } = await fetchAllNotifications();

const markAllRead = async () => {
  try {
    btlnLoading.value = true;
    await setAllNotificationsRead();
    showSuccess(t("operations.notifications_read"));
    data.value.data.forEach((item) => {
      item.read_at = true;
    });
  } catch (error) {
    throw new Error(error);
  } finally {
    btlnLoading.value = false;
  }
};

const gotToOrder = async (item) => {
  try {
    readSingleNotification(item.id);
    navigateTo(localePath(`/dashboard/order/${item.data.request_id}`));
  } catch (error) {
    throw new Error(error);
  }
};
</script>
<template>
  <main>
    <section class="d-flex justify-space-between align-center py-3">
      <h3 class="font-weight-medium text-light-gray-2" style="font-size: 20px">
        {{ t("dashboard.home.notifications.title") }}
      </h3>
      <v-btn
        :loading="btlnLoading"
        :disabled="btlnLoading"
        color="pri-light"
        @click="markAllRead"
      >
        {{ t("dashboard.home.notifications.button") }}
      </v-btn>
    </section>

    <section class="py-3">
      <v-card
        v-for="item in data.data"
        :key="item.id"
        class="d-flex justify-space-between align-center ga-4 pa-3 mb-4"
        border="sm black"
        rounded="lg"
        elevation="0"
        @click="gotToOrder(item)"
      >
        <v-badge
          dot
          location="top start"
          :color="item.read_at ? 'transparent' : 'error'"
        >
          <div class="img bg-pri-light rounded-circle pa-3">
            <v-icon color="primary">mdi-bell-outline</v-icon>
          </div>
        </v-badge>
        <div class="d-flex flex-column ga-2">
          <p class="text-grey-300" style="font-size: 12px">
            {{ item.data.message }}
          </p>
        </div>
        <v-spacer />
        <p class="text-grey-300" style="font-size: 12px">
          {{ dateAndTime(item.created_at) }}
        </p>
      </v-card>
    </section>
  </main>
</template>
