<template>
  <div>
    <h3 class="mt-10">{{ $t("operations.client_location") }}</h3>
    <h5 class="mt-2">{{ $t("operations.client_location_desc") }}</h5>
    <v-radio-group
      column
      class="mt-5"
      @update:modelValue="$emit('update:address', $event)"
      v-model="chosenAdress"
      :rules="[rules.required]"
    >
      <v-radio
        v-for="address in addresses"
        :key="address.id"
        color="primary"
        :value="address.id"
        class="mt-3"
      >
        <template v-slot:label>
          <div class="d-flex align-center ga-2">
            <AppSvgIcon name="location" />
            <div>
              <h3 class="text-gray-500">{{ address.name }}</h3>
              <p class="text-12 mt-1 text-caption date">
                {{ address.national_address }}, {{ address.street }}
              </p>
            </div>
          </div>
        </template>
      </v-radio>
    </v-radio-group>
    <v-btn
      variant="text"
      class="text-primary font-weight-bold d-flex align-center mt-3"
      @click="dialog = true"
    >
      <v-icon>mdi-plus</v-icon>
      {{ $t("operations.add_address") }}
    </v-btn>
    <v-dialog v-model="dialog" max-width="800">
      <v-card color="white" rounded="xl">
        <v-card-text>
          <NewAddress
            :isLoading="isLoadingNewAddress"
            @add:new-address="addNewAddress"
            v-model:addressDetails="addressDetails"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import NewAddress from "~/components/Settings/addresses/NewAddress.vue";

const { rules } = useFormValidation();
const { showSuccess } = useAlertStore();
const settingsStore = useSettingsStore();
const { createAddress, fetchAllAddresses } = settingsStore;

onMounted(() => {});
defineProps(["addresses"]);
const emit = defineEmits(["update:address", "refresh-adresses"]);
const dialog = ref(false);
const chosenAdress = ref("");
const isLoadingNewAddress = ref(false);
const addressDetails = ref({
  name: "",
  city_id: null,
  district_id: null,
  street: "",
  latitude: null,
  longitude: null,
  national_address: "",
  details: "",
});

const addNewAddress = async (newAddress) => {
  isLoadingNewAddress.value = true;
  try {
    await createAddress(newAddress);
    await fetchAllAddresses();
    showSuccess("تمت اضافة العنوان بنجاح");
    dialog.value = false;
    emit("refresh-adresses");
  } catch (error) {
    console.error("Error creating address:", error);
  } finally {
    isLoadingNewAddress.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
