<script setup>
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
const isPasswordShow = ref(false);
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
        <div>
          <h3>تسجيل الدخول</h3>
          <span>مرحبا بعودتك!</span>
        </div>
        <v-form>
          <v-row>
            <v-col cols="6" sm="12">
              <div class="d-flex ga-2">
                <v-card
                  rounded="lg"
                  color="transparent"
                  style="border: 1px solid #8e8e8e"
                  elevation="0"
                  class="d-flex align-center ga-2 px-4 cursor-auto"
                >
                  <SvgIcon name="SA" />
                  <p>+966</p>
                </v-card>
                <v-text-field
                  label=""
                  rounded="lg"
                  variant="outlined"
                  density="compact"
                  placeholder="رقم الهاتف"
                  hide-details
                />
              </div>
            </v-col>
            <v-col cols="6" sm="12" class="pt-0">
              <v-text-field
                label=""
                :type="isPasswordShow ? 'text' : 'password'"
                rounded="lg"
                variant="outlined"
                density="compact"
                placeholder="كلمة المرور"
                hide-details
              >
                <template #append-inner>
                  <div
                    class="cursor-pointer"
                    @click="isPasswordShow = !isPasswordShow"
                  >
                    <v-icon v-if="!isPasswordShow">mdi-eye-off</v-icon>
                    <v-icon v-else>mdi-eye</v-icon>
                  </div>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="12" class="pt-0">
              <NuxtLink
                to="/forget-password"
                class="text-primary font-weight-bold"
              >
                نسيت كلمة المرور ؟
              </NuxtLink>
            </v-col>
            <v-col cols="12" sm="12" class="pt-0">
              <v-btn color="primary" round block size="50" rounded="lg"
                >تسجيل الدخول</v-btn
              >
            </v-col>
            <v-col cols="12" sm="12" class="text-center pt-0">
              <p>
                ليس لديك حساب ؟
                <NuxtLink to="/register" class="text-primary font-weight-bold"
                  >انشاء حساب جديد</NuxtLink
                >
              </p>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
