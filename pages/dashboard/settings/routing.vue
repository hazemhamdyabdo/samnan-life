<script setup lang="ts">
import { useTechnicianStore } from "~/stores/useTechnician";
const { coverDistricts } = storeToRefs(useTechnicianStore());
const { t } = useI18n();
</script>
<template>
  <section>
    <h4 class="text-20 text-grey-900">
      {{ t("dashboard.settings.graphic_scope_covered") }}
    </h4>

    <section class="mt-8">
      <div v-for="district in coverDistricts" :key="district.id">
        <div class="d-flex ga-1">
          <AppSvgIcon name="location" :filled="false" class="text-primary" />
          <p class="font-weight-medium">{{ district.city_name }}</p>
        </div>
        <ul class="city-list ps-12">
          <li class="mt-2">
            {{ district.name }}
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>

<style scoped>
.city-list {
  list-style-type: ". ";
}
</style>
