<template>
  <div>
    <h5>{{ $t("operations.devices_to_maintain") }}</h5>
    <div
      v-for="product in item.products"
      :key="product.id"
      class="d-flex mt-3 ga-2"
    >
      <v-avatar size="22" color="primary">
        <v-img :src="product.image_url"></v-img>
      </v-avatar>
      <h5 class="text-gray-500">{{ product.name }}</h5>
    </div>

    <!-- track -->
    <div class="d-flex mt-7 align-center">
      <h5>{{ $t("operations.location") }}</h5>
      <v-spacer></v-spacer>
      <nuxt-link
        :to="localePath('/dashboard/operations/track-order/' + item.id)"
        class="text-primary align-center text-12 d-flex ga-3"
      >
        <AppSvgIcon name="map" />
        <span>{{ $t("operations.track") }}</span>
      </nuxt-link>
    </div>

    <!-- location -->
    <div class="d-flex align-center ga-2">
      <AppSvgIcon name="location-blue" />
      <div>
        <h5 class="text-gray-500">
          {{ item.address?.national_address }}
        </h5>
        <p class="text-12 mt-2 text-caption date">
          {{ item.address.name }}, {{ item.address?.street }}
        </p>
      </div>
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
    <!-- maintain date -->
    <div class="mt-7" v-if="item?.slot">
      <h5 class="mb-3">{{ $t("operations.maintain_date") }}</h5>
      <div class="d-flex align-center ga-3">
        <AppSvgIcon name="calendar" />
        <h5>{{ formatToDateString(item?.slot?.date) }}</h5>
      </div>
      <div class="d-flex align-center ga-3 mt-2">
        <AppSvgIcon name="clock" />
        <h5>{{ item?.slot?.time }}</h5>
      </div>
    </div>

    <!-- maintainer details -->
    <div class="mt-7">
      <h5 class="mb-3">{{ $t("operations.maintainer") }}</h5>
      <div class="d-flex align-center ga-3">
        <AppSvgIcon name="user" />
        <h5>
          {{ item?.technician?.first_name }}
          {{ item?.technician?.last_name }}
        </h5>
      </div>
      <div class="d-flex align-center ga-3 mt-2">
        <AppSvgIcon name="call" />
        <h5>{{ item?.technician?.phone }}</h5>
      </div>
    </div>
    <div v-if="item?.current_status.status == 'pending'">
      <v-btn @click="$emit('delete')" variant="text" color="error" class="mt-7">
        <v-icon>mdi-delete-outline</v-icon>
        {{ $t("operations.cancel_order") }}
      </v-btn>

      <v-btn
        @click="$emit('edit')"
        color="primary"
        variant="text"
        class="d-block"
      >
        <v-icon>mdi-pencil</v-icon>
        {{ $t("operations.edit_order") }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
const { formatToDateString } = useDateTimeFormate("ar");

defineProps(["item"]);

defineEmits(["delete", "edit"]);
</script>

<style lang="scss" scoped></style>
