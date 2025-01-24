<script setup lang="ts">
import Profile from "~/components/Settings/Profile.vue";
import Phone from "~/components/Settings/phone/Phone.vue";
import Password from "~/components/Settings/password/Password.vue";

const components = {
  Profile,
  Phone,
  Password,
};
const initialComponent = ref("Profile");

function changeComponent(name: string) {
  initialComponent.value = name;
}

const currentComponentView = computed(() => {
  // @ts-ignore
  return components[initialComponent.value];
});
</script>

<template>
  <v-row class="ps-4 pb-4">
    <component :is="currentComponentView" @change-action="changeComponent" />
  </v-row>
</template>
