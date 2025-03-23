<script setup>
import { rootState } from '@/stores/index'
import { ref, onMounted, onUnmounted } from "vue";
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router';

const emit = defineEmits(['toggle-sidebar'])

const openDrawer = () => {
  emit('toggle-sidebar')
}
const rootStore = rootState()
const isDropdownOpen = ref(false);
const dropDownRef = ref(null);
const dropDownRefContent = ref(null);
const router = useRouter()

const handleClickOutside = (event) => {
  if (
    dropDownRef.value &&
    !dropDownRef.value.contains(event.target) &&
    dropDownRefContent.value &&
    !dropDownRefContent.value.contains(event.target)
  ) {
    isDropdownOpen.value = false;
  }
};

const logout = () => {
  Cookies.remove('token')
  router.push('/login')
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

</script>

<template>
  <nav class="bg-white fixed z-10 w-full px-6 py-3 flex justify-end items-center">
    <img @click="openDrawer()" class="block md:hidden me-auto cursor-pointer" width="20"
      src="@/assets/icons/menu-burger.svg" alt="icon-burger">
    <div class="flex">
      <div class="flex flex-col text-sm me-3 gap-y-0">
        <p class="font-semibold">{{ rootStore.profile.first_name }}</p>
        <p class="text-gray-700 text-xs">{{ rootStore.profile.last_name }}</p>
      </div>
      <div class="relative">
        <button ref="dropDownRef" @click="isDropdownOpen = !isDropdownOpen"
          class="flex items-center space-x-2 cursor-pointer">
          <img :src="rootStore.profile.avatar" alt="Profile" class="w-10 h-10 rounded-full">
          <img src="@/assets/icons/angle-small-down.svg" height="20" width="20" alt="arrow down">
        </button>
        <div v-if="isDropdownOpen" ref="dropDownRefContent"
          class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200 text-sm">
          <button @click="logout()"
            class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
