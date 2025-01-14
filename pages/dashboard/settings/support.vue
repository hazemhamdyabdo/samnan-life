<script setup lang="ts">
const { t } = useI18n();
</script>
<template>
  <section style="min-height: calc(100vh - 30px)">
    <section class="mb-8">
      <h3 class="text-20 text-header">
        {{ t("dashboard.settings.support.title") }}
      </h3>
    </section>
    <section>
      <h4 class="text-20 text-grey-900">
        {{ t("dashboard.settings.support.title") }}
      </h4>
      <p class="text-light-gray-2 text-12 mt-2">
        {{ t("dashboard.settings.support.subtitle") }}
      </p>
    </section>

    <v-row class="mt-8">
      <v-col cols="6">
        <v-select
          :items="['Item 1', 'Item 2', 'Item 3', 'Item 4']"
          :label="t('dashboard.settings.support.topic')"
          required
          variant="outlined"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          :label="t('dashboard.settings.support.details')"
          color="primary"
          row-height="25"
          rows="3"
          base-color="light-gray"
          variant="outlined"
          hide-details
        />
        <p class="text-grey-600 mt-2">
          {{ t("dashboard.settings.support.placeholder.details") }}
        </p>
      </v-col>

      <v-col cols="6" class="d-flex mt-8">
        <v-btn color="primary" type="submit" round block size="50">{{
          $t("dashboard.settings.support.button.submit")
        }}</v-btn>
      </v-col>
    </v-row>
  </section>
</template>

<style scoped></style>
