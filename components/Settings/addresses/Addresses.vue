<script setup lang="ts">
import type { AddressResponse, AddressData } from "~/types/settings";

const { t } = useI18n();

const emits = defineEmits<{
  (e: "change-component", value: string): void;
  (e: "delete-address", value: number): void;
  (e: "edit-address", value: number): void;
}>();

const props = defineProps<{
  addresses: AddressData[];
}>();

const dialog = ref(false);
const addresses = computed(() => {
  return [
    {
      id: 1,
      title: t("dashboard.settings.addresses.address_example.first"),
      address: t("dashboard.settings.addresses.location_placeholder"),
    },
    {
      id: 2,
      title: t("dashboard.settings.addresses.address_example.second"),
      address: t("dashboard.settings.addresses.location_placeholder"),
    },
  ];
});

watchEffect(() => {
  console.log("====================================");
  console.log(props.addresses);
  console.log("====================================");
});
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
            {{ address.title }}
          </p>
          <p class="text-12 text-grey-400">
            {{ address.address }}
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
            @click="dialog = true"
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
  <AppModal
    v-model:dialog="dialog"
    :title="t('dashboard.settings.addresses.confirm_delete.header')"
    icon="trash"
    isDelete
    :text="t('dashboard.settings.addresses.confirm_delete.message')"
    :ok-text="'dashboard.modal.delete_account_btn'"
  />
</template>
