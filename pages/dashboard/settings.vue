<script setup lang="ts">
import CardMenu from "@/components/Settings/CardMenu.vue";

const route = useRoute();
const { isTechnician } = storeToRefs(useAuthStore());
const technicianStore = useTechnicianStore();
if (isTechnician.value) {
  const { getTechnicianData } = technicianStore;
  await getTechnicianData();
}
</script>
<template>
  <section>
    <v-row>
      <v-col cols="12" lg="3">
        <CardMenu />
      </v-col>
      <v-col cols="12" lg="9">
        <v-card
          v-if="route.path !== '/dashboard/settings/invoices'"
          rounded="xl"
          class="pa-4"
          elevation="2"
          height="100%"
        >
          <NuxtPage />
        </v-card>
        <NuxtPage v-else />
      </v-col>
    </v-row>
  </section>
</template>
