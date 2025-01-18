<template>
  <v-form>
    <h3>{{ $t("operations.choose_device") }}</h3>
    <h5 class="mt-2">{{ $t("operations.choose_device_desc") }}</h5>
    <v-radio-group column class="mt-5">
      <v-radio v-for="i in 3" :key="i" color="primary" :value="i" class="mt-3">
        <template v-slot:label>
          <div class="d-flex align-center ga-2">
            <v-avatar size="38" color="red"></v-avatar>
            <h4>جهاز تحلية سمنان 5 مراحل</h4>
          </div>
        </template>
      </v-radio>
    </v-radio-group>

    <v-divider class="my-5"></v-divider>

    <div>
      <h3>{{ $t("operations.choose_last_maintenance") }}</h3>
      <h5 class="mt-2">
        {{ $t("operations.choose_last_maintenance_desc") }}
      </h5>
      <v-date-input
        class="mt-5"
        dir="rtl"
        variant="outlined"
        color="primary"
        @keydown.prevent
        hide-details="auto"
        :width="'100%'"
        prepend-icon=""
        max-width="534"
        append-inner-icon="mdi-calendar-outline"
        rounded="xl"
      />
      <v-checkbox color="primary" hide-details>
        <template v-slot:label>
          <h5>
            {{ $t("operations.no_last_maintenance") }}
          </h5>
        </template>
      </v-checkbox>
    </div>

    <v-divider class="my-5"></v-divider>

    <operations-create-order-choose-address />

    <v-divider class="my-5"></v-divider>
    <v-row>
      <v-col>
        <v-textarea no-resize :label="$t('operations.ur_problem')" />
      </v-col>
      <v-col>
        <AppPhotoUploader />
      </v-col>
    </v-row>

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
  </v-form>
</template>

<script setup>
defineEmits(["next"]);
</script>
