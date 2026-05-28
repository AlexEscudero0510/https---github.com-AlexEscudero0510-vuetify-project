<template>

  <div class="create-container">

    <!-- FONDOS -->
    <div class="background-circle circle-1"></div>
    <div class="background-circle circle-2"></div>

    <!-- CARD -->
    <v-card
      class="create-card"
      elevation="10"
      rounded="xl"
    >

      <!-- ICONO -->
      <div class="text-center mb-4">

        <v-avatar
          color="primary"
          size="90"
        >
          <v-icon
            size="50"
            color="white"
          >
            mdi-plus
          </v-icon>
        </v-avatar>

      </div>

      <!-- TITULO -->
      <h1 class="text-center font-weight-bold mb-2">
        Crear Producto
      </h1>

      <p class="text-center text-grey mb-8">
        Agrega un nuevo producto
      </p>

      <!-- CODIGO -->
      <v-text-field
        v-model="codigo"
        label="Código"
        prepend-inner-icon="mdi-barcode"
        variant="outlined"
        density="comfortable"
        rounded="xl"
        class="mb-4"
      />

      <!-- DESCRIPCION -->
      <v-text-field
        v-model="descripcion"
        label="Descripción"
        prepend-inner-icon="mdi-text"
        variant="outlined"
        density="comfortable"
        rounded="xl"
        class="mb-5"
      />

      <!-- BOTON -->
      <v-btn
        color="primary"
        block
        size="large"
        rounded="xl"
        height="50"
        @click="guardarProducto"
      >
        Guardar Producto
      </v-btn>

    </v-card>

  </div>

</template>

<script setup lang="ts">

import { ref } from 'vue'

import { useRouter } from 'vue-router'

import { db } from '../firebase.js'

import {
  collection,
  addDoc
} from 'firebase/firestore'

// ROUTER
const router = useRouter()

// VARIABLES
const codigo = ref('')

const descripcion = ref('')

// GUARDAR
const guardarProducto = async () => {

  try {

    await addDoc(
      collection(db, 'productos'),
      {

        codigo: codigo.value,

        descripcion: descripcion.value

      }
    )

    // REGRESAR
    router.push('/home')

  } catch (error) {

    console.log(error)

  }

}

</script>

<style scoped>

.create-container {

  min-height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;

  position: relative;

  overflow: hidden;

  background: linear-gradient(
    135deg,
    #2563eb,
    #3b82f6,
    #60a5fa
  );

  padding: 20px;
}

.create-card {

  width: 100%;

  max-width: 420px;

  padding: 40px 30px;

  backdrop-filter: blur(10px);

  z-index: 2;
}

.background-circle {

  position: absolute;

  border-radius: 50%;

  filter: blur(60px);

  opacity: 0.35;
}

.circle-1 {

  width: 250px;

  height: 250px;

  background: #ffffff;

  top: -60px;

  left: -60px;
}

.circle-2 {

  width: 300px;

  height: 300px;

  background: #1d4ed8;

  bottom: -80px;

  right: -80px;
}

</style>