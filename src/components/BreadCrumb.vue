<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <nav aria-label="breadcrumb" class="w-max mb-10">
    <ol class="flex w-full flex-wrap items-center rounded-md">
      <li v-for="(item, index) in items" :key="index" class="flex items-center">
        <router-link :to="item.link" class="text-sm transition-colors duration-300" :class="{
          'link': !item.active,
          'text-slate-500 font-semibold': item.active
        }">
          {{ item.label }}
        </router-link>
        <span v-if="index < items.length - 1" class="pointer-events-none mx-2 text-slate-800">
          /
        </span>
      </li>
    </ol>
  </nav>
</template>
