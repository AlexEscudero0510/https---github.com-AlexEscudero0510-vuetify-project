<template>

  <div class="register-container">

    <!-- FONDOS -->
    <div class="background-circle circle-1"></div>
    <div class="background-circle circle-2"></div>

    <!-- CARD -->
    <v-card
      class="register-card"
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
            mdi-account-plus
          </v-icon>
        </v-avatar>

      </div>

      <!-- TITULO -->
      <h1 class="text-center font-weight-bold mb-2">
        Crear Cuenta
      </h1>

      <p class="text-center text-grey mb-8">
        Regístrate para continuar
      </p>

      <!-- CORREO -->
      <v-text-field
        v-model="username"
        label="Correo Electrónico"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        density="comfortable"
        rounded="xl"
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
        density="comfortable"
        rounded="xl"
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
        density="comfortable"
        rounded="xl"
        class="mb-5"
      />

      <!-- ERROR -->
      <v-alert
        v-if="errorMessage"
        type="error"
        density="compact"
        rounded="lg"
        class="mb-5"
      >
        {{ errorMessage }}
      </v-alert>

      <!-- BOTON -->
      <v-btn
        :loading="loading"
        color="primary"
        block
        size="large"
        rounded="xl"
        height="50"
        class="mb-5"
        @click="register"
      >
        Registrarse
      </v-btn>

      <!-- LOGIN -->
      <div class="text-center">

        <RouterLink
          to="/"
          class="login-link"
        >
          ¿Ya tienes cuenta? Inicia sesión
        </RouterLink>

      </div>

    </v-card>

  </div>

</template>

<script setup lang="ts">

import { ref } from 'vue'

import { useRouter } from 'vue-router'

import { createUserWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../firebase.js'

// ROUTER
const router = useRouter()

// VARIABLES
const loading = ref(false)

const showPassword = ref(false)

const showConfirmPassword = ref(false)

const errorMessage = ref('')

const username = ref('')

const password = ref('')

const confirmPassword = ref('')

// REGISTER
const register = async () => {

  // VALIDAR
  if (
    username.value === '' ||
    password.value === ''
  ) {

    errorMessage.value =
      'Favor de completar los datos'

    return
  }

  // CONFIRM PASSWORD
  if (
    password.value !== confirmPassword.value
  ) {

    errorMessage.value =
      'Las contraseñas no coinciden'

    return
  }

  try {

    loading.value = true

    errorMessage.value = ''

    // FIREBASE
    const userCredential =
      await createUserWithEmailAndPassword(

        auth,
        username.value,
        password.value

      )

    console.log(userCredential)

    // LOGIN
    router.push('/')

  } catch (error: any) {

    console.log(error)

    switch (error.code) {

      case 'auth/invalid-email':

        errorMessage.value =
          'Correo inválido'

        break

      case 'auth/email-already-in-use':

        errorMessage.value =
          'El correo ya está registrado'

        break

      case 'auth/weak-password':

        errorMessage.value =
          'La contraseña debe tener mínimo 6 caracteres'

        break

      default:

        errorMessage.value =
          'Ocurrió un error al registrar'

        break
    }

  } finally {

    loading.value = false

  }

}

</script>

<style scoped>

.register-container {

  min-height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;

  position: relative;

  overflow: hidden;

  background: linear-gradient(
    135deg,
    #0f172a,
    #1e293b,
    #334155
  );

  padding: 20px;
}

.register-card {

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

  opacity: 0.4;
}

.circle-1 {

  width: 250px;

  height: 250px;

  background: #1976d2;

  top: -50px;

  left: -50px;
}

.circle-2 {

  width: 300px;

  height: 300px;

  background: #7c4dff;

  bottom: -80px;

  right: -80px;
}

.login-link {

  text-decoration: none;

  font-weight: 600;

  color: #1976d2;

  transition: 0.3s;
}

.login-link:hover {

  opacity: 0.7;
}

</style>