<script setup>
import { ref } from 'vue';
import NotifAlert from '@/components/NotifAlert.vue'
import CustomInput from '@/components/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import api from '@/utils/axiosInstance';
import { rootState } from '@/stores/index';

const rootStore = rootState()
const email = ref('')
const password = ref('')
const disabled = ref(false)

const register = async () => {
  disabled.value = true
  try {
    await api.post('/register', { email: email.value, password: password.value })
    rootStore.setStatus('success', "register user succesfully, please login")
  } catch (error) {
    rootStore.setStatus('error', error.response.data.error)
  } finally {
    disabled.value = false
  }
}

</script>

<template>
  <main class="grid grid-cols-12 place-items-center">
    <div class="hidden md:flex justify-center col-span-6">
      <img class="max-w-xs md:max-w-[400px]" src="@/assets/images/image-login.png" alt="Login Illustration">
    </div>
    <div class="w-full max-w-md flex justify-center col-span-12 md:col-span-6">
      <form class="bg-white p-6 w-full" @submit.prevent="register()">
        <div class="w-full flex justify-center mb-12">
          <img src="@/assets/logo.svg" height="22" alt="logo">
        </div>
        <p class="text-2xl font-semibold mb-6">Register</p>
        <NotifAlert class="mb-3" />
        <CustomInput id="email" type="email" label="Email" placeholder="eve.holt@reqres.in"
          @handle-change="email = $event" :value="email" required />
        <CustomInput id="password" type="password" label="Password" placeholder="pistol"
          @handle-change="password = $event" :value="password" required />
        <CustomButton id="btn-register" text="Register" variant="primary" :disabled="disabled" />
        <p class="text-xs mt-3">Already have an account? <router-link to="/login" class="link">Login</router-link></p>
      </form>
    </div>

  </main>
</template>
