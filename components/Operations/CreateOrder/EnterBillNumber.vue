<template>
  <div>
    <h3>{{ $t("operations.know_ur_new_devices") }}</h3>
    <h5 class="mt-2">{{ $t("operations.enter_bill_number") }}</h5>
    <v-form class="mt-3">
      <v-text-field
        max-width="500"
        :label="$t('operations.ur_own_bill_number')"
      />
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
  </div>
</template>

<script setup>
defineEmits(["next"]);
</script>

<style lang="scss" scoped></style>
