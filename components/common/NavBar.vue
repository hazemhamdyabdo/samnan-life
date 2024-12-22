<template>
  <v-app-bar
    color="background"
    elevation="0"
    scroll-behavior="hide"
    class="px-3 nav"
  >
    <v-container>
      <v-row>
        <nuxt-link class="nav-link" :to="localePath('/')"> logo </nuxt-link>
        <v-btn @click="setLocale('en')">en</v-btn>
        <v-btn @click="setLocale('ar')">ar</v-btn>
        <v-spacer></v-spacer>
        <div class="d-flex alint-center ga-2 justify-end">
          <img width="40" :src="User" alt="User" />
          <img width="40" :src="NavBars" alt="NavBars" />
          <v-btn @click="toggleTheme">toggle theme</v-btn>
        </div>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import User from "~/assets/imgs/user.svg";
import NavBars from "~/assets/imgs/nav-bars.svg";

import { useTheme } from "vuetify";
const { setLocale } = useI18n();

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

<style lang="scss" scoped>
.nav {
  .nav-link {
    width: 160px;
  }
}
</style>
