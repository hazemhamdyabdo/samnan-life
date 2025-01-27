<script setup>
const props = defineProps({
  technichian: {
    type: Boolean,
    default: false,
  },
});

definePageMeta({
  layout: "auth",
});

const { login } = useAuthStore();
const { formRef, rules, validate } = useFormValidation();
const { showSuccess } = useAlertStore();

const isPasswordShow = ref(false);
const isLoading = ref(false);

const loginDetails = reactive({
  phone: "512345003",
  password: "123456789",
});

const handleLogin = async () => {
  isLoading.value = true;
  try {
    await validate();
    await login(loginDetails, props.technichian);
    showSuccess("تم تسجيل الدخول بنجاح");
    navigateTo("/dashboard");
  } catch (error) {
    // handle ui changes
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="wrapper d-flex align-center">
    <v-row class="align-center align-center h-100">
      <v-col class="d-none d-md-block h-100" cols="12" md="6">
        <v-img
          src="../../assets/imgs/image 3.png"
          alt="Responsive Image"
          class="rounded-xl"
          cover
        />
      </v-col>
      <v-col cols="12" md="6" class="d-flex flex-column ga-6">
        <div class="w-md-75 mx-auto">
          <div class="d-flex ga-2 align-center">
            <AppSvgIcon name="logo" size="lg" />
            <AppSvgIcon name="title" :size="60" />
          </div>
          <div>
            <h3 class="font-weight-medium">{{ $t("login.title") }}</h3>
            <span>{{ $t("login.welcome_back") }}</span>
          </div>
          <v-form fast-fail ref="formRef" @submit.prevent>
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
                    <AppSvgIcon name="SA" />
                    <p>+966</p>
                  </v-card>
                  <v-text-field
                    v-model="loginDetails.phone"
                    type="number"
                    :rules="[rules.required, rules.phoneNumber]"
                    label=""
                    rounded="lg"
                    variant="outlined"
                    base-color="border-light"
                    density="comfortable"
                    :placeholder="$t('login.phone')"
                    hide-spin-buttons
                  />
                </div>
              </v-col>
              <v-col cols="6" sm="12" class="pt-0">
                <v-text-field
                  label=""
                  :type="isPasswordShow ? 'text' : 'password'"
                  :rules="[rules.required, rules.minLength(8)]"
                  rounded="lg"
                  base-color="border-light"
                  v-model="loginDetails.password"
                  variant="outlined"
                  density="comfortable"
                  :placeholder="$t('login.password')"
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
              <v-col v-if="!technichian" cols="12" sm="12" class="pt-0">
                <NuxtLink
                  to="/forget-password"
                  class="text-primary font-weight-bold"
                >
                  {{ $t("login.forget_password") }}
                </NuxtLink>
              </v-col>
              <v-col cols="12" sm="12" class="pt-0">
                <v-btn
                  @click="handleLogin"
                  color="primary"
                  :loading="isLoading"
                  type="submit"
                  round
                  block
                  size="50"
                  rounded="lg"
                  >{{ $t("login.button") }}</v-btn
                >
              </v-col>
              <v-col
                v-if="!technichian"
                cols="12"
                sm="12"
                class="text-center pt-0"
              >
                <p>
                  {{ $t("login.no_account") }}
                  <NuxtLink
                    to="/register"
                    class="text-primary font-weight-bold"
                    >{{ $t("login.register") }}</NuxtLink
                  >
                </p>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  padding: 20px;
}
</style>
