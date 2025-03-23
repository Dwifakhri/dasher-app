<script setup>
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { onMounted, ref } from "vue";
import api from "@/utils/axiosInstance";
import { rootState } from "@/stores/index";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()
const rootStore = rootState()
const user = ref({
  first_name: "",
  last_name: "",
  email: "",
  avatar: "",
  jobTitle: "Lawyer",
});
const id = ref("");
const loading = ref(true);
const loadingSubmit = ref(false);

id.value = route.params.id

onMounted(() => {
  getUserDetail()
})

const getUserDetail = () => {
  loading.value = true;
  api.get(`/users/${id.value}`)
    .then((response) => {
      user.value.first_name = response.data.data.first_name;
      user.value.last_name = response.data.data.last_name;
      user.value.email = response.data.data.email;
      user.value.avatar = response.data.data.avatar;
    }).catch((error) => {
      rootStore.setStatus('error', error.response.data.error)
    }).finally(() => {
      loading.value = false
    })
}

const edit = () => {
  loadingSubmit.value = true
  api.put(`/users/${id.value}`, { name: user.value.first_name, jobTitle: user.value.jobTitle })
    .then(() => {
      rootStore.setStatus('success', "Edit user succesfully")
      router.push('/users')
    }).catch((error) => {
      rootStore.setStatus('error', error.response.data.error)
    }).finally(() => {
      loadingSubmit.value = false
    })
}

</script>

<template>
  <div class="p-6 bg-white mt-3">
    <BreadCrumb :items="[
      { label: 'User Management', link: '/users' },
      { label: 'Edit User', link: '/users/edit', active: true }
    ]" />
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold">Edit User</h2>
    </div>
    <div v-if="loading"
      class="mx-auto my-6 w-6 h-6 border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin">
    </div>
    <template v-else>
      <div class="shadow-md shadow-gray-200 mb-10 p-6">
        <h3 class="text-md font-semibold mb-6">User Detail</h3>
        <div class="flex items-center space-x-4 mb-4">
          <img :src="user.avatar" :alt="user.first_name" class="w-16 h-16 rounded-full border shadow" />
          <div>
            <p class="">{{ user.first_name }} {{ user.last_name }}</p>
            <p class="text-gray-500">{{ user.jobTitle }}</p>
          </div>
        </div>

        <div class="mt-4 space-y-4">
          <div class="bg-white">
            <p class="text-gray-600 text-sm">Email</p>
            <p>{{ user.email }}</p>
          </div>
          <div class="bg-white">
            <p class="text-gray-600 text-sm">Job Title</p>
            <p>{{ user.jobTitle }}</p>
          </div>
        </div>

      </div>
      <div class="shadow-md shadow-gray-200">
        <form class="bg-white w-full p-6" @submit.prevent="edit()">
          <p class="text-md font-semibold mb-6">User Form</p>
          <CustomInput id="name" type="text" label="Name" placeholder="Enter your name" @handle-change="name = $event"
            :value="user.first_name" required />
          <CustomInput id="jobTitle" type="text" label="Job Title" placeholder="Enter your job title"
            @handle-change="jobTitle = $event" :value="user.jobTitle" required />
          <div class="text-right">
            <CustomButton id="btn-login" :text="loadingSubmit ? 'Loading...' : 'Edit'" variant="primary"
              add-class="w-full md:w-64" :disabled="loadingSubmit" />
          </div>
        </form>
      </div>
    </template>
  </div>
</template>
