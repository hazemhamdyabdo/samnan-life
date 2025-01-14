<template>
  <v-card
    rounded="xl"
    width="fit-content"
    border="sm black"
    class="pa-4 cursor-pointer position-relative"
    elevation="0"
  >
    <v-checkbox
      class="checkbox"
      color="primary"
      density="compact"
      hide-details
    />
    <img src="/images/product.png" />
    <p class="text-light-gray-2 text-14 font-weight-bold">
      دينمو سمنان – 1 حصان
    </p>
  </v-card>
</template>

<style scoped>
.checkbox {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 50;
  background-color: #e9efff;
  border-radius: 8px;
}

:deep(.checkbox.v-checkbox .v-selection-control) {
  min-height: unset !important;
}
:deep(.checkbox .v-selection-control__input > .v-icon) {
  opacity: 0.2;
}

:deep(
    .checkbox .v-selection-control--dirty .v-selection-control__input > .v-icon
  ) {
  opacity: 1;
}
</style>
