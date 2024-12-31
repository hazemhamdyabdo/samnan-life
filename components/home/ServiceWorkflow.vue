<script setup>
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
</script>

<template>
  <v-container class="pa-8 bg-pri-light rounded-lg" fluid>
    <v-row justify="center" align="center" class="text-center">
      <v-col cols="12" md="4" class="d-flex flex-column align-center mb-6 ga-2">
        <div class="mb-1">
          <span class="text-white bg-primary py-2 px-4 rounded-circle">2</span>
        </div>
        <h3 class="text-tertiary font-weight-medium">خدمة عالية الجودة</h3>
        <p class="text-body font-weight-medium">
          نلتزم بتقديم أفضل الحلول من خلال فريق فنيين محترفين لضمان رضا عملائنا.
        </p>
      </v-col>

      <v-row justify="space-between" align="center" class="steps-lower">
        <v-col
          cols="12"
          md="4"
          class="d-flex flex-column align-center mt-6 ga-2 position-relative"
        >
          <SvgIcon v-if="!mobile" name="arrow-up" class="arrow-up" />
          <div class="mb-1">
            <span class="text-white bg-primary py-2 px-4 rounded-circle"
              >1</span
            >
          </div>
          <h3 class="text-tertiary font-weight-medium">طلب سريع وسهل</h3>
          <p class="text-body font-weight-medium">
            نوفر تطبيقاً بسيطاً وسهل الاستخدام يتيح لك طلب في خطوات قليلة وفي
            وقت قياسي.
          </p>
        </v-col>

        <v-col
          cols="12"
          md="4"
          class="d-flex flex-column align-center mt-6 ga-2 position-relative"
        >
          <SvgIcon v-if="!mobile" name="arrow-down" class="arrow-down" />

          <div class="mb-1">
            <span class="text-white bg-primary py-2 px-4 rounded-circle"
              >3</span
            >
          </div>
          <h3 class="text-tertiary font-weight-medium">تواصل ودعم مستمر</h3>
          <p class="text-body font-weight-medium">
            نحن بجانبك دائماً عبر قنوات تواصل متعددة لتلبية احتياجاتك والإجابة
            على استفساراتك.
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
