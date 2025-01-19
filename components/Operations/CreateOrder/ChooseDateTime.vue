<script setup>
const { getAvailableSlot } = useMaintainStore();
const { formRef, rules, validate } = useFormValidation();

const btnLoading = ref(false);
const emit = defineEmits(["next"]);
const chosenDate = ref(new Date());
const times = ref([]);
const chosenTime = ref(null);
const getSlots = async () => {
  await validate();
  try {
    btnLoading.value = true;
    const { data } = await getAvailableSlot(chosenDate.value);
    times.value = data.value.data;
  } finally {
    btnLoading.value = false;
  }
};

const submitSlot = async () => {};
</script>
<template>
  <v-form ref="formRef">
    <h3>{{ $t("operations.choose_date_time") }}</h3>
    <h5 class="mt-2">{{ $t("operations.choose_date_time_desc") }}</h5>
    <v-row>
      <v-col cols="12">
        <v-date-input
          class="mt-5"
          dir="rtl"
          variant="outlined"
          color="primary"
          @keydown.prevent
          hide-details="auto"
          :width="'100%'"
          max-width="534"
          prepend-icon=""
          append-inner-icon="mdi-calendar-outline"
          rounded="xl"
          :rules="[rules.required]"
          v-model="chosenDate"
        />
      </v-col>
      <v-col cols="12">
        <div v-if="times.length" class="d-flex">
          <v-btn
            class="mx-1"
            :variant="chosenTime == slot.id ? 'flat' : 'outlined'"
            v-for="slot in times"
            :value="slot.id"
            :key="slot.id"
            :color="'primary'"
            @click="chosenTime = slot.id"
          >
            {{ slot.time }}
          </v-btn>
        </div>
        <span v-else>لا يوجد مواعيد</span>
      </v-col>
    </v-row>
    <v-btn
      :loading="btnLoading"
      :disabled="btnLoading"
      @click="chosenTime ? submitSlot() : getSlots()"
      max-width="345px"
      width="100%"
      color="primary"
      class="mt-5"
    >
      {{ $t("buttons.next") }}
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
  </v-form>
</template>

<style lang="scss" scoped></style>
