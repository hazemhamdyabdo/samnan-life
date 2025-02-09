<script setup lang="ts">
import AppModal from "~/components/app/Modal.vue";
import type { UpdateProfileRequest } from "~/types/settings";

const { isTechnician } = storeToRefs(useAuthStore());
const { deleteAccount } = useAuthStore();
const settingsStore = useSettingsStore();
const { getCustomerData, updateProfile } = settingsStore;
const { customerData } = storeToRefs(settingsStore);
const { t } = useI18n();
const { showSuccess } = useAlertStore();

const emits = defineEmits(["change-action"]);

const fullName = computed(() => {
  if (customerData.value?.first_name && customerData.value.last_name)
    return customerData.value?.first_name + " " + customerData.value?.last_name;
});
const nameShortcuts = computed(() => {
  const names = fullName.value?.split(" ");
  if (names?.length) {
    return names[0][0] + names[1][0];
  }
});
const details = ref({}) as Ref<{
  first_name: string;
  last_name?: string;
  email?: string | null;
  phone_number: string;
  id?: number;
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

const isInputShow = ref(false);
const accountPassword = ref();
const isDeleteAccLoading = ref(false);
const handleDeleteAccount = async () => {
  isDeleteAccLoading.value = true;
  try {
    await deleteAccount(accountPassword.value);
    navigateTo("/login");
    dialog.value = false;
  } catch (error) {
    console.log(error);
  } finally {
    isDeleteAccLoading.value = false;
  }
};

const copyToClipboard = (id: number | undefined) => {
  if (!id) return;
  const el = document.createElement("textarea");
  el.value = id.toString();
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  showSuccess("تم نسخ الرقم");
};

await getCustomerData();
onMounted(async () => {
  if (customerData.value) {
    details.value = {
      first_name: customerData.value.first_name,
      last_name: customerData.value?.last_name,
      email: customerData.value?.email,
      phone_number: customerData.value?.phone,
      id: customerData.value?.id,
    };
  }
});
</script>

<template>
  <v-col cols="12">
    <h3 class="text-20 text-header">
      {{ t("dashboard.settings.profile.my_profile") }}
    </h3>
  </v-col>
  <v-col cols="12" class="mb-4">
    <v-avatar
      size="100"
      color="primary"
      class="mx-auto text-white font-weight-medium text-40"
    >
      {{ nameShortcuts }}
    </v-avatar>

    <p class="text-24 text-header font-weight-medium mt-4">
      {{ fullName }}
    </p>
  </v-col>

  <v-row>
    <v-col cols="12" lg="6" class="pa-4">
      <v-text-field
        v-model="details.first_name"
        :label="t('dashboard.settings.profile.first_name')"
        variant="outlined"
        color="primary"
        rounded="xl"
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="12" :lg="isTechnician ? 3 : 6" class="pa-4">
      <v-text-field
        v-model="details.last_name"
        :label="t('dashboard.settings.profile.last_name')"
        variant="outlined"
        color="primary"
        rounded="xl"
        hide-details
      ></v-text-field>
    </v-col>
    <v-col
      v-if="isTechnician"
      cols="12"
      lg="3"
      class="pa-4 cursor-pointer"
      @click="copyToClipboard(details.id)"
    >
      <v-text-field
        v-model="details.id"
        :label="t('dashboard.settings.profile.id')"
        variant="outlined"
        color="#E2E2E2"
        disabled
        base-color="#E2E2E2"
        bg-color="#E2E2E2"
        rounded="xl"
        hide-details
        class="cursor-pointer"
      >
        <template #append-inner>
          <v-icon color="primary" class="cursor-pointer"
            >mdi-content-copy</v-icon
          >
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="4" lg="2" class="pa-4">
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
    <v-col cols="8" lg="5" class="pa-4">
      <v-text-field
        v-model="details.phone_number"
        :label="t('dashboard.settings.profile.phone')"
        color="#E2E2E2"
        bg-color="#E2E2E2"
        disabled
        hide-details
      ></v-text-field
    ></v-col>
    <v-col cols="12" lg="5" class="pa-4">
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

  <!-- <v-row> -->
  <v-col
    v-if="!isTechnician"
    cols="12"
    class="d-flex align-center ga-2 cursor-pointer"
    @click="emits('change-action', 'Phone')"
  >
    <AppSvgIcon name="call" />
    <p class="text-primary font-weight-medium">
      {{ t("dashboard.settings.profile.change_phone") }}
    </p>
  </v-col>
  <v-col
    cols="12"
    class="d-flex align-center ga-2 cursor-pointer"
    @click="emits('change-action', 'Password')"
  >
    <AppSvgIcon name="lock" />
    <p class="font-weight-medium text-primary">
      {{ t("dashboard.settings.profile.change_password") }}
    </p>
  </v-col>
  <v-col cols="12" lg="6" v-if="!isTechnician">
    <v-btn
      block
      color="primary"
      rounded="xl"
      :loading="isLoading"
      @click="saveNewData"
    >
      {{ t("dashboard.settings.profile.save_changes") }}</v-btn
    >
  </v-col>
  <v-col
    v-if="!isTechnician"
    cols="12"
    @click="dialog = true"
    class="d-flex align-center ga-2 cursor-pointer"
  >
    <AppSvgIcon name="profile-delete" />
    <p class="font-weight-medium text-gray-500">
      {{ t("dashboard.settings.profile.delete_account") }}
    </p>
  </v-col>
  <!-- </v-row> -->

  <AppModal
    v-model:dialog="dialog"
    :title="t('dashboard.modal.delete_account')"
    icon="trash"
    isDelete
    :text="t('dashboard.modal.confirm_delete_password')"
    :ok-text="'dashboard.modal.delete_account_btn'"
    :is-loading="isDeleteAccLoading"
    @submit="handleDeleteAccount"
  >
    <v-text-field
      v-model="accountPassword"
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
