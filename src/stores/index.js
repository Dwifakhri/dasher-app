import api from '@/utils/axiosInstance'
import { defineStore } from 'pinia'

export const rootState = defineStore('rootState', {
  state: () => ({
    profile: null,
    status: '',
    statusMessage: '',
  }),
  actions: {
    setStatus(status, message) {
      this.status = status
      this.statusMessage = message
    },
    resetStatus() {
      this.status = ''
      this.statusMessage = ''
    },
    async getProfile() {
      const exampleUserId = 4
      return await api
        .get(`/users/${exampleUserId}`)
        .then((response) => {
          this.profile = response.data.data
        })
        .catch((error) => {
          this.setStatus('error', error.response.data.error)
        })
    },
  },
})
