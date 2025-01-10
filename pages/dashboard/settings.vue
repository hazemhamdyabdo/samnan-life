<script setup lang="ts">
import CardMenu from "@/components/Settings/CardMenu.vue";
import Profile from "~/components/Settings/Profile.vue";
import Language from "~/components/Settings/Language.vue";
import Addresses from "~/components/Settings/Addresses.vue";
import Support from "~/components/Settings/Support.vue";
import Products from "~/components/Settings/Products.vue";
import Notifications from "~/components/Settings/Notifications.vue";
import Logout from "~/components/Settings/Logout.vue";

const selectedComponent = ref("profile");

const components = {
  profile: Profile,
  language: Language,
  addresses: Addresses,
  support: Support,
  products: Products,
  notifications: Notifications,
  logout: Logout,
};
const currentComponent = computed(() => {
  // @ts-ignore
  return components[selectedComponent.value];
});
</script>
<template>
  <section class="py-0">
    <v-row>
      <v-col cols="3">
        <CardMenu v-model:selectedCard="selectedComponent" />
      </v-col>
      <v-col cols="9">
        <v-card rounded="xl" height="100%" class="pa-4" elevation="2">
          <component :is="currentComponent" />
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>
