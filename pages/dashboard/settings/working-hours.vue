<script setup lang="ts">
const { t } = useI18n();
</script>
<template>
  <section>
    <h4 class="text-20 text-grey-900">
      {{ t("dashboard.settings.my_working_hours") }}
    </h4>
    <section class="mt-8">
      <ul class="city-list ps-8 mb-4">
        <li class="mt-2">
          من <strong class="text-primary"> السبت</strong> حتى
          <strong class="text-primary">الاربعاء</strong>
        </li>
        <li class="mt-2">
          من <strong class="text-primary">07:00AM</strong> حتى
          <strong class="text-primary">04:00PM</strong>
        </li>
      </ul>
      <p>
        العطلة الاسبوعية يومى
        <strong class="text-primary">الخميس</strong> و
        <strong class="text-primary">الجمعة</strong>
      </p>
    </section>
  </section>
</template>

<style scoped>
.city-list {
  list-style-type: ". ";
}
</style>
