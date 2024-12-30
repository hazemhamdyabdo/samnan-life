<script setup>
import { useDisplay } from "vuetify";
import StepOne from "~/components/Register/StepOne.vue";
import StepTwo from "~/components/ForgetPassword/StepTwo.vue";

const { mobile } = useDisplay();

const currentStep = ref(0);
const steps = ref([StepOne, StepTwo]);

const { data, status } = await useAPI("/customer/register", {
  method: "POST",
  body: {
    w: "sss",
  },
});
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
          :is="steps[currentStep]"
          title="توثيق حسابك"
          @change:step-one="currentStep = 1"
          @change:step-two="currentStep = 0"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
