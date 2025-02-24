<template>
  <v-form ref="formRef">
    <h3>{{ $t("operations.know_ur_new_devices") }}</h3>
    <v-text-field disabled :model-value="sapNom" class="mt-3" max-width="500" />
    <v-divider class="my-5"></v-divider>

    <h3 class="mt-10">{{ $t("operations.got_ur_devices") }}</h3>
    <h5 class="mt-2">{{ $t("operations.got_ur_devices_desc") }}</h5>
    <div
      v-for="(product, index) in sapProducts"
      :key="index"
      class="d-flex align-center ga-4 mt-3"
    >
      <v-avatar size="38" color="pri-light">
        <v-img :src="product.image_url"></v-img>
      </v-avatar>
      <h4>{{ product.name }}</h4>
    </div>

    <v-divider class="my-5"></v-divider>

    <operations-create-order-choose-address
      :addresses="allAddresses"
      @update:address="form.address_id = $event"
    />

    <v-btn
      @click="submit"
      max-width="345px"
      width="100%"
      color="primary"
      class="mt-5"
      :loading="btnLoading"
      :disabled="btnLoading"
    >
      {{ $t("buttons.next") }}
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
  </v-form>
</template>

<script setup>
const emit = defineEmits(["next"]);
const { sapProducts, sapNom, createOrder } = useMaintainStore();
const settingsStore = useSettingsStore();
const { allAddresses } = storeToRefs(settingsStore);
const { fetchAllAddresses } = settingsStore;
const { formRef, validate } = useFormValidation();
const btnLoading = ref(false);
await fetchAllAddresses();

console.log(sapProducts);

const form = ref({
  type: "new_installation",
  products: sapProducts.map((product) => product.id),
  address_id: null,
});

const submit = async () => {
  await validate();
  try {
    btnLoading.value = true;
    await createOrder(form.value);
    emit("next");
  } finally {
    btnLoading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
