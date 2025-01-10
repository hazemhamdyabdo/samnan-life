<script setup lang="ts">
import CardMenu from "@/components/Settings/CardMenu.vue";
</script>
<template>
  <section>
    <v-row>
      <v-col cols="3" style="min-height: calc(100vh - 100px)" class="pt-0">
        <CardMenu />
      </v-col>
      <v-col cols="9" style="min-height: calc(100vh - 100px)" class="pt-0">
        <v-card rounded="xl" height="100%" class="pa-4" elevation="2">
          <NuxtPage />
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>
