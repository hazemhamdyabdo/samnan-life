<script setup lang="ts">
import type { Address } from "~/types/settings";
import Addresses from "~/components/Settings/addresses/Addresses.vue";
import NewAddress from "~/components/Settings/addresses/NewAddress.vue";

const { showSuccess } = useAlertStore();
const { t } = useI18n();
const settingsStore = useSettingsStore();
const { allAddresses } = storeToRefs(settingsStore);
const {
  fetchAllAddresses,
  createAddress,
  deleteAddress,
  getSingleAddress,
  updateAddress,
  // allAddresses,
} = settingsStore;

const componentsMap = {
  Addresses,
  NewAddress,
};

const currentComponent = ref("Addresses");
const changeComponent = (newComponent: string) => {
  currentComponent.value = newComponent;
};
const currentComponentView = computed(() => {
  // @ts-ignore
  return componentsMap[currentComponent.value];
});

const addressDetails = ref<Address>({
  name: "",
  city_id: null,
  district_id: null,
  street: "",
  latitude: null,
  longitude: null,
  national_address: "",
  details: "",
});
const isLoadingNewAddress = ref(false);
const addNewAddress = async (newAddress: Address) => {
  isLoadingNewAddress.value = true;
  try {
    await createAddress(newAddress);
    await fetchAllAddresses();
    changeComponent("Addresses");
    showSuccess("تمت اضافة العنوان بنجاح");
  } catch (error) {
    console.error("Error creating address:", error);
  } finally {
    isLoadingNewAddress.value = false;
  }
};

const deleteDialog = ref(false);
const deletedAddressId = ref<number>();
const handleOpenDialog = (addressId: number) => {
  deletedAddressId.value = addressId;
  deleteDialog.value = true;
};
const handleDeleteAddress = async () => {
  try {
    await deleteAddress(deletedAddressId.value as number);
    await fetchAllAddresses(), showSuccess("تم حذف العنوان بنجاح");
    deleteDialog.value = false;
  } catch (error) {
    console.log(error);
  }
};

const handleEditAddress = async (addressId: number) => {
  addressDetails.value = (await getSingleAddress(addressId)) as Address;
  changeComponent("NewAddress");
};

const handleUpdateAddress = async () => {
  isLoadingNewAddress.value = true;
  try {
    await updateAddress(addressDetails.value);
    await fetchAllAddresses();
    changeComponent("Addresses");
    showSuccess("تم تحديث العنوان بنجاح");
  } catch (error) {
    console.error("Error updating address:", error);
  } finally {
    isLoadingNewAddress.value = false;
  }
};

watchEffect(async () => {
  console.log(allAddresses.value);
});

await fetchAllAddresses();
// onMounted(async () => {
//   await fetchAllAddresses();
// });
</script>

<template>
  <section class="mb-8">
    <h3 class="text-20 text-header">
      {{ t("dashboard.settings.addresses.header") }}
    </h3>
  </section>
  <component
    :is="currentComponentView"
    :addresses="allAddresses"
    :isLoading="isLoadingNewAddress"
    v-model:addressDetails="addressDetails"
    @open:delete-dialog="handleOpenDialog"
    @add:new-address="addNewAddress"
    @edit-address="handleEditAddress"
    @update:address="handleUpdateAddress"
    @change-component="changeComponent"
  />

  <AppModal
    v-model:dialog="deleteDialog"
    :title="t('dashboard.settings.addresses.confirm_delete.header')"
    icon="trash"
    isDelete
    :text="t('dashboard.settings.addresses.confirm_delete.message')"
    :ok-text="'dashboard.modal.delete_account_btn'"
    @submit="handleDeleteAddress"
  />
</template>
