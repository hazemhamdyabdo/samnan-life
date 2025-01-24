<script setup lang="ts">
import Update from "./Update.vue";
import SuccessVerification from "~/components/Settings/SuccessVerification.vue";

const emits = defineEmits<{ (e: "change-action", value: string): void }>();
const settingsStore = useSettingsStore();
const { customerData } = storeToRefs(settingsStore);
const { changePassword } = settingsStore;
const { showSuccess } = useAlertStore();

const components = {
  Update,
  SuccessVerification,
};
const currentComponent = ref("Update");
const changeComponent = (value: string) => {
  currentComponent.value = value;
};
const currentComponentView = computed(() => {
  // @ts-ignore
  return components[currentComponent.value];
});

// const passwordUpdates = ref({
//   phone: customerData.value!.phone,
//   current_password: "",
//   password: "",
//   confirm_password: "",
//   // otp: customerData.value!.otp,
// });

const isLoading = ref(false);
const handleUpdatePassword = async (nextStep: string, passwordUpdates: any) => {
  isLoading.value = true;
  try {
    await changePassword(passwordUpdates);
    // changeComponent(nextStep);
    showSuccess("Password has been changed");
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <v-col>
  <component
    :is="currentComponentView"
    :title="$t('dashboard.settings.profile.update_password.header')"
    :success-message="$t('dashboard.settings.verification.changed_password')"
    :isLoading="isLoading"
    :customer-data="customerData"
    @update:password="handleUpdatePassword"
    @change-action="emits('change-action', $event)"
  />
  </v-col>
  <!-- v-model:password="passwordUpdates" -->
</template>
