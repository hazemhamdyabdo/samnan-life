<script setup>
const { confirmOrder } = useMaintainStore();
const { orderData } = storeToRefs(useMaintainStore());
</script>

<template>
  <div>
    {{ orderData }}
    <h3 class="mt-10">{{ $t("operations.order_summary") }}</h3>
    <h5 class="mt-2">{{ $t("operations.order_summary_desc") }}</h5>

    <h3 class="mt-5">{{ $t("operations.bill_number") }}</h3>
    <h5 class="mt-2">231351514561132</h5>

    <h3 class="mt-5">{{ $t("operations.ordered_devices") }}</h3>
    <div v-for="i in 2" :key="i" class="d-flex align-center ga-4 mt-3">
      <v-avatar size="22" color="red"></v-avatar>
      <h4>جهاز تحلية سمنان 5 مراحل</h4>
    </div>

    <h3 class="mt-5">{{ $t("operations.address") }}</h3>
    <div class="d-flex mt-2 align-center ga-2">
      <AppSvgIcon name="location-blue" />
      <div>
        <h3 class="text-gray-500">المنزل الاول</h3>
        <p class="text-12 mt-2 text-caption date">
          الرياض, حي الجلالة, منزل 144
        </p>
      </div>
    </div>

    <div class="mt-5">
      <h3>{{ $t("operations.date_time") }}</h3>
      <div class="d-flex align-center ga-3 mt-2">
        <AppSvgIcon name="calendar" />
        <h5>السبت 2024-05-12</h5>
      </div>
      <div class="d-flex align-center ga-3 mt-2">
        <AppSvgIcon name="clock" />
        <h5>12:30 PM</h5>
      </div>
    </div>
    <v-btn
      max-width="345px"
      width="100%"
      color="primary"
      class="mt-5"
      @click="$emit('next')"
    >
      {{ $t("buttons.confirm_order") }}
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
  </div>
</template>

<style lang="scss" scoped></style>
