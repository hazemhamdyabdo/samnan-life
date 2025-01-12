<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section style="min-height: calc(100vh - 90px)">
    <section class="mt-8 d-flex ga-2 justify-space-between">
      <h4 class="text-20 text-grey-900">
        {{ t("dashboard.settings.products.add_product") }}
      </h4>
      <div class="d-flex ga-2">
        <v-text-field
          bg-color="disabled-gray"
          density="compact"
          flat
          variant="solo"
          :placeholder="t('operations.search')"
          height="42px"
          hide-details
          width="300px"
        >
        </v-text-field>
        <v-btn color="primary" height="42" size="small" rounded="lg">
          <AppSvgIcon name="filter" />
        </v-btn>
      </div>
    </section>
    <div class="d-flex mt-8 w-50">
      <v-btn color="primary" type="submit" round block size="50">{{
        $t("dashboard.save")
      }}</v-btn>
    </div>
  </section>
</template>

<style scoped></style>
