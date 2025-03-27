<script setup>
definePageMeta({
  layout: "auth",
});

import NavigationMobile from "~/components/home/NavigationMobile.vue";
import DesktopNavigation from "~/components/home/DesktopNavigation.vue";
import { useDisplay } from "vuetify";

const dashboardStore = useDashboardStore();
const { landingContent } = storeToRefs(dashboardStore);
const { fetchLandingContent } = dashboardStore;
const { mobile } = useDisplay();

await fetchLandingContent();
</script>

<template>
  <div>
    <v-container fluid class="wrapper">
      <v-main class="d-flex flex-column ga-16">
        <!-- Navigation -->
        <nav class="d-flex align-center justify-space-between">
          <div class="d-flex ga-2 align-center">
            <AppSvgIcon name="logo" size="lg" />
            <AppSvgIcon name="title" :size="60" />
          </div>

          <NavigationMobile v-if="mobile" />
          <DesktopNavigation v-else />
        </nav>

        <!-- Header Section -->
        <v-row
          id="header"
          class="d-flex justify-space-between align-center ga-8"
          no-gutters
        >
          <v-col
            cols="12"
            md="6"
            class="text-start text-header d-flex flex-column ga-4 w-50"
          >
            <!-- <h2 v-html="$t('landing.header.title')" style="font-size: 45px"></h2> -->
            <h2 style="font-size: 45px">
              {{ landingContent.download_title }}
            </h2>
            <p class="text-gray-gray-500 w-75" style="font-size: 18px">
              {{ $t("landing.header.description") }}
            </p>
            <p class="text-header">
              {{ $t("landing.header.download_prompt") }}
            </p>
            <div class="d-flex ga-4 flex-wrap">
              <NuxtLink :to="landingContent.google_play_url" target="_blank">
                <img
                  src="/icons/play-store.svg"
                  alt="play-store btn"
                  class="cursor-pointer"
                  style="max-width: 150px"
                />
              </NuxtLink>
              <NuxtLink :to="landingContent.app_store_url" target="_blank">
                <img
                  src="/icons/app-store.svg"
                  alt="app-store btn"
                  class="cursor-pointer"
                  style="max-width: 150px"
                />
              </NuxtLink>
            </div>
          </v-col>
          <v-col cols="12" md="5">
            <v-img src="/icons/mobile-app-hero.svg" alt="app image" />
          </v-col>
        </v-row>

        <!-- About Us -->
        <v-row
          id="about-us"
          class="d-flex justify-space-between align-center text-start ga-16"
          no-gutters
        >
          <v-col cols="12" md="6" sm="12" class="d-flex flex-column ga-4 w-50">
            <div>
              <v-chip
                pill
                color="primary"
                variant="tonal"
                class="text-primary bg-pri-light font-weight-medium"
              >
                <span> {{ $t("landing.about_us.chip") }}</span>
              </v-chip>
            </div>

            <h3
              class="text-secondary font-weight-medium"
              style="font-size: 45px"
            >
              <!-- {{ $t("landing.about_us.title") }} -->
              {{ landingContent.feature_title }}
            </h3>
            <span class="text-body">
              <!-- {{ $t("landing.about_us.description1") }} -->
              {{ landingContent.feature_description }}
            </span>
            <!-- <span class="text-body">
            {{ $t("landing.about_us.description2") }}
          </span> -->
          </v-col>

          <v-col cols="12" md="5" sm="12">
            <v-img src="/icons/engaged-user.svg" alt="engaged user image" />
            <!-- <v-img
            :src="landingContent.feature_image_url"
            alt="engaged user image"
          /> -->
          </v-col>
        </v-row>

        <!-- Flow -->
        <v-row class="d-flex justify-center align-center ga-16">
          <HomeServiceWorkflow :steps="landingContent.translated_steps" />
        </v-row>

        <!-- Services -->
        <v-row id="services">
          <v-col
            cols="12"
            class="text-center d-flex justify-center align-center flex-column ga-3 mb-4"
          >
            <v-chip
              pill
              color="primary"
              variant="tonal"
              class="text-primary bg-pri-light font-weight-medium"
            >
              {{ $t("landing.services.chip") }}
            </v-chip>

            <h4
              class="text-secondary font-weight-medium"
              style="font-size: 32px"
            >
              {{ $t("landing.services.title") }}
            </h4>
            <p class="text-color-text">
              {{ $t("landing.services.description") }}
            </p>
          </v-col>

          <v-row
            class="mx-auto d-flex align-center justify-space-between"
            :class="mobile ? 'ga-16' : ''"
          >
            <v-col md="3" cols="12" class="text-start d-flex flex-column ga-16">
              <div>
                <h3
                  class="text-gray-800 font-weight-meduim"
                  style="font-size: 20px"
                >
                  <!-- {{ $t("landing.services.items.periodic_maintenance.title") }} -->
                  {{ landingContent.translated_services[0].service_title }}
                </h3>
                <p class="text-body">
                  <!-- {{
                  $t("landing.services.items.periodic_maintenance.description")
                }} -->
                  {{
                    landingContent.translated_services[0].service_description
                  }}
                </p>
              </div>
              <div>
                <h3
                  class="text-gray-800 font-weight-meduim"
                  style="font-size: 20px"
                >
                  <!-- {{ $t("landing.services.items.support_payment.title") }} -->
                  {{ landingContent.translated_services[1].service_title }}
                </h3>
                <p class="text-body">
                  <!-- {{ $t("landing.services.items.support_payment.description") }} -->
                  {{
                    landingContent.translated_services[1].service_description
                  }}
                </p>
              </div>
            </v-col>

            <v-col cols="12" xl="4" md="4" class="d-flex justify-center">
              <v-img
                max-width="300"
                src="/icons/app-capabillities.svg"
                alt=" app image"
              />
            </v-col>

            <v-col md="3" cols="12" class="text-start d-flex flex-column ga-16">
              <div>
                <h3
                  class="text-gray-800 font-weight-meduim"
                  style="font-size: 20px"
                >
                  <!-- {{ $t("landing.services.items.new_installation.title") }} -->
                  {{ landingContent.translated_services[2].service_title }}
                </h3>
                <p class="text-body">
                  <!-- {{ $t("landing.services.items.new_installation.description") }} -->
                  {{
                    landingContent.translated_services[2].service_description
                  }}
                </p>
              </div>
              <div>
                <h3
                  class="text-gray-800 font-weight-meduim"
                  style="font-size: 20px"
                >
                  <!-- {{ $t("landing.services.items.urgent_maintenance.title") }} -->
                  {{ landingContent.translated_services[3].service_title }}
                </h3>
                <p class="text-body">
                  {{
                    landingContent.translated_services[3].service_description
                  }}
                </p>
              </div>
            </v-col>
          </v-row>
        </v-row>

        <!-- Store -->
        <v-row
          id="store"
          class="d-flex justify-space-between align-center text-start ga-16"
        >
          <v-col md="5" cols="12" class="d-flex flex-column ga-4">
            <div>
              <v-chip
                pill
                color="primary"
                variant="tonal"
                class="text-primary bg-pri-light font-weight-medium"
              >
                {{ $t("landing.store.chip") }}
              </v-chip>
            </div>

            <h4 class="text-secondary text-24 font-medium">
              <!-- {{ $t("landing.store.title") }} -->
              {{ landingContent.store_title }}
            </h4>
            <p class="text-color-text">
              <!-- {{ $t("landing.store.description") }} -->
              {{ landingContent.store_description }}
            </p>

            <div>
              <NuxtLink :to="landingContent.store_url" target="_blank">
                <v-btn color="primary" class="rounded-lg w-50" size="large">
                  {{ $t("landing.store.button") }}
                </v-btn>
              </NuxtLink>
            </div>
          </v-col>

          <v-col md="5" cols="12" class="d-flex justify-center">
            <v-img
              src="/icons/mobile-overview.svg"
              alt="mobile overview image"
              aspect-ratio="16/9"
            />
          </v-col>
        </v-row>

        <!-- Branches -->
        <v-row id="branches">
          <v-col
            cols="12"
            class="text-center d-flex justify-center align-center flex-column ga-3"
          >
            <v-chip
              pill
              color="primary"
              variant="tonal"
              class="text-primary bg-pri-light font-weight-medium"
            >
              {{ $t("landing.branches.chip") }}
            </v-chip>
            <h4 class="text-secondary font-weight-bold" style="font-size: 32px">
              {{ $t("landing.branches.title") }}
            </h4>
            <p class="text-color-text">
              {{ $t("landing.branches.description") }}
            </p>
          </v-col>
          <v-col cols="12" class="d-flex justify-center align-center">
            <v-img
              :src="landingContent.map_image_url"
              alt="sa map image"
              class="w-100"
            />
          </v-col>
        </v-row>

        <!-- App -->
        <v-row
          class="d-flex justify-space-between align-center text-start pb-0"
        >
          <v-col
            xl="6"
            lg="6"
            md="6"
            sm="12"
            xs="12"
            class="d-flex flex-column ga-4 w-50"
          >
            <h4
              class="text-secondary font-weight-medium"
              style="font-size: 32px"
            >
              <!-- {{ $t("landing.app.title") }} -->
              {{ landingContent.download_title }}
            </h4>
            <p class="text-header">{{ $t("landing.app.download_prompt") }}</p>
            <div class="d-flex ga-4 flex-wrap">
              <NuxtLink :to="landingContent.google_play_url" target="_blank">
                <img
                  src="/icons/play-store.svg"
                  alt="play-store btn"
                  class="cursor-pointer"
                  style="max-width: 150px"
                />
              </NuxtLink>
              <NuxtLink :to="landingContent.app_store_url" target="_blank">
                <img
                  src="/icons/app-store.svg"
                  alt="app-store btn"
                  class="cursor-pointer"
                  style="max-width: 150px"
                />
              </NuxtLink>
            </div>
          </v-col>
          <v-col cols="12" md="5" sm="12" class="pb-0 mb-0">
            <v-img src="/icons/mobile-interface.svg" alt="mobile interface" />
          </v-col>
        </v-row>
      </v-main>
    </v-container>

    <!-- Footer -->
    <footer
      class="py-10 d-flex flex-column align-center ga-6 mt-n1"
      style="border-top: 1px solid #223f99"
    >
      <div class="d-flex justify-center align-center ga-2">
        <AppSvgIcon name="logo" size="lg" />
        <AppSvgIcon name="title" :size="60" />
      </div>
      <nav
        class="d-flex flex-wrap flex-row-reverse justify-center ga-6 w-33 text-gray-800"
      >
        <a href="#header">{{ $t("landing.footer.links.home") }}</a>
        <a href="#about-us">{{ $t("landing.footer.links.about_us") }}</a>
        <a href="#services">{{ $t("landing.footer.links.services") }}</a>
        <a href="#store">{{ $t("landing.footer.links.store") }}</a>
        <a href="#branches">{{ $t("landing.footer.links.branches") }}</a>
        <a href="#">{{ $t("landing.footer.links.terms") }}</a>
        <a href="#">{{ $t("landing.footer.links.privacy") }}</a>
      </nav>
      <div :class="`d-flex ${mobile ? 'flex-column justify-center' : ''} ga-4`">
        <NuxtLink :to="landingContent.google_play_url" target="_blank">
          <img
            src="/icons/play-store.svg"
            alt="play-store btn"
            class="cursor-pointer"
            style="max-width: 150px"
          />
        </NuxtLink>
        <NuxtLink :to="landingContent.app_store_url" target="_blank">
          <img
            src="/icons/app-store.svg"
            alt="app-store btn"
            class="cursor-pointer"
            style="max-width: 150px"
          />
        </NuxtLink>
      </div>
    </footer>

    <!-- Bottom bar -->
    <div class="border-t py-12">
      <v-container fluid class="py-4 d-flex align-center justify-space-between">
        <p class="text-secondary">{{ $t("landing.rights") }}</p>
        <div class="d-flex align-center ga-4">
          <NuxtLink
            v-for="link in landingContent.social"
            :to="link.url"
            external
            target="_blank"
          >
            <AppSvgIcon
              :name="link.platform"
              :filled="false"
              style="color: #a7a7a7"
            />
          </NuxtLink>
          <!-- <NuxtLink>
            <AppSvgIcon name="linkedin" />
          </NuxtLink>
          <NuxtLink>
            <AppSvgIcon name="x-logo" />
          </NuxtLink>
          <NuxtLink>
            <AppSvgIcon name="instagram" />
          </NuxtLink> -->
        </div>
      </v-container>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  overflow-x: hidden;
}
</style>
