<script setup>
import { useFormValidation } from "~/composables/useFormValidation";

const { formRef, rules, validate } = useFormValidation();
const emits = defineEmits(["change:step-three"]);

const isInputOneShow = ref(false);
const isInputTwoShow = ref(false);
const isInputThreeShow = ref(false);
const passwordUpdates = defineModel("passwordUpdates");

const handleSubmit = async () => {
  try {
    await validate();
    emits("change:step-three");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div>
    <h3 class="font-weight-medium">
      {{ $t("forget_password.new_password.title") }}
    </h3>
    <span>{{ $t("forget_password.new_password.instructions") }}</span>
  </div>
  <v-form fast-fail ref="formRef" @submit.prevent>
    <v-row>
      <!-- <v-col cols="6" sm="12" class="pt-0"> -->
      <!-- <v-text-field
          :type="isInputOneShow ? 'text' : 'password'"
          label=""
          v-model="passwordUpdates.current_password"
          :rules="[rules.required, rules.minLength(8)]"
          rounded="lg"
          base-color="border-light"
          variant="outlined"
          density="comfortable"
          :placeholder="$t('forget_password.current_password')"
        >
          <template #append-inner>
            <div
              class="cursor-pointer"
              @click="isInputOneShow = !isInputOneShow"
            >
              <v-icon color="border-light" v-if="!isInputOneShow"
                >mdi-eye-off</v-icon
              >
              <v-icon color="border-light" v-else>mdi-eye</v-icon>
            </div>
          </template>
        </v-text-field>
      </v-col> -->
      <v-col cols="6" sm="12" class="pt-0">
        <v-text-field
          :type="isInputTwoShow ? 'text' : 'password'"
          label=""
          v-model="passwordUpdates.current_password"
          :rules="[rules.required, rules.minLength(8)]"
          rounded="lg"
          base-color="border-light"
          variant="outlined"
          density="comfortable"
          :placeholder="$t('forget_password.new_password.title')"
        >
          <template #append-inner>
            <div
              class="cursor-pointer"
              @click="isInputTwoShow = !isInputTwoShow"
            >
              <v-icon color="border-light" v-if="!isInputTwoShow"
                >mdi-eye-off</v-icon
              >
              <v-icon color="border-light" v-else>mdi-eye</v-icon>
            </div>
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="6" sm="12" class="pt-0">
        <v-text-field
          label=""
          :type="isInputThreeShow ? 'text' : 'password'"
          v-model="passwordUpdates.confirm_password"
          base-color="border-light"
          rounded="lg"
          variant="outlined"
          density="comfortable"
          :placeholder="$t('forget_password.confirm_password')"
          :rules="[
            rules.required,
            rules.confirmPassword(
              passwordUpdates.confirm_password,
              passwordUpdates.current_password
            ),
          ]"
        >
          <template #append-inner>
            <div
              class="cursor-pointer"
              @click="isInputThreeShow = !isInputThreeShow"
            >
              <v-icon color="border-light" v-if="!isInputThreeShow"
                >mdi-eye-off</v-icon
              >
              <v-icon color="border-light" v-else>mdi-eye</v-icon>
            </div>
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="12" class="pt-0">
        <v-btn
          @click="handleSubmit"
          color="primary"
          round
          block
          size="50"
          rounded="lg"
          >{{ $t("forget_password.new_password.button") }}</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>
