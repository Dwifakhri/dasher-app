<script setup>
const emits = defineEmits(['handle-change'])

defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  }
})

const handleChange = (event) => {
  const target = event.target;
  emits('handle-change', target.value);
};
</script>

<template>
  <div class="mb-4">
    <label :for="id" class="flex items-center text-sm text-gray-500 font-semibold mb-3">
      <span>{{ label }}</span>
    </label>
    <div class="mt-2">
      <input :id="id" :name="id" :type="type" :placeholder="placeholder" :value="value" @input="handleChange($event)"
        :required="required"
        class="block w-full border border-gray-300 rounded-sm bg-white px-3 py-2 text-base text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-200 sm:text-sm" />
    </div>
  </div>
</template>
