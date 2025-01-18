<script setup lang="ts">
const { formRef, rules, validate } = useFormValidation();

defineProps<{
  isLoading: boolean;
}>();
const emits = defineEmits(["change-component", "submit:phone-number"]);
const phoneNumber = defineModel("phone-number");

const handleClick = async () => {
  try {
    await validate();
    emits("submit:phone-number", "OTPVerification");
  } catch (error) {
    console.error("Form validation failed:", error);
  }
};
</script>
<template>
  <v-row class="px-4 d-flex flex-column">
    <v-col class="text-20 text-header pt-8 font-weight-bold">
      {{ $t("dashboard.settings.profile.update_phone.header") }}
    </v-col>
    <v-col>
      <p class="text-header font-weight-medium mb-2">
        {{ $t("dashboard.settings.profile.update_phone.edit_title") }}
      </p>
      <p class="text-light-gray-2 text-12 font-weight-medium">
        {{ $t("dashboard.settings.profile.update_phone.instruction") }}
      </p>
    </v-col>
    <v-col cols="6" class="pb-0">
      <v-form ref="formRef" fast-fail @submit.prevent class="d-flex ga-2">
        <v-card
          rounded="lg"
          border="sm black"
          color="transparent"
          elevation="0"
          height="50"
          class="d-flex align-center border border-opacity-25 ga-2 px-4 cursor-auto"
        >
          <AppSvgIcon name="SA" />
          <p>+966</p>
        </v-card>
        <v-text-field
          label=""
          rounded="lg"
          :rules="[rules.required, rules.phoneNumber]"
          variant="outlined"
          base-color="border-light"
          density="comfortable"
          :placeholder="$t('register.fields.phone_number')"
          v-model="phoneNumber"
        />
      </v-form>
    </v-col>
    <v-col cols="4">
      <v-btn
        @click="handleClick"
        :loading="isLoading"
        color="primary"
        type="submit"
        round
        block
        size="50"
        rounded="lg"
        >{{ $t("dashboard.send") }}</v-btn
      >
    </v-col>
  </v-row>
</template>
