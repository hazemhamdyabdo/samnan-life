<script setup>
import { useDisplay } from "vuetify";
import StepOne from "~/components/Register/StepOne.vue";
import StepTwo from "~/components/ForgetPassword/StepTwo.vue";

const { mobile } = useDisplay();

const currentStep = ref(0);
const steps = ref([StepOne, StepTwo]);

const registerDetails = reactive({
  first_name: "Ahmed",
  last_name: "Salem",
  phone: "597875665",
  password: "12345678",
  confirm_password: "12345678",
});

const register = async () => {
  const { data, error } = await useAPI("/customer/register", {
    method: "POST",
    body: registerDetails,
  });

  if (error.value) {
    throw new Error(error.value.message);
  }
};

const handleStepOne = async () => {
  try {
    await register();
    currentStep.value = 1;
  } catch (error) {
    // handle UI changes
  }
};
</script>

<template>
  <v-container fluid>
    <v-row class="justify-space-between align-center">
      <v-col cols="12" sm="12" md="4">
        <img
          class="rounded-xl"
          src="../assets/imgs/image 3.png"
          :width="mobile ? '100%' : '600'"
          :height="mobile ? '100%' : '620'"
        />
      </v-col>
      <v-col cols="12" sm="6" md="5" class="d-flex flex-column ga-6">
        <div class="d-flex ga-2 align-center">
          <SvgIcon name="logo" />
          <SvgIcon name="title" />
        </div>
        <component
          :is="steps[currentStep]"
          title="توثيق حسابك"
          v-model:registerDetails="registerDetails"
          @change:step-one="handleStepOne"
          @change:step-two="currentStep = 0"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
