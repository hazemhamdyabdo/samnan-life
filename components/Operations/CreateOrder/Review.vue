<script setup>
const { getSingleOrder } = useMaintainStore();
const orderData = ref(null);
const { formatToDateString } = useDateTimeFormate("ar");
const { data } = await getSingleOrder();
orderData.value = data.value?.data;
</script>

<template>
  <div>
    <div class="d-flex align-center ga-2">
      <AppSvgIcon name="success" class="mt-2" :size="30"></AppSvgIcon>
      <h3>{{ $t("operations.order_success") }}</h3>
    </div>
    <h3 class="mt-5">{{ $t("operations.order_summary") }}</h3>
    <h5 class="mt-2">{{ $t("operations.order_summary_desc") }}</h5>

    <h3 class="mt-5" v-if="orderData?.invoice_number">
      {{ $t("operations.bill_number") }}
    </h3>
    <h5 class="mt-2">{{ orderData?.invoice_number }}</h5>

    <h3 class="mt-5">{{ $t("operations.ordered_devices") }}</h3>
    <div
      v-for="product in orderData.products"
      :key="product.id"
      class="d-flex align-center ga-4 mt-3"
    >
      <v-avatar size="22" color="primary">
        <v-img :src="product.image_url" :lazy-src="product.image_url"></v-img>
      </v-avatar>
      <h4>{{ product.name }}</h4>
    </div>

    <h3 class="mt-5">{{ $t("operations.address") }}</h3>
    <div class="d-flex mt-2 align-center ga-2">
      <AppSvgIcon name="location-blue" />
      <div>
        <h3 class="text-gray-500">{{ orderData.address?.national_address }}</h3>
        <p class="text-12 mt-2 text-caption date">
          {{ orderData.address.name }}, {{ orderData.address?.street }}
        </p>
      </div>
    </div>

    <div>
      <h3 class="mt-5">{{ $t("operations.problem_summary") }}</h3>
      <h3 class="mt-2">{{ orderData?.problem_description }}</h3>
      <div
        class="d-flex mt-2 align-center ga-2 flex-wrap"
        v-if="orderData?.photos?.length"
      >
        <v-img
          color="primary"
          height="60px"
          width="100%"
          max-width="60px"
          class="rounded-16"
          v-for="img in orderData?.photos"
          :key="img"
          :src="img"
        ></v-img>
      </div>
    </div>

    <div class="mt-5">
      <h3>{{ $t("operations.date_time") }}</h3>
      <div class="d-flex align-center ga-3 mt-2">
        <AppSvgIcon name="calendar" />
        <h5>{{ formatToDateString(orderData?.slot?.date) }}</h5>
      </div>
      <div class="d-flex align-center ga-3 mt-2">
        <AppSvgIcon name="clock" />
        <h5>{{ orderData?.slot?.time }}</h5>
      </div>
    </div>

    <div class="mt-5">
      <h3>{{ $t("operations.tech_info") }}</h3>
      <div class="d-flex align-center ga-3 mt-2">
        <AppSvgIcon name="profile" />
        <h5>
          {{ orderData?.technician?.first_name }}
          {{ orderData?.technician?.last_name }}
        </h5>
      </div>
      <div class="d-flex align-center ga-3 mt-2">
        <AppSvgIcon name="call" />
        <h5>{{ orderData?.technician?.phone }}</h5>
      </div>
    </div>
    <v-btn
      max-width="345px"
      width="100%"
      color="primary"
      class="mt-5"
      :to="localePath('/dashboard/operations')"
    >
      {{ $t("buttons.ok") }}
    </v-btn>
  </div>
</template>

<style lang="scss" scoped></style>
