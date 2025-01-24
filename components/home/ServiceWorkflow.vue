<script setup>
import { useDisplay } from "vuetify";

defineProps(["steps"]);

const { mobile } = useDisplay();
</script>

<template>
  <v-container class="pa-8 bg-pri-light rounded-lg" fluid>
    <v-row justify="center" align="center" class="text-center">
      <v-col
        v-if="mobile"
        cols="12"
        md="4"
        class="d-flex flex-column align-center mb-6 ga-2 position-relative"
      >
        <div class="mb-1">
          <span class="text-white bg-primary py-2 px-4 rounded-circle">1</span>
        </div>
        <h3 class="text-tertiary font-weight-medium">
          {{ steps[0].step_title }}
          <!-- {{ $t("landing.workflow.items.easy_request.title") }} -->
        </h3>
        <p class="text-body font-weight-medium">
          {{ steps[0].step_description }}
          <!-- {{ $t("landing.workflow.items.easy_request.description") }} -->
        </p>
      </v-col>

      <v-col cols="12" md="4" class="d-flex flex-column align-center mb-6 ga-2">
        <div class="mb-1">
          <span class="text-white bg-primary py-2 px-4 rounded-circle">2</span>
        </div>
        <h3 class="text-tertiary font-weight-medium">
          {{ steps[1].step_title }}
          <!-- {{ $t("landing.workflow.items.high_quality_service.title") }} -->
        </h3>
        <p class="text-body font-weight-medium">
          {{ steps[1].step_description }}
          <!-- {{ $t("landing.workflow.items.high_quality_service.description") }} -->
        </p>
      </v-col>

      <v-row justify="space-between" align="center" class="steps-lower">
        <v-col
          v-if="!mobile"
          cols="12"
          md="4"
          class="d-flex flex-column align-center mt-6 ga-2 position-relative"
        >
          <AppSvgIcon name="arrow-up" class="arrow-up" :size="120" />
          <div class="mb-1">
            <span class="text-white bg-primary py-2 px-4 rounded-circle"
              >1</span
            >
          </div>
          <h3 class="text-tertiary font-weight-medium">
            {{ steps[0].step_title }}
            <!-- {{ $t("landing.workflow.items.easy_request.title") }} -->
          </h3>
          <p class="text-body font-weight-medium">
            {{ steps[0].step_description }}
            <!-- {{ $t("landing.workflow.items.easy_request.description") }} -->
          </p>
        </v-col>

        <v-col
          cols="12"
          md="4"
          class="d-flex flex-column align-center mt-6 ga-2 position-relative"
        >
          <AppSvgIcon
            v-if="!mobile"
            name="arrow-down"
            class="arrow-down"
            :size="120"
          />

          <div class="mb-1">
            <span class="text-white bg-primary py-2 px-4 rounded-circle"
              >3</span
            >
          </div>
          <h3 class="text-tertiary font-weight-medium">
            {{ steps[2].step_title }}
            <!-- {{ $t("landing.workflow.items.continuous_support.title") }} -->
          </h3>
          <p class="text-body font-weight-medium">
            {{ steps[2].step_description }}
            <!-- {{ $t("landing.workflow.items.continuous_support.description") }} -->
          </p>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<style scoped>
.arrow-up {
  position: absolute;
  top: -60px;
  left: 8%;
  transform: translateX(-50%);
}
.arrow-down {
  position: absolute;
  bottom: 100px;
  right: -8%;
  transform: translateX(-50%);
}
</style>
