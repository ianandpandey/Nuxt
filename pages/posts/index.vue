<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Posts</h1>
      
      <!-- Loading State -->
      <div v-if="postsStore.loading" class="flex justify-center items-center min-h-[400px]">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="postsStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline"> {{ postsStore.error }}</span>
      </div>

      <!-- Posts Grid -->
      <div v-else>
        <!-- No Results State -->
        <div v-if="posts.length === 0" class="flex flex-col items-center justify-center bg-white rounded-xl p-8 text-center">
          <div class="w-20 h-20 mb-4">
            <svg class="w-full h-full text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-1">No posts found</h3>
          <p class="text-gray-500 mb-4">
            {{ searchQuery ? `No posts matching "${searchQuery}"` : 'No posts available at the moment' }}
          </p>
          <button v-if="searchQuery"
            @click="clearSearch"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FF385C] hover:bg-[#E31C5F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF385C]">
            Clear search
          </button>
        </div>

        <!-- Posts Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PostCard v-for="post in posts" :key="post.id" :post="post" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts'
import { ref, computed } from 'vue'

const postsStore = usePostsStore()
const posts = computed(() => postsStore.getPosts)
const searchQuery = ref('')

const handleSearch = () => {
  postsStore.setSearchQuery(searchQuery.value)
}

const clearSearch = () => {
  searchQuery.value = ''
  postsStore.setSearchQuery('')
}

onMounted(async () => {
  await postsStore.fetchPosts()
})
</script>

<style scoped>
.prose :deep(p) {
  margin: 0;
}
</style> 