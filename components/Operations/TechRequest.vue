<template>
  <div class="d-flex align-center">
    <div class="d-flex flex-column ga-3 flex-grow-1">
      <div v-if="item?.sap_order_id" class="d-flex align-center ga-3">
        <AppSvgIcon name="menu-board" />
        <h5>
          {{ item?.sap_order_id }}
        </h5>
      </div>
      <div class="d-flex align-center ga-3">
        <AppSvgIcon name="user" />
        <h5>
          {{ item?.technician?.first_name }}
          {{ item?.technician?.last_name }}
        </h5>
      </div>
      <div class="d-flex align-center ga-2">
        <AppSvgIcon name="location-blue" />
        <div>
          <h5>{{ item.address.name }}, {{ item.address?.street }}</h5>
        </div>
      </div>
      <div class="d-flex align-center ga-3">
        <AppSvgIcon name="call" />
        <h5>{{ item?.technician?.phone }}</h5>
      </div>
      <div class="d-flex align-center ga-3">
        <AppSvgIcon name="calendar" />
        <h5>{{ formatToDateString(item?.slot?.date) }}</h5>
      </div>
      <div class="d-flex align-center ga-3">
        <AppSvgIcon name="clock" />
        <h5>{{ item?.slot?.time }}</h5>
      </div>

      <!-- description -->
      <div v-if="item.problem_description" class="mt-7">
        <h5>{{ $t("operations.problem") }}</h5>
        <p class="text-12 text-gray-500">
          {{ item.problem_description }}
        </p>
      </div>

      <div
        class="d-flex mt-2 align-center ga-2 flex-wrap"
        v-if="item?.photos?.length"
      >
        <v-img
          color="primary"
          height="60px"
          width="100%"
          max-width="60px"
          class="rounded-16"
          v-for="img in item?.photos"
          :key="img"
          :src="img"
        ></v-img>
      </div>
    </div>
    <nuxt-link
      :href="localePath('/dashboard/operations/track-order/' + item.id)"
      target="_blank"
      class="text-primary align-center text-12 d-flex ga-3"
    >
      <AppSvgIcon name="map" />
      <span>{{ $t("operations.show_map") }}</span>
    </nuxt-link>
  </div>
</template>

<script setup>
const { formatToDateString } = useDateTimeFormate("ar");

defineProps(["item"]);
</script>

<style lang="scss" scoped></style>
