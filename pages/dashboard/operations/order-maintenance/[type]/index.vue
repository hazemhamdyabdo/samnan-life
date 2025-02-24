<template>
  <v-card rounded="xl" class="h-100">
    <v-card-text>
      <h2 class="mb-10">
        {{
          type == "regular_maintenance"
            ? $t("operations.regular_maintenance")
            : $t("operations.emergency_maintenance")
        }}
      </h2>
      <operations-enter-maintain-info
        :products="customerProducts"
        :addresses="allAddresses"
        v-if="step === 1"
        @next="step = 2"
      />
      <operations-create-order-choose-date-time
        v-if="step === 2"
        @next="step = 3"
      />
      <operations-create-order-review v-if="step === 3" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { MaintainTypes } from "~/types/maintain/index";
const type = useRoute().params.type;
definePageMeta({
  validate: async (route) => {
    const type: MaintainTypes[] = [
      "new_installation",
      "regular_maintenance",
      "emergency_maintenance",
    ];

    return type.includes(route.params.type as MaintainTypes);
  },
});

const settingsStore = useSettingsStore();
const { customerProducts, allAddresses } = storeToRefs(settingsStore);

const step = ref(1);
const { fetchCustomerProducts, fetchAllAddresses } = settingsStore;

fetchCustomerProducts();
fetchAllAddresses();
</script>
