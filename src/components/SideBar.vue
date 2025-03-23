<script setup>
import { useRoute } from 'vue-router';

const emit = defineEmits(['toggle-sidebar'])
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: false
  }
})

const route = useRoute()

const toggleSidebar = () => {
  emit('toggle-sidebar', !props.isOpen)
};
</script>

<template>
  <aside id="sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen px-6 py-5 bg-white shadow-md shadow-gray-300 transform transition-transform duration-300 ease-in-out"
    :class="{ '-translate-x-full': !isOpen, 'translate-x-0': isOpen, 'md:translate-x-0': true }">
    <RouterLink to="/">
      <img class="ms-3" src="@/assets/logo.svg" alt="logo" height="20">
    </RouterLink>
    <ul class="space-y-3 mt-12 text-sm">
      <li>
        <RouterLink to="/" class="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-200"
          active-class="bg-primary text-white hover:bg-primary">
          <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.4886 0.5L19 7.65698V19.5H13.3114V14.75H5.7114V19.5H0V7.63554L9.4886 0.5Z" fill="currentColor" />
          </svg>
          <span>Dashboard</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/users" class="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-200"
          active-class="bg-primary text-white hover:bg-primary"
          :class="{ 'bg-primary text-white hover:bg-primary': route.path.includes('users') }">
          <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.72953 11.0135C10.5741 11.0135 12.88 8.70753 12.88 5.863C12.88 3.01847 10.5741 0.712524 7.72953 0.712524C4.885 0.712524 2.57906 3.01847 2.57906 5.863C2.57906 8.70753 4.885 11.0135 7.72953 11.0135Z"
              fill="currentColor" />
            <path d="M15.4591 17.4477V21.2874H0V17.4477" fill="currentColor" />
            <path
              d="M15.4591 18.0594V15.2395C15.4591 13.612 14.0221 12.3011 12.2375 12.3011H3.22164C1.437 12.3011 0 13.612 0 15.2395V18.0594"
              fill="currentColor" />
          </svg>
          <span>User Management</span>
        </RouterLink>
      </li>
    </ul>
  </aside>

  <div v-if="isOpen" @click="toggleSidebar"
    class="fixed z-20 inset-0 bg-opacity-50 md:hidden transition-opacity duration-300"></div>
</template>
