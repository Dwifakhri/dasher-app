<script setup>
import { ref, onMounted } from 'vue'
import SideBar from '@/components/SideBar.vue'
import Navbar from '@/components/NavTopBar.vue'
import { rootState } from '@/stores/index'
import NotifAlert from '@/components/NotifAlert.vue'

const rootStore = rootState()
const isOpen = ref(false)
const isLoading = ref(true)

onMounted(async () => {
  try {
    await rootStore.getProfile()
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <div class="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
    <template v-else>
      <SideBar :is-open="isOpen" @toggle-sidebar="isOpen = !isOpen" />
      <div class="relative flex-1 flex flex-col transition-all duration-300 ease-in-out">
        <NotifAlert class="absolute top-4 left-1/2 -translate-x-1/2 z-50 max-w-sm z-100" />
        <Navbar @toggle-sidebar="isOpen = true" />
        <div class="content">
          <slot />
        </div>
      </div>
    </template>
  </div>
</template>

<style></style>
