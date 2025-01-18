<template>
  <div>
    <h3>{{ $t("operations.choose_date_time") }}</h3>
    <h5 class="mt-2">{{ $t("operations.choose_date_time_desc") }}</h5>

    <v-date-input
      class="mt-5"
      dir="rtl"
      variant="outlined"
      color="primary"
      @keydown.prevent
      hide-details="auto"
      :width="'100%'"
      max-width="534"
      prepend-icon=""
      append-inner-icon="mdi-calendar-outline"
      rounded="xl"
    />
    <v-btn
      @click="$emit('next')"
      max-width="345px"
      width="100%"
      color="primary"
      class="mt-5"
    >
      {{ $t("buttons.next") }}
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
  </div>
</template>

<script setup>
defineEmits(["next"]);
</script>

<style lang="scss" scoped></style>
