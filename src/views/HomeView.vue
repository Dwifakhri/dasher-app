<script setup>
import { rootState } from '@/stores/index'

const rootStore = rootState()
</script>

<template>
  <div class="text-center mt-10">
    <p class="text-md">Hi <strong>{{ rootStore.profile.first_name }}</strong>, Welcome to your dashboard!</p>
    <img src="@/assets/images/welcome.png" class="mx-auto md:max-w-[400px]" alt="welcome" />

  </div>
</template>
