<script setup lang="ts">
const { t } = useI18n();

const categoriesList = [
  "الكل",
  "ستانلس ستيل",
  "مضخات ذكية",
  "مضخات منزلية",
  "المضخات (دينمو)",
  "حديد الزهر",
  "التجهيزات الصحية",
  "أجهزة التحلية",
  "الرادات",
  "تصنيع الخزانات",
  "سوفتنر",
  "فلاتر مركزية",
  "غرف التفاوير",
  "غرف العزل",
  "مضخات السباحة",
  "أجهزة الضغط",
  "مستلزمات السباحة",
  "قطع الصيانة الدورية",
  "فلاتر الضغط",
  "خزانات الماء",
  "المسابح",
  "السخانات",
];

const selectedCategories = ref<string[]>([]);
const selectCategory = (category: string) => {
  console.log(category);
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
          :key="category"
          @click="selectCategory(category)"
        >
          {{ category }}
        </v-chip>
      </div>
    </section>
  </AppModal>
</template>
