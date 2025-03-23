<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  perPage: { type: Number, default: 10 },
});

const emit = defineEmits(['pageChange']);

const totalPages = computed(() => Math.ceil(props.totalItems / props.perPage));

const pageNumbers = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  const startPage = Math.max(1, props.currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('pageChange', page);
  }
};
</script>

<template>
  <div class="flex items-center justify-between bg-white py-3">
    <div class="flex flex-1 justify-between sm:hidden">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
        Previous
      </button>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
        Next
      </button>
    </div>

    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-xs text-gray-700">
          Showing
          <span class="font-medium">{{ (currentPage - 1) * perPage + 1 }}</span>
          to
          <span class="font-medium">{{ Math.min(currentPage * perPage, totalItems) }}</span>
          of
          <span class="font-medium">{{ totalItems }}</span>
          results
        </p>
      </div>

      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-xs" aria-label="Pagination">
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed">
            <span class="sr-only">Previous</span>
            <svg class="size-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                clip-rule="evenodd" />
            </svg>
          </button>

          <button v-for="page in pageNumbers" :key="page" @click="goToPage(page)"
            class="relative inline-flex items-center px-4 py-2 text-xs" :class="[
              page === currentPage
                ? 'z-10 bg-primary-600 text-white focus:outline-primary-600'
                : 'text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50'
            ]">
            {{ page }}
          </button>

          <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed">
            <span class="sr-only">Next</span>
            <svg class="size-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>
