<template>
  <v-card-text class="h-100">
    <div class="h-100 d-flex justify-center align-center flex-column">
      <h3>{{ $t("operations.order_success") }}</h3>
      <h5 class="mt-2">{{ $t("operations.order_success_desc") }}</h5>
      <AppSvgIcon name="success" class="mt-2" :size="120"></AppSvgIcon>
      <v-btn
        :to="localePath('/dashboard/operations')"
        max-width="345px"
        width="100%"
        color="primary"
        class="mt-5"
      >
        {{ $t("buttons.ok") }}
      </v-btn>
    </div>
  </v-card-text>
</template>

<script setup></script>
