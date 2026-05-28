<template>
  <div class="d-flex justify-center align-center" style="height: 100vh">

    <v-card
      class="pa-8"
      elevation="5"
      max-width="450"
      width="100%"
      rounded="lg"
    >

      <h2 class="text-center mb-6">
        Iniciar Sesión
      </h2>

      <!-- EMAIL -->
      <v-text-field
        v-model="username"
        label="Correo Electrónico"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        density="compact"
        class="mb-4"
      />

      <!-- PASSWORD -->
      <v-text-field
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        label="Contraseña"
        prepend-inner-icon="mdi-lock-outline"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showPassword = !showPassword"
        variant="outlined"
        density="compact"
        class="mb-6"
      />

      <!-- ERROR -->
      <v-alert
        v-if="errorMessage"
        type="error"
        density="compact"
        class="mb-4"
      >
        {{ errorMessage }}
      </v-alert>

      <!-- BOTÓN -->
      <v-btn
        :loading="loading"
        color="primary"
        block
        size="large"
        rounded="lg"
        @click="login"
      >
        Iniciar Sesión
      </v-btn>

      <!-- LINK A REGISTER -->
      <v-card-text class="text-center mt-4">
        <RouterLink
          to="/register"
          class="text-decoration-none text-primary"
        >
          ¿No tienes cuenta? Regístrate
        </RouterLink>
      </v-card-text>

    </v-card>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase.js'

// Router
const router = useRouter()

// Variables
const loading = ref(false)
const showPassword = ref(false)

const username = ref('')
const password = ref('')
const errorMessage = ref('')

// Login
const login = async () => {

  if (username.value === '' || password.value === '') {
    errorMessage.value = 'Favor de completar los datos'
    return
  }

  try {

    loading.value = true
    errorMessage.value = ''

    const userCredential = await signInWithEmailAndPassword(
      auth,
      username.value,
      password.value
    )

    console.log(userCredential)

    router.push('/home')

  } catch (error: any) {

    console.log(error)

    switch (error.code) {

      case 'auth/invalid-email':
        errorMessage.value = 'Correo inválido'
        break

      case 'auth/user-not-found':
        errorMessage.value = 'Usuario no registrado'
        break

      case 'auth/wrong-password':
        errorMessage.value = 'Contraseña incorrecta'
        break

      default:
        errorMessage.value = 'Error al iniciar sesión'
        break
    }

  } finally {
    loading.value = false
  }
}
</script>