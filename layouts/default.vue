<script setup>
import NavBar from "~/components/common/NavBar.vue";
import SideBar from "~/components/common/SideBar.vue";
</script>

<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <!-- APP NAV -->
        <NavBar />
        <v-row class="mt-4">
          <v-col cols="12" sm="2" lg="1">
            <SideBar class="sticky"> </SideBar>
          </v-col>
          <v-col>
            <slot></slot>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
  z-index: 1000;
  @media (min-width: 960px) {
    min-height: calc(100vh - 20px);
  }
}
</style>
