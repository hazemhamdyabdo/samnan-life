<template>
  <v-form>
    <h3>{{ $t("operations.know_ur_new_devices") }}</h3>
    <h5 class="mt-2">{{ $t("operations.enter_bill_number") }}</h5>
    <v-text-field
      class="mt-3"
      max-width="500"
      :label="$t('operations.ur_own_bill_number')"
    />
    <v-divider class="my-5"></v-divider>

    <h3 class="mt-10">{{ $t("operations.got_ur_devices") }}</h3>
    <h5 class="mt-2">{{ $t("operations.got_ur_devices_desc") }}</h5>
    <div v-for="i in 3" :key="i" class="d-flex align-center ga-4 mt-3">
      <v-avatar size="38" color="red"></v-avatar>
      <h4>جهاز تحلية سمنان 5 مراحل</h4>
    </div>

    <v-divider class="my-5"></v-divider>

    <operations-create-order-choose-address />

    <v-btn
      @click="$emit('next')"
      max-width="345px"
      width="100%"
      color="primary"
      class="mt-5"
    >
      {{ $t("buttons.next") }}
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
  </v-form>
</template>

<script setup>
defineEmits(["next"]);
</script>

<style lang="scss" scoped></style>
