<script setup lang="ts">
import AppModal from "~/components/app/Modal.vue";
import type { UpdateProfileRequest } from "~/types/settings";

const settingsStore = useSettingsStore();
const { getCustomerData, updateProfile } = settingsStore;
const { customerData } = storeToRefs(settingsStore);
const { t } = useI18n();
const { showSuccess } = useAlertStore();

const emits = defineEmits(["change-action"]);

const isInputShow = ref(false);
const password = ref("");
const details = ref({}) as Ref<{
  first_name: string;
  last_name?: string;
  email?: string | null;
  phone_number: string;
}>;

const isLoading = ref(false);
const saveNewData = async () => {
  isLoading.value = true;
  try {
    await updateProfile(details.value as UpdateProfileRequest);
    getCustomerData();
    showSuccess("تم تحديث البيانات بنجاح");
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const dialog = ref(false);
onMounted(async () => {
  await getCustomerData();

  if (customerData.value) {
    details.value = {
      first_name: customerData.value.first_name,
      last_name: customerData.value?.last_name,
      email: customerData.value?.email,
      phone_number: customerData.value?.phone,
    };
  }
});
</script>

<template>
  <div class="mb-8 px-4">
    <h3 class="text-20 text-header">
      {{ t("dashboard.settings.profile.my_profile") }}
    </h3>
  </div>
  <div class="px-4 mb-8">
    <v-avatar
      size="100"
      color="primary"
      class="mx-auto text-white font-weight-medium text-40"
    >
      AA
    </v-avatar>

    <p class="text-24 text-header font-weight-medium">Ahmed Ali</p>
  </div>
  <v-row>
    <v-col cols="6" class="pa-4">
      <v-text-field
        v-model="details.first_name"
        :label="t('dashboard.settings.profile.first_name')"
        variant="outlined"
        color="primary"
        rounded="xl"
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="6" class="pa-4">
      <v-text-field
        v-model="details.last_name"
        :label="t('dashboard.settings.profile.last_name')"
        variant="outlined"
        color="primary"
        rounded="xl"
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="2" class="pa-4">
      <v-text-field
        value="+966"
        label=""
        variant="outlined"
        color="#E2E2E2"
        base-color="#E2E2E2"
        bg-color="#E2E2E2"
        rounded="xl"
        disabled
        hide-details
        width="120"
      >
        <template #prepend-inner>
          <AppSvgIcon name="SA" />
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="5" class="pa-4">
      <v-text-field
        v-model="details.phone_number"
        :label="t('dashboard.settings.profile.phone')"
        color="#E2E2E2"
        bg-color="#E2E2E2"
        disabled
        hide-details
      ></v-text-field
    ></v-col>
    <v-col cols="5" class="pa-4">
      <v-text-field
        v-model="details.email"
        :label="t('dashboard.settings.profile.email')"
        variant="outlined"
        color="primary"
        rounded="xl"
        hide-details
      ></v-text-field
    ></v-col>
  </v-row>
  <section class="d-flex flex-column ga-4 py-4">
    <div
      class="d-flex align-center ga-2 cursor-pointer"
      @click="emits('change-action', 'Phone')"
    >
      <AppSvgIcon name="call" />
      <p class="text-primary font-weight-medium">
        {{ t("dashboard.settings.profile.change_phone") }}
      </p>
    </div>
    <div
      class="d-flex align-center ga-2 cursor-pointer"
      @click="emits('change-action', 'Password')"
    >
      <AppSvgIcon name="lock" />
      <p class="font-weight-medium text-primary">
        {{ t("dashboard.settings.profile.change_password") }}
      </p>
    </div>
  </section>
  <div class="mt-2">
    <v-btn
      width="30%"
      color="primary"
      height="50"
      rounded="xl"
      :loading="isLoading"
      @click="saveNewData"
    >
      {{ t("dashboard.settings.profile.save_changes") }}</v-btn
    >
  </div>
  <div
    @click="dialog = true"
    class="d-flex align-center ga-2 mt-4 cursor-pointer"
  >
    <AppSvgIcon name="profile-delete" />
    <p class="font-weight-medium text-gray-500">
      {{ t("dashboard.settings.profile.delete_account") }}
    </p>
  </div>

  <AppModal
    v-model:dialog="dialog"
    :title="t('dashboard.modal.delete_account')"
    icon="trash"
    isDelete
    :text="t('dashboard.modal.confirm_delete_password')"
    :ok-text="'dashboard.modal.delete_account_btn'"
  >
    <v-text-field
      v-model="password"
      :label="t('dashboard.settings.profile.update_password.current_password')"
      :type="isInputShow ? 'text' : 'password'"
    >
      <template #append-inner>
        <div class="cursor-pointer" @click="isInputShow = !isInputShow">
          <v-icon color="border-light" v-if="!isInputShow">mdi-eye-off</v-icon>
          <v-icon color="border-light" v-else>mdi-eye</v-icon>
        </div>
      </template>
    </v-text-field>
  </AppModal>
</template>
