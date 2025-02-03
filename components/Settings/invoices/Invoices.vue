<script setup lang="ts">
const technicianStore = useTechnicianStore();
const { getTechnicianAllRequests } = technicianStore;
const { invoiceInterface } = storeToRefs(technicianStore);
const emit = defineEmits<{
  (e: "change-component", value: string, id: number): void;
}>();

const { t, locale } = useI18n();
const { formatToDateString } = useDateTimeFormate(locale.value);
const getStatus = useStatus();

await getTechnicianAllRequests();
</script>
<template>
  <section class="d-flex align-center ga-2">
    <h2>
      {{ t("dashboard.settings.card.items.invoices") }}
    </h2>
  </section>

  <section class="mt-4 d-flex flex-column ga-6">
    <v-card
      v-for="invoice in invoiceInterface"
      class="pa-4 cursor-pointer"
      elevation="0"
      rounded="xl"
      style="border: 1px solid #223f99"
      @click="emit('change-component', 'viewBill', invoice.id)"
    >
      <span class="text-gray-800">{{ invoice.invoice_number }}</span>
      <div class="d-flex align-center ga-2 justify-space-between mt-4">
        <div>
          <p class="text-light-gray-2 font-weight-medium">
            {{ invoice.productName }}
          </p>
          <span class="text-primary text-14 font-weight-medium">
            {{ t("operations." + invoice.type) }}</span
          >
        </div>
        <v-chip :color="getStatus(invoice.status)"
          >{{ "\u2022" }}
          {{ $t(`operations.${invoice.status}`) }}
        </v-chip>
      </div>
      <section class="d-flex flex-column ga-4 mt-4">
        <div class="d-flex align-center ga-2">
          <AppSvgIcon name="location" :filled="false" class="text-primary" />
          <!-- <p class="text-gray-800">الرياض, حي الجلالة - منزل 144</p> -->
          <div>
            <p class="text-12 mt-2 text-caption text-gray-800">
              {{ invoice.address.name }}, {{ invoice.address?.street }} ,{{
                invoice.address?.national_address
              }}
            </p>
          </div>
        </div>
        <div class="d-flex align-center ga-2">
          <AppSvgIcon name="clock" :filled="false" class="text-primary" />
          <!-- <p class="text-gray-800">10:32 PM</p> -->
          <p
            v-if="invoice.date"
            class="text-12 mt-2 text-caption text-gray-800"
          >
            {{ formatToDateString(invoice.date) + " " + invoice.time }}
          </p>
        </div>
        <!-- <div class="d-flex align-center ga-2">
          <AppSvgIcon name="calendar" :filled="false" class="text-primary" />
          <p class="text-gray-800">8 oct 2024</p>
        </div> -->
      </section>
    </v-card>
  </section>
</template>

<style scoped></style>
