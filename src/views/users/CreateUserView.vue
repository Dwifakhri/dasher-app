<script setup>
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import api from "@/utils/axiosInstance";
import { rootState } from "@/stores/index";
import { useRouter } from "vue-router";
import { ref } from "vue";

const rootStore = rootState()
const router = useRouter()
const user = ref({
  first_name: "",
  jobTitle: "",
});
const loadingSubmit = ref(false);

const create = () => {
  loadingSubmit.value = true
  api.post("/users/", { name: user.value.first_name, jobTitle: user.value.jobTitle })
    .then(() => {
      rootStore.setStatus('success', "Create user succesfully")
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
      { label: 'Create User', link: '/users/create', active: true }
    ]" />
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold">Create User</h2>
    </div>
    <div class="shadow-md shadow-gray-200">
      <form class="bg-white w-full p-6" @submit.prevent="create()">
        <p class="text-md font-semibold mb-6">User Form</p>
        <CustomInput id="name" type="text" label="Name" placeholder="Enter your name" @handle-change="name = $event"
          :value="user.first_name" required />
        <CustomInput id="jobTitle" type="text" label="Job Title" placeholder="Enter your job title"
          @handle-change="jobTitle = $event" :value="user.jobTitle" required />
        <div class="text-right">
          <CustomButton id="btn-login" :text="loadingSubmit ? 'Loading...' : 'Login'" variant="primary"
            add-class="w-full md:w-64" :disabled="loadingSubmit" />
        </div>
      </form>
    </div>
  </div>
</template>
