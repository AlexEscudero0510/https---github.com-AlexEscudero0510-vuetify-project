<template>

  <div class="edit-container">

    <!-- FONDOS -->
    <div class="background-circle circle-1"></div>
    <div class="background-circle circle-2"></div>

    <!-- CARD -->
    <v-card
      class="edit-card"
      elevation="10"
      rounded="xl"
    >

      <!-- ICONO -->
      <div class="text-center mb-4">

        <v-avatar
          color="warning"
          size="90"
        >
          <v-icon
            size="50"
            color="white"
          >
            mdi-pencil
          </v-icon>
        </v-avatar>

      </div>

      <!-- TITULO -->
      <h1 class="text-center font-weight-bold mb-2">
        Editar Producto
      </h1>

      <p class="text-center text-grey mb-8">
        Modifica la información del producto
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
        color="warning"
        block
        size="large"
        rounded="xl"
        height="50"
        @click="actualizarProducto"
      >
        Actualizar Producto
      </v-btn>

    </v-card>

  </div>

</template>

<script setup lang="ts">

import {
  ref,
  onMounted
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import { db } from '../firebase.js'

import {
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore'

// ROUTE
const route = useRoute()

const router = useRouter()

// VARIABLES
const codigo = ref('')

const descripcion = ref('')

// OBTENER PRODUCTO
const obtenerProducto = async () => {

  try {

    // ID
    const id = route.query.id as string

    // REFERENCIA
    const docRef = doc(
      db,
      'productos',
      id
    )

    // CONSULTA
    const docSnap = await getDoc(docRef)

    // EXISTE
    if (docSnap.exists()) {

      const data = docSnap.data()

      codigo.value = data.codigo

      descripcion.value = data.descripcion

    }

  } catch (error) {

    console.log(error)

  }

}

// ACTUALIZAR
const actualizarProducto = async () => {

  try {

    // ID
    const id = route.query.id as string

    // UPDATE
    await updateDoc(
      doc(db, 'productos', id),
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

// MOUNTED
onMounted(() => {

  obtenerProducto()

})

</script>

<style scoped>

.edit-container {

  min-height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;

  position: relative;

  overflow: hidden;

  background: linear-gradient(
    135deg,
    #f59e0b,
    #fbbf24,
    #fde68a
  );

  padding: 20px;
}

.edit-card {

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

  background: #ff9800;

  bottom: -80px;

  right: -80px;
}

</style>