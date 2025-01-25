<script setup>
const emit = defineEmits(["filter"]);
const filters = ref({
  types: [],
  statuses: [],
  date: null,
});

const types = [
  "new_installation",
  "regular_maintenance",
  "emergency_maintenance",
];

const statuses = [
  "pending",
  "technician_assigned",
  "technician_on_the_way",
  "in_progress",
  "waiting_for_payment",
  "completed",
  "canceled",
];

watch(
  () => filters.value,
  () => {
    emit("filter", filters.value);
  },
  { deep: true }
);
</script>

<template>
  <v-card flat class="border" rounded="xl">
    <v-card-title>
      <h3 class="text-16 font-weight-medium">{{ $t("operations.filters") }}</h3>
      <p class="text-12 font-weight-regular">
        {{ $t("operations.filter_desc") }}
      </p>
    </v-card-title>

    <v-card-text class="mt-10">
      <h3 class="text-16 font-weight-medium">{{ $t("operations.type") }}</h3>
      <div class="d-flex ga-2 flex-wrap mt-4 align-center">
        <v-btn
          @click="filters.types = ''"
          :color="filters.types === '' ? 'primary' : 'disabled-gray'"
          rounded
        >
          {{ $t("buttons.all") }}
        </v-btn>
        <v-btn
          @click="filters.types.push(type)"
          v-for="type in types"
          :key="type"
          :color="filters.types.includes(type) ? 'primary' : 'disabled-gray'"
          rounded
        >
          {{ $t(`operations.${type}`) }}
        </v-btn>
      </div>
    </v-card-text>

    <v-card-text class="mt-5">
      <h3 class="text-16 font-weight-medium">{{ $t("operations.status") }}</h3>
      <div class="d-flex ga-2 flex-wrap mt-4 align-center">
        <v-btn
          @click="filters.statuses = ''"
          :color="filters.statuses === '' ? 'primary' : 'disabled-gray'"
          rounded
        >
          {{ $t("buttons.all") }}
        </v-btn>
        <v-btn
          @click="filters.statuses.push(status)"
          v-for="status in statuses"
          :key="status"
          :color="
            filters.statuses.includes(status) ? 'primary' : 'disabled-gray'
          "
          rounded
        >
          {{ $t(`operations.${status}`) }}
        </v-btn>
      </div>
    </v-card-text>

    <v-card-text>
      <h3 class="text-16 font-weight-medium">
        {{ $t("operations.date_filter") }}
      </h3>
      <v-date-input
        class="mt-4"
        dir="rtl"
        variant="outlined"
        color="primary"
        @keydown.prevent
        hide-details="auto"
        :width="'100%'"
        prepend-icon=""
        append-inner-icon="mdi-calendar-outline"
        rounded="xl"
        multiple="range"
        v-model="filters.date"
      />
    </v-card-text>
  </v-card>
</template>
