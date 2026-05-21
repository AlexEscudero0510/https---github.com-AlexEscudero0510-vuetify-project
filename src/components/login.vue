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
      <div class="text-body-large text-medium-emphasis">Account</div>

      <v-text-field
        density="compact"
        v-model="Email"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-body-large text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
          class="text-body-small text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a>
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

      <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-body-small">
          Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
        </v-card-text>
      </v-card>

      <v-alert
        v-if="errorMessage"
        type="error"
        variant="tonal"
        density="compact"
        class="mt-4 mb-6"
        border="start"
      >
      {{errorMessage}}
      </v-alert>

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

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { singInWithEmailAndPassword } from 'firebase/auth'
  import { aurth } from '@/firebase.js'

  const username = ref ('')
  const password = ref ('')
  const errorMessage = ref ('')
  const route = useRoute()

  const login = async () =>{
    try{
      const userCredential = await singInWithEmailAndPassword(AuthenticatorAssertionResponse,username.value,password.value)
      errorMessage.value = "Login Correcto"
    }catch (error){
        errorMessage.value = "Ocurrio un error"
    }

  }

  //mio
  const visible = ref(false)
</script>

