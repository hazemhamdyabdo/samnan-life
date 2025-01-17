<script setup lang="ts">
import type { Address } from "~/types/settings";
import AddressDialog from "./AddressDialog.vue";

const settingsStore = useSettingsStore();
const { t } = useI18n();
const { formRef, rules, validate } = useFormValidation();
const { allCities, districts } = storeToRefs(settingsStore);
const { fetchAllCities, fetchAllDistricts } = settingsStore;

const emits = defineEmits<{
  (e: "add:new-address", value: Address): void;
}>();

defineProps<{
  isLoading: boolean;
}>();

const addressDetails = reactive<Address>({
  name: "",
  city_id: null,
  district_id: null,
  street: "",
  latitude: null,
  longitude: null,
  national_address: "",
  details: "",
});

const addressDialog = ref();
const handleOpenDialog = () => {
  addressDialog.value.showDialog();
};

const isDistrictLoafing = ref(false);
const getDistrict = async () => {
  isDistrictLoafing.value = true;
  if (addressDetails.city_id) {
    addressDetails.district_id = null;
    await fetchAllDistricts(+addressDetails.city_id);
  }
  isDistrictLoafing.value = false;
};

const emitAddressDetails = async () => {
  try {
    await validate();
    emits("add:new-address", {
      ...addressDetails,
      street: addressDetails.national_address, // TODO: change this after knowing where to get street
    });
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await fetchAllCities();
});
</script>

<template>
  <section>
    <section>
      <h4 class="text-20 text-grey-900">
        {{ t("dashboard.settings.addresses.add_address.header") }}
      </h4>
      <p class="text-light-gray-2 text-12 mt-2">
        {{ t("dashboard.settings.addresses.add_address.instructions") }}
      </p>
    </section>

    <v-form ref="formRef" @submit.prevent>
      <v-row class="mt-8">
        <v-col cols="6">
          <v-text-field
            v-model="addressDetails.name"
            :rules="[rules.required]"
            :label="t('dashboard.settings.addresses.add_address.address_name')"
          />
        </v-col>

        <v-col cols="6">
          <v-select
            v-model="addressDetails.city_id"
            :items="allCities"
            item-title="name"
            item-value="id"
            @update:model-value="getDistrict"
            :label="t('dashboard.settings.addresses.add_address.city')"
            :rules="[rules.required]"
            variant="outlined"
          />
        </v-col>

        <v-col cols="6">
          <v-select
            v-model="addressDetails.district_id"
            :items="districts"
            item-title="name"
            item-value="id"
            :label="
              t(
                'dashboard.settings.addresses.add_address.street_or_neighborhood'
              )
            "
            :loading="isDistrictLoafing"
            :rules="[rules.required]"
            variant="outlined"
          />
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="addressDetails.national_address"
            :rules="[rules.required]"
            :label="t('dashboard.settings.addresses.add_address.short_address')"
          />
          <p
            class="text-primary text-14 mt-2 font-weight-medium ps-2 cursor-pointer"
            @click="handleOpenDialog"
          >
            {{ t("dashboard.settings.addresses.add_address.know_how") }}
          </p>
        </v-col>

        <v-col cols="12">
          <v-textarea
            v-model="addressDetails.details"
            :label="
              t(
                'dashboard.settings.addresses.add_address.address_details_placeholder'
              )
            "
            color="primary"
            row-height="25"
            rows="3"
            base-color="light-gray"
            variant="outlined"
            hide-details
          />
        </v-col>

        <v-col cols="6" class="d-flex mt-8">
          <v-btn
            color="primary"
            type="submit"
            :loading="isLoading"
            size="50"
            round
            block
            @click="emitAddressDetails"
            >{{
              $t("dashboard.settings.addresses.add_address.save_address")
            }}</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </section>
  <AddressDialog ref="addressDialog" />
</template>
