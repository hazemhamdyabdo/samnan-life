<script setup>
import { useDisplay } from "vuetify";
import StepOne from "~/components/ForgetPassword/StepOne.vue";
import StepTwo from "~/components/ForgetPassword/StepTwo";
import StepThree from "~/components/ForgetPassword/StepThree.vue";

const { mobile } = useDisplay();
const currentStep = ref(0);
const forgetPasswordSteps = ref([StepOne, StepTwo, StepThree]);
</script>

<template>
  <v-container fluid>
    <v-row class="justify-space-around ga-md-16 align-center">
      <v-col cols="12" sm="12" md="4">
        <SvgIcon
          name="samnan-panner"
          class="rounded-xl cursor-auto"
          :style="`max-height: 90vh; ${mobile ? 'width: 100%' : ''}`"
        />
      </v-col>
      <v-col cols="12" sm="6" md="4" class="d-flex flex-column ga-4">
        <div class="d-flex ga-2 align-center">
          <SvgIcon name="logo" />
          <SvgIcon name="title" />
        </div>
        <component
          :is="forgetPasswordSteps[currentStep]"
          @change:step-one="currentStep = 1"
          @change:step-two="currentStep = 2"
          @change:step-three="currentStep = 0"
        ></component>
      </v-col>
    </v-row>
  </v-container>
</template>
