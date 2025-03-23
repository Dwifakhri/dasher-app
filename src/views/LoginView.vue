<script setup>
import { ref } from 'vue';
import { rootState } from '@/stores/index';
import CustomInput from '@/components/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import NotifAlert from '@/components/NotifAlert.vue';
import { useRouter } from 'vue-router';
import api from '@/utils/axiosInstance';
import Cookies from 'js-cookie';

const email = ref('')
const password = ref('')
const disabled = ref(false)
const router = useRouter()
const rootStore = rootState()

const login = async () => {
  disabled.value = true
  try {
    const response = await api.post('/login', { email: email.value, password: password.value })
    await Cookies.set('token', response.data.token,)
    await rootStore.getProfile()
    router.push('/')
  } catch (error) {
    rootStore.setStatus('error', error.response.data.error)
  } finally {
    disabled.value = false
  }
}
</script>

<template>
  <main class="grid grid-cols-12 place-items-center">
    <div class="w-full max-w-md flex justify-center col-span-12 md:col-span-6">
      <form class="bg-white p-6 w-full" @submit.prevent="login()">
        <div class="w-full flex justify-center mb-12">
          <img src="@/assets/logo.svg" height="22" alt="logo">
        </div>
        <p class="text-2xl font-semibold mb-6">Login</p>
        <NotifAlert class="mb-3" />
        <CustomInput id="email" type="email" label="Email" placeholder="eve.holt@reqres.in"
          @handle-change="email = $event" :value="email" required />
        <CustomInput id="password" type="password" label="Password" placeholder="cityslicka"
          @handle-change="password = $event" :value="password" required />
        <CustomButton id="btn-login" text="Login" variant="primary" :disabled="disabled" />
        <p class="text-xs mt-3">Don't have an account? <router-link to="/register" class="link">Register</router-link>
        </p>
      </form>
    </div>

    <div class="hidden md:flex justify-center col-span-6">
      <img class="max-w-xs md:max-w-[400px]" src="@/assets/images/image-login.png" alt="Login Illustration">
    </div>
  </main>
</template>
