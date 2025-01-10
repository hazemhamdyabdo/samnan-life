<template>
  <v-card rounded="xl">
    <v-card-title>
      <h2>{{ $t("operations.add_new_card") }}</h2>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col lg="6" cols="12">
          <v-text-field
            type="number"
            :label="$t('operations.card_number')"
            hide-spin-buttons
          />
        </v-col>
        <v-col lg="6" cols="12">
          <v-text-field :label="$t('operations.card_name')" />
        </v-col>
        <v-col cols="12" lg="3">
          <v-text-field
            hide-spin-buttons
            type="number"
            :label="$t('operations.ccv')"
          />
        </v-col>
        <v-col cols="12" lg="3">
          <v-text-field :label="$t('operations.exp_date')" />
        </v-col>
      </v-row>
      <v-btn
        color="primary"
        class="mt-10 radius-16"
        min-width="300px"
        rounded="false"
      >
        {{ $t("operations.add_card") }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup></script>

<style lang="scss" scoped></style>
