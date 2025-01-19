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
    <nuxt-link
      class="text-primary font-weight-bold d-flex align-center mt-3"
      :to="localePath('/dashboard/settings/addresses')"
    >
      <v-icon>mdi-plus</v-icon>
      {{ $t("operations.add_address") }}
    </nuxt-link>
  </div>
</template>

<script setup>
const { rules } = useFormValidation();

defineProps(["addresses"]);
defineEmits(["update:address"]);

const chosenAdress = ref("");
</script>

<style lang="scss" scoped></style>
