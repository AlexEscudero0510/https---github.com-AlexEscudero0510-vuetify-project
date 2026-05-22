<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="3"
      max-width="448"
      rounded="lg"
    >

      <div class="text-body-large text-medium-emphasis">
        Account
      </div>

      <!-- EMAIL -->
      <v-text-field
        density="compact"
        v-model="username"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        class="mb-4"
      ></v-text-field>

      <!-- PASSWORD -->
      <div class="text-body-large text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
          class="text-body-small text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?
        </a>
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        v-model="password"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <!-- INFO -->
      <v-card
        class="mb-6"
        color="surface-variant"
        variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-body-small">
          Warning: After 3 consecutive failed login attempts,
          your account will be temporarily locked for three hours.
        </v-card-text>
      </v-card>

      <!-- ERROR -->
      <v-alert
        v-if="errorMessage"
        type="error"
        variant="tonal"
        density="compact"
        class="mt-4 mb-6"
        border="start"
      >
        {{ errorMessage }}
      </v-alert>

      <!-- BOTON LOGIN -->
      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
        @click="login"
      >
        Log In
      </v-btn>

      <!-- REGISTRO -->
      <v-card-text class="text-center">
        <RouterLink
          to="/register"
          class="text-blue text-decoration-none"
        >
          Sign up now
          <v-icon icon="mdi-chevron-right"></v-icon>
        </RouterLink>
      </v-card-text>

    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase.js'

// VARIABLES
const username = ref('')
const password = ref('')
const errorMessage = ref('')
const visible = ref(false)

// ROUTER
const router = useRouter()

// LOGIN
const login = async () => {

  // VALIDAR CAMPOS
  if (username.value === '' || password.value === '') {

    errorMessage.value = 'Favor de completar los datos'
    return
  }

  try {

    // LOGIN FIREBASE
    const userCredential = await signInWithEmailAndPassword(
      auth,
      username.value,
      password.value
    )

    console.log(userCredential)

    errorMessage.value = ''

    // REDIRECCIONAR
    router.push('/')

  } catch (error) {

    console.log(error)

    errorMessage.value = 'Correo o contraseña incorrectos'
  }
}
</script>