<script setup lang="ts">
import type { Category } from "~/types/settings";

const { t } = useI18n();

defineProps<{
  categoriesList: Category[];
}>();

const selectedCategories = ref<Category[]>([]);
const selectCategory = (category: Category) => {
  if (selectedCategories.value.includes(category)) {
    selectedCategories.value = selectedCategories.value.filter(
      (item) => item !== category
    );
  } else {
    selectedCategories.value.push(category);
  }
};

const dialog = ref(false);
const showDialog = () => {
  dialog.value = true;
};
const closeDialog = () => {
  dialog.value = false;
};

defineExpose({
  showDialog,
  closeDialog,
});
</script>
<template>
  <AppModal
    v-model:dialog="dialog"
    :title="t('dashboard.settings.products.filters.title')"
    icon=""
    :text="t('dashboard.settings.products.filters.subtitle')"
    :ok-text="'dashboard.settings.products.filters.buttons.save'"
    @submit="closeDialog"
  >
    <section>
      <p>{{ t("dashboard.settings.products.filters.categories") }}</p>

      <div class="d-flex ga-2 mt-2 flex-wrap">
        <v-chip
          v-for="category in categoriesList"
          class="text-14 cursor-pointer"
          variant="elevated"
          :color="
            selectedCategories.includes(category) ? 'primary' : 'disabled-gray'
          "
          elevation="0"
          :key="category.id"
          @click="selectCategory(category)"
        >
          {{ category.name }}
        </v-chip>
      </div>
    </section>
  </AppModal>
</template>
