<script setup>
definePageMeta({
  layout: "auth",
});

import NavigationMobile from "~/components/home/NavigationMobile.vue";
import DesktopNavigation from "~/components/home/DesktopNavigation.vue";
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
</script>

<template>
  <v-container fluid :class="`py-4 ${mobile ? 'px-0 mx-2' : ''} wrapper`">
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
          class="text-right text-header d-flex flex-column ga-4 w-50"
        >
          <h2 v-html="$t('landing.header.title')" style="font-size: 45px"></h2>
          <p class="text-gray-gray-500 w-75" style="font-size: 18px">
            {{ $t("landing.header.description") }}
          </p>
          <p class="text-header">
            {{ $t("landing.header.download_prompt") }}
          </p>
          <div class="d-flex ga-4 flex-wrap">
            <v-img
              src="/icons/play-store.svg"
              alt="play-store btn"
              class="cursor-pointer"
              max-width="150"
            />
            <v-img
              src="/icons/app-store.svg"
              alt="app-store btn"
              class="cursor-pointer"
              max-width="150"
            />
          </div>
        </v-col>
        <v-col cols="12" md="5">
          <v-img src="/icons/mobile-app-hero.svg" alt="app image" />
        </v-col>
      </v-row>

      <!-- About Us -->
      <v-row
        id="about-us"
        class="d-flex justify-space-between align-center text-right ga-16"
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

          <h3 class="text-secondary font-weight-medium" style="font-size: 45px">
            {{ $t("landing.about_us.title") }}
          </h3>
          <span class="text-body">
            {{ $t("landing.about_us.description1") }}
          </span>
          <span class="text-body">
            {{ $t("landing.about_us.description2") }}
          </span>
        </v-col>

        <v-col cols="12" md="5" sm="12">
          <v-img src="/icons/engaged-user.svg" alt="engaged user image" />
        </v-col>
      </v-row>

      <!-- Flow -->
      <v-row class="d-flex justify-center align-center ga-16">
        <HomeServiceWorkflow />
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

          <h4 class="text-secondary font-weight-medium" style="font-size: 32px">
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
          <v-col
            lg="3"
            md="12"
            sm="12"
            xs="12"
            class="text-right d-flex flex-column ga-16"
          >
            <div>
              <h3
                class="text-gray-800 font-weight-meduim"
                style="font-size: 20px"
              >
                {{ $t("landing.services.items.periodic_maintenance.title") }}
              </h3>
              <p class="text-body">
                {{
                  $t("landing.services.items.periodic_maintenance.description")
                }}
              </p>
            </div>
            <div>
              <h3
                class="text-gray-800 font-weight-meduim"
                style="font-size: 20px"
              >
                {{ $t("landing.services.items.support_payment.title") }}
              </h3>
              <p class="text-body">
                {{ $t("landing.services.items.support_payment.description") }}
              </p>
            </div>
          </v-col>

          <v-col
            xl="4"
            lg="6"
            :style="` ${
              mobile ? ' margin-right: -2rem; padding: 0; width: 90%; ' : ''
            }`"
          >
            <img src="/icons/app-capabillities.svg" alt=" app image" />
          </v-col>

          <v-col
            lg="3"
            md="12"
            sm="12"
            xs="12"
            class="text-right d-flex flex-column ga-16"
          >
            <div>
              <h3
                class="text-gray-800 font-weight-meduim"
                style="font-size: 20px"
              >
                {{ $t("landing.services.items.new_installation.title") }}
              </h3>
              <p class="text-body">
                {{ $t("landing.services.items.new_installation.description") }}
              </p>
            </div>
            <div>
              <h3
                class="text-gray-800 font-weight-meduim"
                style="font-size: 20px"
              >
                {{ $t("landing.services.items.urgent_maintenance.title") }}
              </h3>
              <p class="text-body">
                {{
                  $t("landing.services.items.urgent_maintenance.description")
                }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-row>

      <!-- Store -->
      <v-row
        id="store"
        class="d-flex justify-space-between align-center text-right ga-16"
      >
        <v-col
          lg="6"
          md="12"
          sm="12"
          xs="12"
          class="d-flex flex-column ga-4 w-50"
        >
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
            {{ $t("landing.store.title") }}
          </h4>
          <p class="text-color-text">
            {{ $t("landing.store.description") }}
          </p>

          <div>
            <v-btn color="primary" class="rounded-lg w-50" size="large">
              {{ $t("landing.store.button") }}
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" md="5" sm="12">
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
          <v-img src="/icons/sa-map.svg" alt="sa map image" class="w-100" />
        </v-col>
      </v-row>

      <!-- App -->
      <v-row class="d-flex justify-space-between align-center text-right pb-0">
        <v-col
          xl="6"
          lg="6"
          md="6"
          sm="12"
          xs="12"
          class="d-flex flex-column ga-4 w-50"
        >
          <h4 class="text-secondary font-weight-medium" style="font-size: 32px">
            {{ $t("landing.app.title") }}
          </h4>
          <p class="text-header">{{ $t("landing.app.download_prompt") }}</p>
          <div class="d-flex ga-4 flex-wrap">
            <v-img
              src="/icons/play-store.svg"
              alt="play-store btn"
              class="cursor-pointer"
              max-width="150"
            />
            <v-img
              src="/icons/app-store.svg"
              alt="app-store btn"
              class="cursor-pointer"
              max-width="150"
            />
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
      <img
        src="/icons/play-store.svg"
        alt="play-store btn"
        class="cursor-pointer"
      />
      <img
        src="/icons/app-store.svg"
        alt="app-store btn"
        class="cursor-pointer"
      />
    </div>
  </footer>

  <!-- Bottom bar -->
  <div class="border-t py-12">
    <v-container fluid class="py-4 d-flex align-center justify-space-between">
      <p class="text-secondary">{{ $t("landing.rights") }}</p>
      <div class="d-flex align-center ga-4">
        <AppSvgIcon name="facebook" />
        <AppSvgIcon name="linkedin" />
        <AppSvgIcon name="twitter" />
        <AppSvgIcon name="instagram" />
      </div>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  overflow-x: hidden;
}
</style>
