<script setup lang="ts">
const modelValue = defineModel("modelValue");
defineEmits(["submit"]);

defineProps({
  title: String,
  icon: String,
  text: String,
  okText: String,
  isDelete: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <v-dialog
    v-model="modelValue"
    @click:outside="$emit('update:modelValue', false)"
    max-width="500"
  >
    <v-card class="px-2" rounded="xl">
      <v-card-title class="border-b">
        <h3>{{ title }}</h3>
      </v-card-title>
      <v-card-text>
        <AppSvgIcon v-if="icon" :name="icon" class="mb-2" />
        <span>{{ text }}</span>
        <div>
          <slot></slot>
        </div>
      </v-card-text>

      <div class="d-flex pa-3 ga-3">
        <v-spacer></v-spacer>

        <v-btn
          @click="modelValue = false"
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
          :text="okText || $t('buttons.ok')"
        ></v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
