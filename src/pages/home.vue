<template>

  <v-layout class="home-layout">

    <!-- APP BAR -->
    <v-app-bar
      color="primary"
      elevation="0"
      class="px-2"
    >

      <v-app-bar-nav-icon
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="font-weight-bold">
        Productos
      </v-toolbar-title>

    </v-app-bar>

    <!-- DRAWER -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
    >

      <div class="pa-5 text-center">

        <v-avatar
          size="80"
          color="primary"
          class="mb-3"
        >
          <v-icon
            size="40"
            color="white"
          >
            mdi-package-variant
          </v-icon>
        </v-avatar>

        <h3 class="font-weight-bold">
          Sistema Productos
        </h3>

      </div>

      <v-divider></v-divider>

      <v-list nav>

        <v-list-item
          prepend-icon="mdi-package-variant-closed"
          title="Productos"
          value="productos"
          @click="drawer = false"
        ></v-list-item>

      </v-list>

    </v-navigation-drawer>

    <!-- MAIN -->
    <v-main>

      <v-container class="py-6">

        <!-- TITULO -->
        <div class="d-flex align-center justify-space-between mb-6">

          <div>

            <h1 class="font-weight-bold text-h4">
              Productos
            </h1>

            <p class="text-grey">
              Lista de productos registrados
            </p>

          </div>

        </div>

        <!-- PRODUCTOS -->
        <v-row>

          <v-col
            cols="12"
            md="6"
            lg="4"
            v-for="producto in productos"
            :key="producto.id"
          >

            <v-card
              class="product-card"
              rounded="xl"
              elevation="4"
            >

              <!-- ICON -->
              <div class="text-center pt-6">

                <v-avatar
                  color="primary"
                  size="70"
                >
                  <v-icon
                    size="40"
                    color="white"
                  >
                    mdi-package-variant-closed
                  </v-icon>
                </v-avatar>

              </div>

              <!-- INFO -->
              <v-card-text class="text-center">

                <h2 class="font-weight-bold mb-2">
                  {{ producto.codigo }}
                </h2>

                <p class="text-grey">
                  {{ producto.descripcion }}
                </p>

              </v-card-text>

              <!-- ACTIONS -->
              <v-card-actions class="justify-center pb-5">

                <!-- EDITAR -->
                <v-btn
                  color="warning"
                  rounded="xl"
                  prepend-icon="mdi-pencil"
                  @click="editarProducto(producto.id)"
                >
                  Editar
                </v-btn>

                <!-- ELIMINAR -->
                <v-btn
                  color="error"
                  rounded="xl"
                  prepend-icon="mdi-delete"
                  @click="eliminarProducto(producto.id)"
                >
                  Eliminar
                </v-btn>

              </v-card-actions>

            </v-card>

          </v-col>

        </v-row>

        <!-- BOTON FLOTANTE -->
        <v-btn
          color="primary"
          icon="mdi-plus"
          size="x-large"
          class="floating-button"
          elevation="8"
          @click="router.push('/crearProducto_page')"
        >
        </v-btn>

      </v-container>

    </v-main>

  </v-layout>

</template>

<script setup lang="ts">

import {
  ref,
  onMounted
} from 'vue'

import {
  useRouter
} from 'vue-router'

import { db } from '../firebase.js'

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore'

// ROUTER
const router = useRouter()

// DRAWER
const drawer = ref(false)

// PRODUCTOS
const productos = ref<any[]>([])

// OBTENER PRODUCTOS
const obtenerProductos = async () => {

  try {

    const querySnapshot = await getDocs(
      collection(db, 'productos')
    )

    productos.value = querySnapshot.docs.map(doc => ({

      id: doc.id,
      ...(doc.data() as any)

    }))

  } catch (error) {

    console.log(error)

  }

}

// EDITAR
const editarProducto = (id: string) => {

  router.push(`/editarProducto_Page?id=${id}`)

}

// ELIMINAR
const eliminarProducto = async (id: string) => {

  try {

    await deleteDoc(
      doc(db, 'productos', id)
    )

    obtenerProductos()

  } catch (error) {

    console.log(error)

  }

}

// MOUNTED
onMounted(() => {

  obtenerProductos()

})

</script>

<style scoped>

.home-layout {

  min-height: 100vh;

  background: linear-gradient(
    135deg,
    #f1f5f9,
    #e2e8f0
  );
}

.product-card {

  transition: 0.3s;

  overflow: hidden;
}

.product-card:hover {

  transform: translateY(-5px);
}

.floating-button {

  position: fixed;

  bottom: 25px;

  right: 25px;

  z-index: 999;
}

</style>