<script setup>
const emits = defineEmits(["change:step-three"]);

const isInputOneShow = ref(false);
const isInputTwoShow = ref(false);
</script>

<template>
  <div>
    <h3>كلمة السر الجديدة</h3>
    <span>قم بادخال كلمة المرور الجديدة مرتين ثم ستتمكن من فتح الحساب</span>
  </div>
  <v-row>
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
      <v-btn
        @click="emits('change:step-three')"
        color="primary"
        round
        block
        size="50"
        rounded="lg"
        >حفظ</v-btn
      >
    </v-col>
  </v-row>
</template>
