<template>
  <div>
    <h3>{{ $t("operations.know_ur_new_devices") }}</h3>
    <h5 class="mt-2">{{ $t("operations.enter_bill_number") }}</h5>
    <v-form ref="formRef" class="mt-3">
      <v-text-field
        max-width="500"
        :label="$t('operations.ur_own_bill_number')"
        v-model="sap"
        :rules="[rules.required]"
      />
      <v-btn
        @click="submit()"
        max-width="345px"
        width="100%"
        color="primary"
        class="mt-5"
      >
        {{ $t("buttons.next") }}
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-form>
  </div>
</template>

<script setup>
const emit = defineEmits(["next"]);
const { rules, formRef, validate } = useFormValidation();
const { getSapOrder } = useMaintainStore();
const sap = ref("");
const submit = async () => {
  await validate();
  await getSapOrder(sap.value);
  emit("next");
};
</script>

<style lang="scss" scoped></style>
