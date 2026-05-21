<template>
  <div>
    <v-card
      class="mx-auto pa-8"
      elevation="3"
      max-width="448"
      rounded="lg"
    >
      <h2 class="text-center mb-6">Registro Usuario</h2>

      <!-- EMAIL -->
      <v-text-field
        v-model="username"
        label="Correo Electrónico"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        density="compact"
        class="mb-4"
      ></v-text-field>

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
      ></v-text-field>

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
      ></v-text-field>

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
      <v-card-actions>
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
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

// Función de registro
const register = () => {
    if(username.value === '' || password.value === ''){
        errorMessage.value = 'Favor de completar los datos'
        return
    }

    if(password.value != confirmPassword.value){
        errorMessage.value = 'las contraseñas no coinciden'
        return
    }

    try{

    }catch(error){
        errorMessage.value="Ocurrio un error"
    }
  }
</script>