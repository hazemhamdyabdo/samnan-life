<template>
  <v-dialog v-model="dialog" @click:outside="dialog = false" max-width="780">
    <v-card class="pa-5" rounded="xl">
      <v-card-title>
        <h3 class="font-weight-medium">{{ $t("operations.bell") }}</h3>
      </v-card-title>
      <v-card-text>
        <div class="steps d-flex">
          <div :class="`step ${currentStep >= 0 ? 'active' : ''}`"></div>
          <div :class="`step ${currentStep === 1 ? 'active' : ''}`"></div>
        </div>
        <div class="step-one" v-if="currentStep == 0">
          <h3 class="mt-3">{{ $t("operations.enter_price") }}</h3>
          <h5>{{ $t("operations.enter_price_desc") }}</h5>
          <v-select
            class="my-5"
            :items="services"
            v-model="chosenServices"
            multiple
            item-title="name"
            :placeholder="$t('operations.choose_service')"
            item-value="id"
          ></v-select>
          <v-textarea
            v-model="note"
            :placeholder="$t('operations.enter_note')"
          ></v-textarea>
        </div>

        <div class="step-one" v-if="currentStep == 1">
          <h3 class="mt-3">{{ $t("operations.enter_spare") }}</h3>
          <h5>{{ $t("operations.enter_spare_desc") }}</h5>
          <div class="spare-item" v-for="spare in allChosenSpares" :key="spare">
            <span>{{ spare.quantity }}</span>
            <h5>{{ spare.name }}</h5>
            <v-spacer></v-spacer>
            <span>{{ spare.price * spare.quantity }} ر.س</span>
          </div>
          <v-btn
            @click="showSpareModal = true"
            size="small"
            height="40"
            variant="text"
            color="primary"
          >
            <v-icon>mdi-plus</v-icon>
            {{ $t("operations.add_spare") }}
          </v-btn>
        </div>
        <v-btn
          color="primary"
          class="radius-16 mt-5"
          height="50px"
          size="small"
          rounded="false"
          min-width="200px"
          :disabled="!chosenServices.length"
          @click="submit()"
          :loading="submitLoading"
          :disable="submitLoading"
        >
          <div class="d-flex ga-4">
            <span>
              {{ $t("buttons.next") }}
            </span>
            <v-icon>mdi-chevron-left</v-icon>
          </div>
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- NOTE: SPARE MODAL -->
    <app-modal
      :title="$t('operations.spares')"
      :text="$t('operations.spares_desc')"
      v-model:dialog="showSpareModal"
      @submit="submitSpare"
    >
      <v-form class="mt-5">
        <v-row>
          <v-col cols="6">
            <v-select
              :items="spares"
              v-model="chosenSpare"
              hide-details
              item-title="name"
              :placeholder="$t('operations.choose_spare')"
              item-value="id"
              return-object
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-number-input
              :min="1"
              control-variant="split"
              hide-details
              v-model="quantity"
              :placeholder="$t('operations.enter_quantity')"
            />
          </v-col>
        </v-row>
      </v-form>
    </app-modal>
  </v-dialog>
</template>

<script setup>
const { getServices, getSpareParts, waitPayment } = useTechnicianStore();
const currentStep = ref(0);
const services = ref([]);
const chosenServices = ref([]);
const chosenSpare = ref(null);
const quantity = ref(0);
const spares = ref([]);
const showSpareModal = ref(false);
const submitLoading = ref(false);
const allChosenSpares = ref([]);
const note = ref("");
const dialog = defineModel("dialog", {
  type: Boolean,
  default: false,
});

const emit = defineEmits(["refresh"]);
const props = defineProps({
  id: Number,
});
const submit = async () => {
  if (currentStep.value == 0 && chosenServices.value) {
    currentStep.value = 1;
  } else {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;

          const spare_parts = allChosenSpares.value.map((spare) => ({
            id: spare.id,
            quantity: spare.quantity,
          }));
          const data = {
            services: chosenServices.value.map((id) => ({
              id,
            })),
            spare_parts,
            note: note.value,
            lat,
            long,
          };

          try {
            submitLoading.value = true;
            await waitPayment(props.id, data);
            emit("refresh");
          } catch {
          } finally {
            submitLoading.value = false;
          }
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      alrt("Geolocation is not supported by this browser.");
    }
  }
};

const submitSpare = () => {
  // check if the spare is already in the array
  const index = allChosenSpares.value.findIndex(
    (spare) => spare.id === chosenSpare.value
  );
  if (index === -1) {
    // if the spare is not in the array, add it
    allChosenSpares.value.push({
      id: chosenSpare.value.id,
      quantity: quantity.value,
      name: chosenSpare.value.name,
      price: chosenSpare.value.price,
    });
  } else {
    // if the spare is in the array, update its quantity
    allChosenSpares.value[index].quantity += quantity.value;
  }

  chosenSpare.value = null;
  quantity.value = 0;
  showSpareModal.value = false;
};

onMounted(async () => {
  const { data } = await getServices();
  const { data: sparesRes } = await getSpareParts();
  services.value = data.value.data;
  spares.value = sparesRes.value.data;
});
</script>

<style lang="scss" scoped>
.steps {
  gap: 10px;
  .step {
    flex-grow: 1;
    height: 4px;
    border-radius: 3px;
    background-color: #cecece;
    &.active {
      background-color: #ffca29;
    }
  }
}
.spare-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  border-radius: 6px;
  background-color: #efefef;
  padding: 10px;
}
</style>
