<script setup lang="ts">
const dialog = defineModel("dialog", {
  type: Boolean,
  default: false,
});
defineEmits(["submit"]);

withDefaults(
  defineProps<{
    title: string;
    icon: string;
    text: string;
    okText?: string;
    isDelete?: boolean;
    size?: "sm" | "md" | "lg" | "xl" | string | number;
    isLoading?: boolean;
  }>(),
  {
    isDelete: false,
    okText: "buttons.ok",
    size: "md",
  }
);
</script>

<template>
  <v-dialog v-model="dialog" @click:outside="dialog = false" max-width="500">
    <v-card class="px-2" rounded="xl">
      <v-card-title class="border-b">
        <h3 class="font-weight-medium">{{ title }}</h3>
      </v-card-title>
      <v-card-text>
        <AppSvgIcon v-if="icon" :name="icon" class="mb-2" :size />
        <span>{{ text }}</span>
        <div v-if="$slots.default" class="mt-4">
          <slot></slot>
        </div>
      </v-card-text>

      <div class="d-flex pa-3 ga-3">
        <v-spacer></v-spacer>

        <v-btn
          @click="dialog = false"
          color="pri-light"
          class="text-primary radius-16"
          height="50px"
          size="small"
          rounded="false"
          min-width="100px"
          :text="$t('buttons.back')"
        ></v-btn>

        <v-btn
          :color="isDelete ? 'error' : 'primary'"
          class="radius-16"
          height="50px"
          size="small"
          rounded="false"
          min-width="100px"
          @click="$emit('submit')"
          :loading="isLoading"
          :text="$t(okText)"
        ></v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>
