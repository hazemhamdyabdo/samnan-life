<script setup >
const emits = defineEmits(['change:step-one'])
const isInputOneShow = ref(false)
const isInputTwoShow = ref(false)
</script>

<template>
  <div>
    <h3>
      انشاء حساب جديد
    </h3>
    <span>الامر يجتاج من خطوتين فقط!</span>
  </div>
  <v-form>
    <v-row>
      <v-col cols="6" sm="12" class="pt-0 d-flex ga-4">
        <v-text-field
            label=""
            rounded="lg"
            variant="outlined"
            density="compact"
            placeholder="الاسم الاول"
            hide-details
        ></v-text-field>
        <v-text-field
            label=""
            rounded="lg"
            variant="outlined"
            density="compact"
            placeholder="الاسم الاحير"
            hide-details
        ></v-text-field>

      </v-col>
      <v-col cols="6" sm="12">
        <div class="d-flex ga-2">
          <v-card rounded="lg" color="transparent" style="border: 1px solid #8E8E8E;"
                  elevation="0"
                  class="d-flex align-center ga-2 px-4 cursor-auto">
            <SvgIcon name="SA"/>
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
            :type="isInputOneShow ? 'text' : 'password'"
            rounded="lg"
            variant="outlined"
            density="compact"
            placeholder="كلمة المرور الجديدة"
            hide-details
        >
          <template #append-inner>
            <div class="cursor-pointer" @click="isInputOneShow = !isInputOneShow">
              <v-icon v-if="!isInputOneShow">mdi-eye-off</v-icon>
              <v-icon v-else>mdi-eye</v-icon>
            </div>
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="6" sm="12" class="pt-0">
        <v-text-field
            label=""
            :type="isInputTwoShow ? 'text' : 'password'"
            rounded="lg"
            variant="outlined"
            density="compact"
            placeholder="كلمة المرور مجددا"
            hide-details
        >
          <template #append-inner>
            <div class="cursor-pointer" @click="isInputTwoShow = !isInputTwoShow">
              <v-icon v-if="!isInputTwoShow">mdi-eye-off</v-icon>
              <v-icon v-else>mdi-eye</v-icon>
            </div>
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="12" class="pt-0">
        <v-btn @click="emits('change:step-one')" color="primary" round block size="50" rounded="lg">انشئ حساب جديد</v-btn>
      </v-col>
      <v-col cols="12" sm="12" class="text-center pt-0">
        <p>
          ليس لديك حساب ؟
          <NuxtLink to="/login" class="text-primary font-weight-bold">تسجيل الدخول</NuxtLink>
        </p>
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped lang="scss">

</style>