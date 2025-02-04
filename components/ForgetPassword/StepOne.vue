<script setup lang="ts">
import { useFormValidation } from "~/composables/useFormValidation";

const emits = defineEmits(["change:step-one"]);
defineProps({
  isLoading: Boolean,
});
const phoneNumber = defineModel("phoneNumber");

const { formRef, rules, validate } = useFormValidation();

const handleSubmit = async () => {
  try {
    await validate();
    emits("change:step-one");
  } catch (error) {
    // alert(error);
  }
};
</script>

<template>
  <div>
    <h3 class="font-weight-medium">{{ $t("forget_password.title") }}</h3>
    <span>{{ $t("forget_password.instructions") }}</span>
  </div>
  <v-form fast-fail ref="formRef" @submit.prevent>
    <v-row class="mt-2">
      <v-col cols="12">
        <div class="d-flex ga-2">
          <v-card
            rounded="lg"
            color="transparent"
            border="sm gray-800"
            elevation="0"
            height="50"
            class="d-flex align-center ga-2 px-4"
          >
            <SvgIcon name="SA" class="cursor-auto" />
            <p>+966</p>
          </v-card>
          <v-text-field
            v-model="phoneNumber"
            label=""
            type="number"
            rounded="lg"
            variant="outlined"
            base-color="border-light"
            :rules="[rules.required, rules.phoneNumber]"
            density="comfortable"
            :placeholder="$t('login.phone')"
            hide-spin-buttons
          />
        </div>
      </v-col>
      <v-col cols="12" sm="12" class="pt-0">
        <v-btn
          @click="handleSubmit"
          color="primary"
          :loading="isLoading"
          type="submit"
          round
          block
          size="50"
          rounded="lg"
          >{{ $t("forget_password.button") }}</v-btn
        >
      </v-col>
      <v-col cols="12" sm="12" class="text-center pt-0">
        <p>
          <NuxtLink to="/login" class="text-primary font-weight-bold">{{
            $t("forget_password.back_to_login")
          }}</NuxtLink>
        </p>
      </v-col>
    </v-row>
  </v-form>
</template>
