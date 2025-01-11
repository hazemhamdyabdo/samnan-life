<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <section style="min-height: calc(100vh - 30px)">
    <section class="mb-8">
      <h3 class="text-20 text-header">
        {{ t("dashboard.settings.language.header") }}
      </h3>
    </section>
    <section>
      <h4 class="text-20 text-grey-900">
        {{ t("dashboard.settings.language.change_language") }}
      </h4>
      <p class="text-light-gray-2 text-12 mt-2">
        {{ t("dashboard.settings.language.select_app_language") }}
      </p>
    </section>
    <section class="mt-8">
      <v-radio-group>
        <v-radio color="primary" value="ar" class="mb-4">
          <template v-slot:label>
            <AppSvgIcon name="AR" size="lg" class="me-2" />
            <p>{{ t("dashboard.settings.language.arabic") }}</p>
          </template>
        </v-radio>
        <v-radio color="primary" value="en">
          <template v-slot:label>
            <AppSvgIcon name="GB" size="lg" class="me-2" />
            <p>{{ t("dashboard.settings.language.english") }}</p>
          </template>
        </v-radio>
      </v-radio-group>
    </section>
    <div class="d-flex mt-8 w-33">
      <v-btn color="primary" type="submit" round block size="50">{{
        $t("dashboard.save")
      }}</v-btn>
    </div>
  </section>
</template>
