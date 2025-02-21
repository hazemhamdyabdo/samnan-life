<script lang="ts" setup>
const { showPermissionDialog, requestPermission } = useNotification();
</script>

<template>
  <div v-if="showPermissionDialog" class="custom-dialog">
    <v-sheet width="650" class="pa-4" rounded="lg">
      <v-btn
        icon="mdi-window-close"
        variant="text"
        @click="showPermissionDialog = false"
      />

      <div class="text-center">
        <v-img
          class="mx-auto mb-4"
          src="~/assets/imgs/success.svg"
          alt="success"
          width="70"
        />

        <p class="text-22 font-weight-bold text-capitalize text-wrap mb-4">
          {{ $t("notifications_permission") }}
        </p>

        <v-btn
          variant="elevated"
          size="large"
          color="primary"
          block
          rounded="lg"
          @click="requestPermission"
        >
          {{ $t("allow") }}
        </v-btn>
      </div>
    </v-sheet>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  padding: 20px;
}

.custom-dialog {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: -1;
  }
}
</style>
