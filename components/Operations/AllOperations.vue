<script setup>
const panel = ref(0);
</script>

<template>
  <div>
    <div class="d-flex align-center ga-2">
      <h2>
        {{ $t("operations.all_operations") }}
      </h2>
      <v-spacer></v-spacer>
      <v-text-field
        bg-color="disabled-gray"
        density="compact"
        flat
        variant="solo"
        :placeholder="$t('operations.search')"
        height="42px"
        hide-details
      >
      </v-text-field>
      <v-btn color="primary" height="42" size="small" rounded="lg">
        <AppSvgIcon name="filter" />
      </v-btn>
    </div>
    <v-expansion-panels v-model="panel" class="mt-5">
      <v-row>
        <v-col cols="12" v-for="i in 2" :key="i">
          <v-expansion-panel class="border radius-16" elevation="0">
            <v-expansion-panel-title>
              <div class="d-flex align-center ga-2">
                <v-avatar size="48" color="surface-variant"></v-avatar>
                <div>
                  <h3>صيانة عاجلة</h3>
                  <p class="text-12 mt-2 text-caption date">
                    8 oct 2024 10:32 PM
                  </p>
                </div>
              </div>
              <v-spacer></v-spacer>
              <v-chip color="success">{{ "\u2022" }} ناجحة </v-chip>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <!-- Details -->
              <h5>{{ $t("operations.devices_to_maintain") }}</h5>
              <div class="d-flex mt-3 ga-2">
                <v-avatar size="22" color="surface-variant"></v-avatar>
                <h5 class="text-gray-500">جهاز تحلية سمنان 5 مراحل</h5>
              </div>

              <!-- track -->
              <div class="d-flex mt-7 align-center">
                <h5>{{ $t("operations.location") }}</h5>
                <v-spacer></v-spacer>
                <nuxt-link
                  :to="localePath('/dashboard/operations/track-order')"
                  class="text-primary align-center text-12 d-flex ga-3"
                >
                  <AppSvgIcon name="map" />
                  <span>{{ $t("operations.track") }}</span>
                </nuxt-link>
              </div>

              <!-- location -->
              <div class="d-flex align-center ga-2">
                <AppSvgIcon name="location-blue" />
                <div>
                  <h5 class="text-gray-500">المنزل الاول</h5>
                  <p class="text-12 mt-2 text-caption date">
                    الرياض, حي الجلالة, منزل 144
                  </p>
                </div>
              </div>

              <!-- description -->
              <div class="mt-7">
                <h5>{{ $t("operations.problem") }}</h5>
                <p class="text-12 text-gray-500">
                  تم تقديم طلب لصيانة جهاز تحلية المياه بسبب تسرب المياه من
                  الجهاز
                </p>
              </div>

              <!-- maintain date -->
              <div class="mt-7">
                <h5 class="mb-3">{{ $t("operations.maintain_date") }}</h5>
                <div class="d-flex align-center ga-3">
                  <AppSvgIcon name="calendar" />
                  <h5>السبت 2024-05-12</h5>
                </div>
                <div class="d-flex align-center ga-3 mt-2">
                  <AppSvgIcon name="clock" />
                  <h5>12:30 PM</h5>
                </div>
              </div>

              <!-- maintainer details -->
              <div class="mt-7">
                <h5 class="mb-3">{{ $t("operations.maintainer") }}</h5>
                <div class="d-flex align-center ga-3">
                  <AppSvgIcon name="user" />
                  <h5>احمد علي</h5>
                </div>
                <div class="d-flex align-center ga-3 mt-2">
                  <AppSvgIcon name="call" />
                  <h5>+966 000 000 0000</h5>
                </div>
              </div>

              <!-- payment details -->
              <v-divider class="mt-7"></v-divider>
              <div class="mt-7">
                <div class="d-flex align-center">
                  <h5 class="text-14">
                    {{ $t("operations.payment_details") }}
                  </h5>
                  <v-spacer></v-spacer>
                  <nuxt-link
                    class="text-primary text-12 d-flex align-center ga-3"
                    :to="localePath('/dashboard/operations/view-bill')"
                  >
                    <AppSvgIcon name="document-normal" />
                    <span>{{ $t("operations.view_bill") }}</span>
                  </nuxt-link>
                </div>

                <div class="d-flex align-center ga-3 mt-2">
                  <h5 class="text-14">
                    {{ $t("operations.total") }}
                  </h5>
                  <v-spacer></v-spacer>
                  <h5 class="text-14">162.00 ر.س</h5>
                </div>
              </div>

              <!-- review -->
              <v-divider class="mt-7"></v-divider>
              <div class="mt-7">
                <div class="d-flex align-center ga-2">
                  <h5>Ahmed Ali</h5>
                  <span class="d-flex align-center text-14">
                    5.0
                    <v-icon color="#FFD33C">mdi-star</v-icon>
                  </span>
                </div>
                <h5>خدمة ممتازة و سرعة استجابة, تجربة رائعة شكرا لكم</h5>
                <div class="date text-12">10 Oct 2024, 10:32 PM</div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
      </v-row>
    </v-expansion-panels>
  </div>
</template>

<style>
.date {
  color: #959595;
}
</style>
