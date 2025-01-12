<script setup lang="ts">
const { t } = useI18n();

const emits = defineEmits<{ (e: "change-component", value: string): void }>();

const dialog = ref(false);
const products = [
  {
    title: "جهاز تحلية سمنان 5 مراحل",
  },
  {
    title: "جهاز تحلية سمنان 7 مراحل",
  },
  {
    title: "دينمو سمنان – 1 حصان",
  },
];
</script>

<template>
  <section style="min-height: calc(100vh - 90px)">
    <section>
      <h4 class="text-20 text-grey-900">
        {{ t("dashboard.settings.products.product_list_title") }}
      </h4>
      <p class="text-light-gray-2 text-14 font-weight-medium mt-2">
        {{ t("dashboard.settings.products.product_list_description") }}
      </p>
    </section>

    <section class="mt-8 d-flex flex-column ga-5">
      <div class="d-flex ga-2 align-center" v-for="product in products">
        <v-img
          src="/images/product-img.png"
          class="rounded-circle border border-md pa-2"
          max-width="55"
        ></v-img>
        <div>
          <p class="font-weight-bold text-header text-14">
            {{ product.title }}
          </p>
        </div>
        <div class="d-flex ga-4 ms-auto">
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
        @click="emits('change-component', 'NewProduct')"
        class="text-primary cursor-pointer font-weight-medium"
      >
        <v-icon class="me-1" color="primary" size="md">mdi-plus</v-icon>
        {{ $t("dashboard.settings.products.add_new_product") }}
      </span>
    </div>
  </section>

  <AppModal
    v-model:dialog="dialog"
    :title="t('dashboard.settings.products.delete_product')"
    icon="trash"
    isDelete
    :text="t('dashboard.settings.products.confirm_delete')"
    :ok-text="'dashboard.modal.delete_account_btn'"
  ></AppModal>
</template>

<style scoped></style>
