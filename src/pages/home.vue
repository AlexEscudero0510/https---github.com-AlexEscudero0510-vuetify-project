<template>
  <v-layout class="h-100">
    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Home</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      location="bottom"
      temporary
    >
      <v-list>
        <v-list-item
          prepend-icon="mdi-package-variant-closed"
          title="Productos"
          value="productos"
          @click="drawer = false"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <h2 class="text-center mt-5">Bienvenido</h2>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const drawer = ref(false)

</script>