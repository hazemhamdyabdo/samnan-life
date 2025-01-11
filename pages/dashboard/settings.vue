<script setup lang="ts">
import CardMenu from "@/components/Settings/CardMenu.vue";
</script>
<template>
  <section>
    <v-row>
      <v-col cols="3">
        <CardMenu />
      </v-col>
      <v-col cols="9">
        <v-card rounded="xl" class="pa-4" elevation="2">
          <NuxtPage />
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>
