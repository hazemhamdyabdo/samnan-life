<script setup lang="ts">
import NewProduct from "~/components/Settings/products/NewProduct.vue";

import type { CreateRequest } from "~/types/maintain/index";
import { useFormValidation } from "~/composables/useFormValidation";
const { createOrder } = useMaintainStore();

const { formRef, rules, validate } = useFormValidation();

const emit = defineEmits(["next"]);
defineProps(["products", "addresses"]);

const showNewProductDialog = ref(false);
const form = ref<CreateRequest>({
  type: useRoute().params.type,
  products: [],
  photos: [],
  last_maintenance_date: null,
  problem_description: "",
  address_id: null,
});
const btnLoading = ref(false);

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

const setPhotos = (photos: File[]) => {
  form.value.photos = photos;
};
</script>

<template>
  <v-dialog max-width="1000" v-model="showNewProductDialog">
    <v-card rounded="xl" bg-color="pri-light" min-height="300">
      <v-card-text>
        <div class="d-flex mb-5">
          <v-spacer></v-spacer>
          <v-icon color="error" @click="showNewProductDialog = false"
            >mdi-close</v-icon
          >
        </div>
        <NewProduct @change-component="showNewProductDialog = false" />
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-form ref="formRef">
    <h3>{{ $t("operations.choose_device") }}</h3>
    <h5 class="mt-2">{{ $t("operations.choose_device_desc") }}</h5>

    <v-checkbox
      v-for="product in products"
      :key="product.id"
      color="primary"
      :value="product.id"
      class="mt-3"
      v-model="form.products"
      :rules="[rules.minLength(1)]"
      hide-details
    >
      <template v-slot:label>
        <div class="d-flex align-center ga-2">
          <v-avatar size="38" color="primary">
            <v-img alt="John" :src="product.image_url"></v-img>
          </v-avatar>
          <h4>{{ product.name }}</h4>
        </div>
      </template>
    </v-checkbox>

    <v-btn
      variant="text"
      class="text-primary font-weight-bold d-flex align-center mt-3"
      @click="showNewProductDialog = true"
    >
      <v-icon>mdi-plus</v-icon>
      {{ $t("operations.add_product") }}
    </v-btn>
    <h3 v-if="products.length == 0">
      {{ $t("operations.no_products") }}
    </h3>
    <v-divider class="my-5"></v-divider>

    <div v-if="form.type == 'regular_maintenance'">
      <h3>{{ $t("operations.choose_last_maintenance") }}</h3>
      <h5 class="mt-2">
        {{ $t("operations.choose_last_maintenance_desc") }}
      </h5>
      <v-date-input
        v-model="form.last_maintenance_date"
        class="mt-5"
        dir="rtl"
        variant="outlined"
        color="primary"
        @keydown.prevent
        hide-details="auto"
        :width="'100%'"
        prepend-icon=""
        max-width="534"
        append-inner-icon="mdi-calendar-outline"
        rounded="xl"
      />
      <v-checkbox color="primary" hide-details>
        <template v-slot:label>
          <h5>
            {{ $t("operations.no_last_maintenance") }}
          </h5>
        </template>
      </v-checkbox>
      <v-divider class="my-5"></v-divider>
    </div>

    <operations-create-order-choose-address
      :addresses="addresses"
      @update:address="form.address_id = $event"
    />

    <v-divider class="my-5"></v-divider>
    <v-row>
      <v-col v-if="form.type == 'emergency_maintenance'">
        <v-textarea
          v-model="form.problem_description"
          no-resize
          :label="$t('operations.ur_problem')"
        />
      </v-col>
      <v-col>
        <AppPhotoUploader @upload="setPhotos" />
      </v-col>
    </v-row>

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
