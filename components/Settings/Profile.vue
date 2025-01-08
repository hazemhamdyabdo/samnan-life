<script setup lang="ts">
const { t } = useI18n();
const details = ref({
  prefix: "+966",
  first_name: "Ahmed",
  last_name: "Ali",
  email: "ahmed@example.com",
  phone_number: "597875665",
});
</script>

<template>
  <div class="mb-8 px-4">
    <h3 class="text-20 text-header">
      {{ t("dashboard.settings.profile.my_profile") }}
    </h3>
  </div>
  <div class="px-4 mb-8">
    <v-avatar
      size="100"
      color="primary"
      class="mx-auto text-white font-weight-medium text-40"
    >
      AA
    </v-avatar>

    <p class="text-24 text-header font-weight-medium">Ahmed Ali</p>
  </div>
  <v-row>
    <v-col cols="6" class="pa-4">
      <v-text-field
        v-model="details.first_name"
        :label="t('dashboard.settings.profile.first_name')"
        variant="outlined"
        color="primary"
        rounded="xl"
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="6" class="pa-4">
      <v-text-field
        v-model="details.last_name"
        :label="t('dashboard.settings.profile.last_name')"
        variant="outlined"
        color="primary"
        rounded="xl"
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="2" class="pa-4">
      <v-text-field
        v-model="details.prefix"
        label=""
        variant="outlined"
        color="#E2E2E2"
        base-color="#E2E2E2"
        bg-color="#E2E2E2"
        rounded="xl"
        disabled
        hide-details
        width="120"
      >
        <template #prepend-inner>
          <AppSvgIcon name="SA" />
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="5" class="pa-4">
      <v-text-field
        v-model="details.phone_number"
        :label="t('dashboard.settings.profile.phone')"
        variant="outlined"
        color="#E2E2E2"
        base-color="#E2E2E2"
        bg-color="#E2E2E2"
        rounded="xl"
        disabled
        hide-details
      ></v-text-field
    ></v-col>
    <v-col cols="5" class="pa-4">
      <v-text-field
        v-model="details.email"
        :label="t('dashboard.settings.profile.email')"
        variant="outlined"
        color="primary"
        rounded="xl"
        hide-details
      ></v-text-field
    ></v-col>
  </v-row>
  <section class="d-flex flex-column ga-4 py-4">
    <div class="d-flex align-center ga-2 cursor-pointer">
      <AppSvgIcon name="call" />
      <p class="text-primary font-weight-medium">
        {{ t("dashboard.settings.profile.change_phone") }}
      </p>
    </div>
    <div class="d-flex align-center ga-2 cursor-pointer">
      <AppSvgIcon name="lock" />
      <p class="font-weight-medium text-primary">
        {{ t("dashboard.settings.profile.change_password") }}
      </p>
    </div>
  </section>
  <div class="mt-2">
    <v-btn width="30%" color="primary" height="50" rounded="xl">{{
      t("dashboard.settings.profile.save_changes")
    }}</v-btn>
  </div>
  <div class="d-flex align-center ga-2 mt-4 cursor-pointer">
    <AppSvgIcon name="profile-delete" />
    <p class="font-weight-medium text-gray-500">
      {{ t("dashboard.settings.profile.delete_account") }}
    </p>
  </div>
</template>
