<script setup>
import { useTechnicianStore } from "~/stores/useTechnician";

const { initializeNotification } = useNotification();
const { getTechnicianData } = useTechnicianStore();
const { isTechnician } = storeToRefs(useAuthStore());
const { fetchAllNotifications } = useSettingsStore();

await fetchAllNotifications();

onMounted(() => {
  isTechnician.value && getTechnicianData();
  initializeNotification(isTechnician.value ? "technician" : "customer");

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("Service Worker registered successfully:", registration);
      })
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
  }
  navigator.serviceWorker.getRegistrations().then(console.log);
});
</script>

<template>
  <v-app>
    <v-main>
      <NuxtLoadingIndicator />

      <v-container fluid>
        <!-- APP NAV -->
        <CommonNavBar />
        <v-row class="mt-4">
          <v-col cols="12" sm="2" lg="1">
            <CommonSideBar class="sticky"> </CommonSideBar>
          </v-col>
          <v-col col="12" sm="10" lg="11">
            <slot></slot>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
  z-index: 1000;
  @media (min-width: 960px) {
    min-height: calc(100vh - 20px);
  }
}
</style>
