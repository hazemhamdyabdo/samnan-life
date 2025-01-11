<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section style="min-height: calc(100vh - 90px)">
    <section>
      <h4 class="text-20 text-grey-900">
        {{ t("dashboard.settings.addresses.add_address.header") }}
      </h4>
      <p class="text-light-gray-2 text-12 mt-2">
        {{ t("dashboard.settings.addresses.add_address.instructions") }}
      </p>
    </section>

    <v-row class="mt-8">
      <v-col cols="6">
        <v-select
          :items="['Item 1', 'Item 2', 'Item 3', 'Item 4']"
          :label="t('dashboard.settings.addresses.add_address.city')"
          required
          variant="outlined"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          :label="t('dashboard.settings.addresses.add_address.address_name')"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          :label="t('dashboard.settings.addresses.add_address.short_address')"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-select
          :items="['Item 1', 'Item 2', 'Item 3', 'Item 4']"
          :label="
            t('dashboard.settings.addresses.add_address.street_or_neighborhood')
          "
          required
          variant="outlined"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          :label="
            t(
              'dashboard.settings.addresses.add_address.address_details_placeholder'
            )
          "
          color="primary"
          row-height="25"
          rows="3"
          base-color="light-gray"
          variant="outlined"
          hide-details
        ></v-textarea>
      </v-col>
    </v-row>
  </section>
</template>
