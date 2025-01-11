<script setup lang="ts">
const { t } = useI18n();

const emits = defineEmits<{ (e: "change-component", value: string): void }>();
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
</script>
<template>
  <section style="min-height: calc(100vh - 90px)">
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
          <AppSvgIcon name="edit" class="cursor-pointer" />
          <AppSvgIcon
            @click="dialog = true"
            name="trash-outline"
            class="cursor-pointer"
          />
        </div>
      </div>
    </section>

    <div class="d-flex mt-8 w-33">
      <span
        @click="emits('change-component', 'NewAddress')"
        class="text-primary cursor-pointer font-weight-regular"
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
  ></AppModal>
</template>
