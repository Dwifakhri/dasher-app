  <script setup>
  defineProps({
    type: {
      type: String,
      default: 'submit',
      required: false
    },
    text: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      default: 'primary',
      required: false
    },
    id: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    addClass: {
      type: String,
      default: '',
      required: false
    }
  })
</script>

<template>
  <button :id="id" :type="type" class="disabled:bg-gray-400 active:opacity-50 active:outline-none w-full"
    :class="`bg-${variant} text-white py-2 px-4 rounded-sm hover:bg-${variant}-600 mt-5 ${addClass} cursor-pointer`"
    :disabled="disabled">{{ text
    }}</button>
</template>


<style lang="scss" scoped></style>
