<script setup lang="ts">
import type { Product } from "~/types/settings";

const { t } = useI18n();

const emits = defineEmits<{
  (e: "change-component", value: string): void;
  (e: "delete-product", value: number): void;
}>();

const { showSuccess } = useAlertStore();
const settingsStore = useSettingsStore();
const { customerProducts } = storeToRefs(settingsStore);
const { deleteProduct, fetchCustomerProducts } = settingsStore;

const dialog = ref(false);

const deletedProductId = ref<number>();

const handleDeleteProduct = (productId: number) => {
  deletedProductId.value = productId;
  dialog.value = true;
};

const handleConfirmDelete = async () => {
  await deleteProduct(deletedProductId.value as number);
  await fetchCustomerProducts();
  showSuccess("تم حذف المنتج بنجاح");
  dialog.value = false;
};

await fetchCustomerProducts();
</script>

<template>
  <section>
    <section>
      <h4 class="text-20 text-grey-900">
        {{ t("dashboard.settings.products.product_list_title") }}
      </h4>
      <p class="text-light-gray-2 text-14 font-weight-medium mt-2">
        {{ t("dashboard.settings.products.product_list_description") }}
      </p>
    </section>

    <section class="mt-8 d-flex flex-column ga-5">
      <div class="d-flex ga-2 align-center" v-for="product in customerProducts">
        <!-- :src="`https://app.rezeqstore.com/public/storage/${product.image}`" -->
        <v-img
          :src="product.image_url"
          class="rounded-circle border border-md pa-2"
          max-width="55"
        ></v-img>
        <div>
          <p class="font-weight-bold text-header text-14">
            {{ product.name }}
          </p>
        </div>
        <div class="d-flex ga-4 ms-auto">
          <AppSvgIcon
            @click="handleDeleteProduct(product.id)"
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
    @submit="handleConfirmDelete"
  />
</template>
