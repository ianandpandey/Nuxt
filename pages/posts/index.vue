<template>
  <div>
    <TheHeader />
    <main class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Latest Posts</h1>
            <p class="mt-2 text-gray-600">Discover interesting stories and insights</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search posts..." 
                v-model="searchQuery"
                @input="handleSearch"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#FF385C] focus:border-[#FF385C] sm:text-sm"
              >
            </div>
          </div>
        </div>
        
        <!-- Loading State -->
        <div v-if="postsStore.loading" 
          class="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl shadow-sm p-8">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF385C]"></div>
          <p class="mt-4 text-gray-600">Loading posts...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="postsStore.error" 
          class="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-700">{{ postsStore.error }}</p>
            </div>
          </div>
        </div>

        <!-- Posts Content -->
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
    </main>
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