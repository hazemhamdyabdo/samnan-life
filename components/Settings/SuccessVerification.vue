<script setup lang="ts">
defineProps<{
  title: string;
  receiver: string;
  target?: string;
  successMessage?: string;
}>();

const emits = defineEmits<{ (e: "change-action", value: string): void }>();
</script>
<template>
  <section>
    <h3 class="text-20 text-header pt-8">
      {{ title }}
    </h3>
    <section class="d-flex justify-center mt-8">
      <div class="d-flex text-center flex-column ga-2">
        <p class="text-header font-weight-bold">
          {{ $t("dashboard.settings.verification.changed") }} {{ title }}
          {{ $t("dashboard.settings.verification.successfully") }}!
        </p>
        <p v-if="successMessage" class="text-light-gray-2 font-weight-regular">
          {{ successMessage }}
        </p>
        <p v-else class="text-light-gray-2 font-weight-regular">
          {{ $t("dashboard.settings.verification.added") }} {{ receiver }}
          {{ $t("dashboard.settings.verification.to") }} {{ target }}
        </p>
        <div class="d-flex justify-center my-4">
          <v-img src="../../public/images/complete.png" max-width="120"></v-img>
        </div>
        <div>
          <v-btn
            color="primary"
            @click="emits('change-action', 'Profile')"
            width="100%"
            height="50"
            rounded="lg"
          >
            {{ $t("dashboard.ok") }}
          </v-btn>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped></style>
