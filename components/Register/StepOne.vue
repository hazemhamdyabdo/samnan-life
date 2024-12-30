<script setup>
const emits = defineEmits(["change:step-one"]);
const isInputOneShow = ref(false);
const isInputTwoShow = ref(false);
</script>

<template>
  <div>
    <div>
      <h3>انشاء حساب جديد</h3>
      <span>الامر يجتاج من خطوتين فقط!</span>
    </div>
    <v-form>
      <v-row>
        <v-col cols="6" sm="12" class="pt-0 d-flex ga-4">
          <v-text-field
            variant="outlined"
            placeholder="الاسم الاول"
            hide-details
          ></v-text-field>
          <v-text-field placeholder="الاسم الاحير" hide-details></v-text-field>
        </v-col>
        <v-col cols="6" sm="12">
          <div class="d-flex ga-2">
            <v-card
              rounded="lg"
              color="transparent"
              elevation="0"
              class="d-flex align-center border border-opacity-25 ga-2 px-4 cursor-auto"
            >
              <SvgIcon name="SA" />
              <p>+966</p>
            </v-card>
            <v-text-field placeholder="رقم الهاتف" hide-details />
          </div>
        </v-col>
        <v-col cols="6" sm="12" class="pt-0">
          <v-text-field
            :type="isInputOneShow ? 'text' : 'password'"
            placeholder="كلمة المرور الجديدة"
            hide-details
          >
            <template #append-inner>
              <div
                class="cursor-pointer"
                @click="isInputOneShow = !isInputOneShow"
              >
                <v-icon v-if="!isInputOneShow">mdi-eye-off</v-icon>
                <v-icon v-else>mdi-eye</v-icon>
              </div>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="6" sm="12" class="pt-0">
          <v-text-field
            :type="isInputTwoShow ? 'text' : 'password'"
            placeholder="كلمة المرور مجددا"
            hide-details
          >
            <template #append-inner>
              <div
                class="cursor-pointer"
                @click="isInputTwoShow = !isInputTwoShow"
              >
                <v-icon v-if="!isInputTwoShow">mdi-eye-off</v-icon>
                <v-icon v-else>mdi-eye</v-icon>
              </div>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="12" class="pt-0">
          <v-btn
            @click="emits('change:step-one')"
            color="primary"
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
