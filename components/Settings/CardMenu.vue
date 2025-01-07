<script setup lang="ts"></script>
<template>
  <v-card class="pa-2" elevation="0" rounded="xl" border="sm black">
    <v-card-title>
      <h6 class="text-16">{{ $t("dashboard.settings.card.title") }}</h6>
    </v-card-title>
    <v-divider />
    <v-list
      density="compact"
      nav
      height="100%"
      class="d-flex flex-column ga-8 py-8"
    >
      <v-list-item> </v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped></style>
