<script setup>
import { useFormValidation } from "~/composables/useFormValidation";

const emits = defineEmits(["change:step-one"]);
defineProps({
  isLoading: Boolean,
});

const { formRef, rules, validate } = useFormValidation();
const registerDetails = defineModel("registerDetails");

const isInputOneShow = ref(false);
const isInputTwoShow = ref(false);

const handleSubmit = async () => {
  try {
    await validate();
    emits("change:step-one");
  } catch (error) {
    alert(error);
  }
};
</script>

<template>
  <div>
    <div class="mb-4">
      <h3 class="font-weight-medium">انشاء حساب جديد</h3>
      <span>الامر يجتاج من خطوتين فقط!</span>
    </div>
    <v-form fast-fail ref="formRef" @submit.prevent>
      <v-row>
        <v-col cols="6" sm="12" class="d-flex ga-4 pb-0">
          <v-text-field
            variant="outlined"
            placeholder="الاسم الاول"
            :rules="[rules.required, rules.minLength(3)]"
            base-color="border-light"
            density="comfortable"
            v-model="registerDetails.first_name"
          />
          <v-text-field
            placeholder="الاسم الاحير"
            base-color="border-light"
            density="comfortable"
            :rules="[rules.required, rules.minLength(3)]"
            v-model="registerDetails.last_name"
          />
        </v-col>
        <v-col cols="6" sm="12" class="pb-0">
          <div class="d-flex ga-2">
            <v-card
              rounded="lg"
              border="sm gray-800"
              color="transparent"
              elevation="0"
              height="50"
              class="d-flex align-center border border-opacity-25 ga-2 px-4 cursor-auto"
            >
              <SvgIcon name="SA" />
              <p>+966</p>
            </v-card>
            <v-text-field
              label=""
              rounded="lg"
              :rules="[rules.required, rules.phoneNumber]"
              variant="outlined"
              base-color="border-light"
              density="comfortable"
              placeholder="رقم الهاتف"
              v-model="registerDetails.phone"
            />
          </div>
        </v-col>
        <v-col cols="6" sm="12" class="pb-0">
          <v-text-field
            :type="isInputOneShow ? 'text' : 'password'"
            placeholder="كلمة المرور الجديدة"
            :rules="[rules.required, rules.minLength(8)]"
            base-color="border-light"
            density="comfortable"
            v-model="registerDetails.password"
          >
            <template #append-inner>
              <div
                class="cursor-pointer"
                @click="isInputOneShow = !isInputOneShow"
              >
                <v-icon color="border-light" v-if="!isInputOneShow"
                  >mdi-eye-off</v-icon
                >
                <v-icon color="border-light" v-else>mdi-eye</v-icon>
              </div>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="6" sm="12" class="pb-0">
          <v-text-field
            :type="isInputTwoShow ? 'text' : 'password'"
            placeholder="كلمة المرور مجددا"
            base-color="border-light"
            :rules="[
              rules.required,
              rules.confirmPassword(
                registerDetails.confirm_password,
                registerDetails.password
              ),
            ]"
            density="comfortable"
            v-model="registerDetails.confirm_password"
          >
            <template #append-inner>
              <div
                class="cursor-pointer"
                @click="isInputTwoShow = !isInputTwoShow"
              >
                <v-icon color="border-light" v-if="!isInputTwoShow"
                  >mdi-eye-off</v-icon
                >
                <v-icon color="border-light" v-else>mdi-eye</v-icon>
              </div>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="12">
          <v-btn
            @click="handleSubmit"
            :loading="isLoading"
            color="primary"
            type="submit"
            round
            block
            size="50"
            rounded="lg"
            >انشئ حساب جديد</v-btn
          >
        </v-col>
        <v-col cols="12" sm="12" class="text-center pt-0">
          <p>
            ليس لديك حساب ؟
            <NuxtLink to="/login" class="text-primary font-weight-bold"
              >تسجيل الدخول</NuxtLink
            >
          </p>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
