<script setup lang="ts">
import type { AddressData } from "~/types/settings";
const settingsStore = useSettingsStore();
const { fetchAllAddresses } = settingsStore;

const { t } = useI18n();

const emits = defineEmits<{
  (e: "open:delete-dialog", value: number): void;
  (e: "change-component", value: string): void;
  (e: "delete-address", value: number): void;
  (e: "edit-address", value: number): void;
}>();

defineProps<{
  addresses: AddressData[];
}>();

await fetchAllAddresses();
</script>
<template>
  <section>
    <section>
      <h4 class="text-20 text-grey-900">
        {{ t("dashboard.settings.addresses.address_list") }}
      </h4>
      <p class="text-light-gray-2 text-12 mt-2">
        {{ t("dashboard.settings.addresses.description") }}
      </p>
    </section>

    <section class="mt-8 d-flex flex-column ga-5">
      <div class="d-flex ga-2 align-center" v-for="address in addresses">
        <AppSvgIcon name="location" />
        <div>
          <p class="font-weight-medium text-header text-14">
            {{ address.name }}
          </p>
          <p class="text-12 text-grey-400">
            {{ address.national_address }}, {{ address.details }}
          </p>
        </div>
        <div class="d-flex ga-4 ms-auto">
          <AppSvgIcon
            name="edit"
            class="cursor-pointer"
            @click="emits('edit-address', address.id)"
          />
          <AppSvgIcon
            name="trash-outline"
            class="cursor-pointer"
            @click="emits('open:delete-dialog', address.id)"
          />
        </div>
      </div>
    </section>

    <div class="d-flex mt-8 w-33">
      <span
        @click="emits('change-component', 'NewAddress')"
        class="text-primary cursor-pointer font-weight-medium"
      >
        <v-icon class="me-1" color="primary" size="md">mdi-plus</v-icon>
        {{ $t("dashboard.settings.addresses.add_new_address") }}
      </span>
    </div>
  </section>
</template>
