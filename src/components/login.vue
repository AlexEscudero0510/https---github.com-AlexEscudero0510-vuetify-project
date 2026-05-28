<template>

  <div class="login-container">

    <!-- FONDO -->
    <div class="background-circle circle-1"></div>
    <div class="background-circle circle-2"></div>

    <!-- CARD -->
    <v-card
      class="login-card"
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
            mdi-account
          </v-icon>
        </v-avatar>

      </div>

      <!-- TITULO -->
      <h1 class="text-center font-weight-bold mb-2">
        Bienvenido
      </h1>

      <p class="text-center text-grey mb-8">
        Inicia sesión para continuar
      </p>

      <!-- EMAIL -->
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
        class="mb-2"
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
        @click="login"
      >
        Iniciar Sesión
      </v-btn>

      <!-- REGISTER -->
      <div class="text-center">

        <RouterLink
          to="/register"
          class="register-link"
        >
          ¿No tienes cuenta? Regístrate
        </RouterLink>

      </div>

    </v-card>

  </div>

</template>

<script setup lang="ts">

import { ref } from 'vue'

import { useRouter } from 'vue-router'

import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '@/firebase.js'

// ROUTER
const router = useRouter()

// VARIABLES
const loading = ref(false)

const showPassword = ref(false)

const username = ref('')

const password = ref('')

const errorMessage = ref('')

// LOGIN
const login = async () => {

  if (
    username.value === '' ||
    password.value === ''
  ) {

    errorMessage.value = 'Favor de completar los datos'

    return
  }

  try {

    loading.value = true

    errorMessage.value = ''

    const userCredential =
      await signInWithEmailAndPassword(

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

<style scoped>

.login-container {

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

.login-card {

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

.register-link {

  text-decoration: none;

  font-weight: 600;

  color: #1976d2;

  transition: 0.3s;
}

.register-link:hover {

  opacity: 0.7;
}

</style>