<script setup>
const filters = ref({
  type: 0,
});

const setType = (type) => {
  filters.value.type = type;
};
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
          @click="setType(0)"
          :color="filters.type === 0 ? 'primary' : 'disabled-gray'"
          rounded
        >
          {{ $t("buttons.all") }}
        </v-btn>
        <v-btn
          @click="setType(i)"
          v-for="i in 5"
          :key="i"
          :color="filters.type === i ? 'primary' : 'disabled-gray'"
          rounded
        >
          {{ i }}
        </v-btn>
      </div>
    </v-card-text>

    <v-card-text class="mt-5">
      <h3 class="text-16 font-weight-medium">{{ $t("operations.status") }}</h3>
      <div class="d-flex ga-2 flex-wrap mt-4 align-center">
        <v-btn
          @click="setType(0)"
          :color="filters.type === 0 ? 'primary' : 'disabled-gray'"
          rounded
        >
          {{ $t("buttons.all") }}
        </v-btn>
        <v-btn
          @click="setType(i)"
          v-for="i in 5"
          :key="i"
          :color="filters.type === i ? 'primary' : 'disabled-gray'"
          rounded
        >
          {{ i }}
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
      />
    </v-card-text>
  </v-card>
</template>
