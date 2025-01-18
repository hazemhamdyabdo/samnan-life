<template>
  <div>
    <h3 class="mt-10">{{ $t("operations.client_location") }}</h3>
    <h5 class="mt-2">{{ $t("operations.client_location_desc") }}</h5>
    <v-radio-group column class="mt-5">
      <v-radio v-for="i in 3" :key="i" color="primary" :value="i" class="mt-3">
        <template v-slot:label>
          <div class="d-flex align-center ga-2">
            <AppSvgIcon name="location" />
            <div>
              <h3 class="text-gray-500">المنزل الاول</h3>
              <p class="text-12 mt-1 text-caption date">
                الرياض, حي الجلالة, منزل 144
              </p>
            </div>
          </div>
        </template>
      </v-radio>
    </v-radio-group>
    <nuxt-link
      class="text-primary font-weight-bold d-flex align-center mt-3"
      :to="localePath('/dashboard/settings/addresses')"
    >
      <v-icon>mdi-plus</v-icon>
      {{ $t("operations.add_address") }}
    </nuxt-link>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
