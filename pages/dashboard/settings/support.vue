<script setup lang="ts">
const settingsStore = useSettingsStore();

const { t } = useI18n();
const { sendSupportForm } = settingsStore;
const { showSuccess, showError } = useAlertStore();
const { formRef, rules, validate } = useFormValidation();

const supportForm = ref({
  subject: "",
  details: "",
});

const isLoading = ref(false);
const handleSupportFom = async () => {
  isLoading.value = true;
  try {
    await validate();
    await sendSupportForm(supportForm.value);
    supportForm.value = {
      subject: "",
      details: "",
    };
    formRef.value.reset();
    showSuccess("تم ارسال الطلب بنجاح");
  } catch (error) {
    showError(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <section>
    <section class="mb-8">
      <h3 class="text-20 text-header">
        {{ t("dashboard.settings.support.title") }}
      </h3>
    </section>
    <section>
      <h4 class="text-20 text-grey-900">
        {{ t("dashboard.settings.support.title") }}
      </h4>
      <p class="text-light-gray-2 text-12 mt-2">
        {{ t("dashboard.settings.support.subtitle") }}
      </p>
    </section>

    <v-form fast-fail ref="formRef" @submit.prevent>
      <v-row class="mt-8">
        <v-col cols="6">
          <v-text-field
            v-model="supportForm.subject"
            :label="t('dashboard.settings.support.topic')"
            :rules="[rules.required]"
            required
          />
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="supportForm.details"
            :label="t('dashboard.settings.support.details')"
            color="primary"
            row-height="25"
            rows="3"
            :rules="[rules.required]"
            base-color="light-gray"
            variant="outlined"
            hide-details
          />
          <p class="text-grey-600 mt-2">
            {{ t("dashboard.settings.support.placeholder.details") }}
          </p>
        </v-col>

        <v-col cols="6" class="d-flex mt-8">
          <v-btn
            @click="handleSupportFom"
            :loading="isLoading"
            color="primary"
            type="submit"
            round
            block
            size="50"
            >{{ $t("dashboard.settings.support.button.submit") }}</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </section>
</template>
