<script setup>
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
const isPasswordShow = ref(false);

const loginDetails = reactive({
  phone: "597875665",
  password: "12345678",
});

const login = async () => {
  const { data, status } = await useAPI("/customer/login", {
    method: "POST",
    body: loginDetails,
  });
  console.log(data.value);
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
        <div>
          <h3 class="font-weight-medium">تسجيل الدخول</h3>
          <span>مرحبا بعودتك!</span>
        </div>
        <v-form>
          <v-row>
            <v-col cols="6" sm="12">
              <div class="d-flex ga-2">
                <v-card
                  rounded="lg"
                  color="transparent"
                  border="sm gray-800"
                  elevation="0"
                  height="50"
                  class="d-flex align-center ga-2 px-4 cursor-auto"
                >
                  <SvgIcon name="SA" />
                  <p>+966</p>
                </v-card>
                <v-text-field
                  v-model="loginDetails.phone"
                  label=""
                  rounded="lg"
                  variant="outlined"
                  base-color="border-light"
                  density="comfortable"
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
                base-color="border-light"
                v-model="loginDetails.password"
                variant="outlined"
                density="comfortable"
                placeholder="كلمة المرور"
                hide-details
              >
                <template #append-inner>
                  <div
                    class="cursor-pointer"
                    @click="isPasswordShow = !isPasswordShow"
                  >
                    <v-icon color="border-light" v-if="!isPasswordShow"
                      >mdi-eye-off</v-icon
                    >
                    <v-icon color="border-light" v-else>mdi-eye</v-icon>
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
              <v-btn
                @click="login"
                color="primary"
                round
                block
                size="50"
                rounded="lg"
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
