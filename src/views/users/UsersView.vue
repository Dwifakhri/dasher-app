<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import PaginationTable from "@/components/PaginationTable.vue";
import api from "@/utils/axiosInstance";
import { rootState } from "@/stores/index";

const rootStore = rootState()
const router = useRouter();
const loading = ref(false);
const currentPage = ref(1);
const perPage = ref(3);
const totalUsers = ref(0);
const users = ref([]);

onMounted(() => {
  getUsers()
})

const getUsers = () => {
  loading.value = true;
  api.get("/users", {
    params: {
      page: currentPage.value,
      per_page: perPage.value,
    },
  }).then((response) => {
    users.value = response.data.data;
    totalUsers.value = response.data.total;
  }).catch((error) => {
    rootStore.setStatus('error', error.response.data.error)
  }).finally(() => {
    loading.value = false
  })
}

watch(currentPage, () => {
  getUsers()
})
</script>

<template>
  <div class="p-6 bg-white mt-3">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold">User List</h2>
      <button @click="router.push('/users/create')"
        class="border border-primary px-12 py-3 rounded text-primary text-xs hover:bg-primary hover:text-white cursor-pointer">
        Create
      </button>
    </div>
    <div class="overflow-x-auto rounded-md shadow-md shadow-gray-200 text-xs">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="font-semibold p-4 text-left">No</th>
            <th class="font-semibold p-4 text-left">First Name</th>
            <th class="font-semibold p-4 text-left">Last Name</th>
            <th class="font-semibold p-4 text-left">Email</th>
            <th class="font-semibold p-4 text-left">Avatar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="5" class="text-center p-4">
              <div class="mx-auto w-6 h-6 border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin">
              </div>
            </td>
          </tr>
          <template v-else>
            <tr v-for="(user, index) in users" :key="user.id"
              class="hover:bg-gray-100 border border-gray-200 cursor-pointer"
              @click.prevent="router.replace(`/users/edit/${user.id}`)">
              <td class="px-4 py-5">{{ +currentPage * perPage - perPage + index + 1 }}.</td>
              <td class="px-4 py-5">{{ user.first_name }}</td>
              <td class="px-4 py-5">{{ user.last_name }}</td>
              <td class="px-4 py-5">{{ user.email }}</td>
              <td class="px-4 py-5">
                <img :src="user.avatar" :alt="user.name" class="w-10 h-10 rounded-full" />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="mt-4">
      <PaginationTable :currentPage="currentPage" :totalItems="totalUsers" :perPage="perPage"
        @pageChange="currentPage = $event" />
    </div>
  </div>
</template>
