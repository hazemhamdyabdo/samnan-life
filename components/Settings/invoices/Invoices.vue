<script setup lang="ts">
const emit = defineEmits<{
  (e: "change-component", value: string): void;
}>();
const { t } = useI18n();
</script>
<template>
  <section class="d-flex align-center ga-2">
    <h2>
      {{ t("dashboard.settings.card.items.invoices") }}
    </h2>
  </section>

  <section class="mt-4 d-flex flex-column ga-6">
    <v-card
      @click="emit('change-component', 'viewBill')"
      class="pa-4 cursor-pointer"
      elevation="0"
      rounded="xl"
      style="border: 1px solid #223f99"
      v-for="invoice in 2"
    >
      <span class="text-gray-800">#202345</span>
      <div class="d-flex align-center ga-2 justify-space-between mt-4">
        <div>
          <p class="text-light-gray-2 font-weight-medium">
            جهاز تحلية سمنان 5 مراحل
          </p>
          <span class="text-primary font-weight-medium"> تركيب جديد </span>
        </div>
        <v-chip color="success" size="small" class="me-4">
          تم الدفع
          <v-icon> mdi-check </v-icon>
        </v-chip>
      </div>
      <section class="d-flex flex-column ga-4 mt-4">
        <div class="d-flex align-center ga-2">
          <AppSvgIcon name="location" :filled="false" class="text-primary" />
          <p class="text-gray-800">الرياض, حي الجلالة - منزل 144</p>
        </div>
        <div class="d-flex align-center ga-2">
          <AppSvgIcon name="clock" :filled="false" class="text-primary" />
          <p class="text-gray-800">10:32 PM</p>
        </div>
        <div class="d-flex align-center ga-2">
          <AppSvgIcon name="calendar" :filled="false" class="text-primary" />
          <p class="text-gray-800">8 oct 2024</p>
        </div>
      </section>
    </v-card>
  </section>
</template>

<style scoped></style>
