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
        <SideBar style="min-height: calc(100vh - 80px)">
          <slot></slot>
        </SideBar>
      </v-container>
    </v-main>
  </v-app>
</template>
