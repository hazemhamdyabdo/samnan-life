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

const passwordUpdates = reactive({
  phone: customerData.value!.phone,
  current_password: "",
  password: "",
  confirm_password: "",
});

const isLoading = ref(false);
const handleUpdatePassword = async (nextStep: string) => {
  isLoading.value = true;
  try {
    await changePassword(passwordUpdates);
    changeComponent(nextStep);
    showSuccess("Password has been changed");
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <component
    :is="currentComponentView"
    :title="$t('dashboard.settings.profile.update_password.header')"
    :success-message="$t('dashboard.settings.verification.changed_password')"
    :isLoading="isLoading"
    v-model:password="passwordUpdates"
    @update:password="handleUpdatePassword"
    @change-action="emits('change-action', $event)"
  />
</template>
