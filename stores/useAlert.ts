import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", () => {
  const alert = ref(false)
  const alertMessage = ref('')
  const alertType = ref('')

  const showSuccess = (message: string) => {
    alertType.value = 'success';
    alertMessage.value = message;
    alert.value = true;
  };

  const showError = (message: string) => {
    alertType.value = 'error';
    alertMessage.value = message;
    alert.value = true;
  };

  return {
    showSuccess,
    showError,
    alert,
    alertMessage,
    alertType
  };
});