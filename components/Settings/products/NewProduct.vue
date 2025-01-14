<script setup lang="ts">
import ProductCard from "./ProductCard.vue";
import ProductFilterDialog from "./ProductFilterDialog.vue";

const { t } = useI18n();
const filterDialog = ref();

const showFilterDialog = () => {
  filterDialog.value.showDialog();
};
</script>

<template>
  <section
    class="d-flex flex-column ga-12"
    style="min-height: calc(100vh - 90px)"
  >
    <section class="d-flex ga-2 justify-space-between">
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
        <v-btn
          @click="showFilterDialog"
          color="primary"
          height="42"
          size="small"
          rounded="lg"
        >
          <AppSvgIcon name="filter" />
        </v-btn>
      </div>
    </section>

    <section class="d-flex flex-wrap ga-4 justify-space-between">
      <ProductCard v-for="i in 10" />
    </section>

    <div class="d-flex w-50">
      <v-btn color="primary" type="submit" round block size="50">{{
        $t("dashboard.save")
      }}</v-btn>
    </div>
  </section>
  <ProductFilterDialog ref="filterDialog" />
</template>
