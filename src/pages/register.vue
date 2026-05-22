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
        Registro Usuario
      </h2>

      <!-- CORREO -->
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
        class="mb-4"
      />

      <!-- CONFIRM PASSWORD -->
      <v-text-field
        v-model="confirmPassword"
        :type="showConfirmPassword ? 'text' : 'password'"
        label="Confirmar Contraseña"
        prepend-inner-icon="mdi-lock-check-outline"
        :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showConfirmPassword = !showConfirmPassword"
        variant="outlined"
        density="compact"
        class="mb-6"
      />

      <!-- ALERTA -->
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
        @click="register"
      >
        Registrarse
      </v-btn>

    </v-card>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.js'

// Router
const router = useRouter()

// Variables
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const errorMessage = ref('')

const username = ref('')
const password = ref('')
const confirmPassword = ref('')

// Función de registro
const register = async () => {

  // Validar campos vacíos
  if (username.value === '' || password.value === '') {
    errorMessage.value = 'Favor de completar los datos'
    return
  }

  // Validar contraseñas
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden'
    return
  }

  try {

    loading.value = true
    errorMessage.value = ''

    // Crear usuario en Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      username.value,
      password.value
    )

    console.log(userCredential)

    // Redireccionar
    router.push('/')

  } catch (error: any) {

    console.log(error)

    switch (error.code) {

      case 'auth/invalid-email':
        errorMessage.value = 'Correo inválido'
        break

      case 'auth/email-already-in-use':
        errorMessage.value = 'El correo ya está registrado'
        break

      case 'auth/weak-password':
        errorMessage.value = 'La contraseña debe tener mínimo 6 caracteres'
        break

      default:
        errorMessage.value = 'Ocurrió un error al registrar'
        break
    }

  } finally {

    loading.value = false

  }
}
</script>