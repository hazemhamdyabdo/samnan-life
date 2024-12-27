<script setup lang="ts">
const emits = defineEmits(["change:step-one"]);
</script>

<template>
  <div>
    <h3>نسيت كلمة السر</h3>
    <span>قم بادخال بريدك الالكتروني لاستعادة الحساب</span>
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
      <v-col cols="12" sm="12" class="pt-0">
        <v-btn
          @click="emits('change:step-one')"
          color="primary"
          round
          block
          size="50"
          rounded="lg"
          >إرسال</v-btn
        >
      </v-col>
      <v-col cols="12" sm="12" class="text-center pt-0">
        <p>
          <NuxtLink to="/login" class="text-primary font-weight-bold"
            >العودة لتسجيل الدخول</NuxtLink
          >
        </p>
      </v-col>
    </v-row>
  </v-form>
</template>
