<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean;
  customerData: any;
}>();
const emits = defineEmits<{
  (e: "update:password", value: string, data: any): void;
}>();

const isInputOneShow = ref(false);
const isInputTwoShow = ref(false);
const isInputThreeShow = ref(false);

const { formRef, rules, validate } = useFormValidation();

const passwordUpdates = ref({
  phone: props.customerData.phone,
  current_password: "",
  password: "",
  confirm_password: "",
  // otp: props.customerData.otp,
});

const handleClick = async () => {
  try {
    await validate();
    emits("update:password", "SuccessVerification", passwordUpdates.value);
  } catch (error) {
    console.error("Form validation failed:", error);
  }
};
</script>
<template>
  <v-row class="px-4 d-flex flex-column">
    <v-col class="text-20 text-header pt-8 font-weight-bold">
      {{ $t("dashboard.settings.profile.update_password.header") }}
    </v-col>
    <v-col>
      <p class="text-header font-weight-medium mb-2">
        {{ $t("dashboard.settings.profile.update_password.edit_title") }}
      </p>
      <p class="text-light-gray-2 text-12 font-weight-medium">
        {{ $t("dashboard.settings.profile.update_password.instruction") }}
      </p>
    </v-col>

    <v-col cols="12" class="pb-0">
      <v-form fast-fail ref="formRef" @submit.prevent>
        <v-row>
          <v-col cols="6">
            <v-text-field
              :type="isInputOneShow ? 'text' : 'password'"
              label=""
              v-model="passwordUpdates.current_password"
              :rules="[rules.required, rules.minLength(8)]"
              rounded="lg"
              base-color="border-light"
              variant="outlined"
              density="comfortable"
              :placeholder="
                $t(
                  'dashboard.settings.profile.update_password.current_password'
                )
              "
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
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              :type="isInputTwoShow ? 'text' : 'password'"
              label=""
              v-model="passwordUpdates.password"
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
          <v-col cols="6">
            <v-text-field
              :type="isInputThreeShow ? 'text' : 'password'"
              label=""
              v-model="passwordUpdates.confirm_password"
              :rules="[
                rules.required,
                rules.confirmPassword(
                  passwordUpdates.confirm_password,
                  passwordUpdates.password
                ),
              ]"
              rounded="lg"
              base-color="border-light"
              variant="outlined"
              density="comfortable"
              :placeholder="
                $t(
                  'dashboard.settings.profile.update_password.confirm_password'
                )
              "
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
        </v-row>
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
            >{{ $t("dashboard.save") }}</v-btn
          >
        </v-col>
      </v-form>
    </v-col>
  </v-row>
</template>

<style scoped></style>
