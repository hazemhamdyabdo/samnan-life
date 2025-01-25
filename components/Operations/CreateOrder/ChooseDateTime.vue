<script setup>
const { getAvailableSlot, confirmOrder } = useMaintainStore();

const btnLoading = ref(false);
const emit = defineEmits(["next"]);
const chosenDate = ref(null);
const times = ref([]);
const chosenTime = ref(null);
const getSlots = async () => {
  try {
    btnLoading.value = true;
    const { data } = await getAvailableSlot(chosenDate.value);
    times.value = data.value.data;
  } finally {
    btnLoading.value = false;
  }
};

const submitSlot = async () => {
  try {
    btnLoading.value = true;
    const { data } = await confirmOrder(chosenTime.value);
    console.log(data.value);
    emit("next");
  } finally {
    btnLoading.value = false;
  }
};

watch(
  () => chosenDate.value,
  () => {
    getSlots();
  },
  { deep: true }
);
</script>
<template>
  <v-form>
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
          v-model="chosenDate"
        />
      </v-col>
      <v-col cols="12">
        <div v-if="times.length" class="d-flex">
          <v-btn
            class="mx-1"
            v-for="slot in times"
            :value="slot.id"
            :key="slot.id"
            :color="chosenTime == slot.id ? 'primary' : 'disabled-gray'"
            height="32px"
            size="x-small"
            @click="chosenTime = slot.id"
          >
            {{ slot.time }}
          </v-btn>
        </div>
        <span v-else>لا يوجد مواعيد متاحة</span>
      </v-col>
    </v-row>
    <v-btn
      :loading="btnLoading"
      :disabled="btnLoading || !chosenTime"
      @click="submitSlot()"
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
