<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="postsStore.loading" class="flex justify-center items-center min-h-[400px]">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="postsStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline"> {{ postsStore.error }}</span>
      </div>

      <!-- Post Content -->
      <div v-else-if="post" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-8">
          <NuxtLink to="/posts" class="text-blue-500 hover:text-blue-700 mb-6 inline-flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Posts
          </NuxtLink>

          <h1 class="text-4xl font-bold text-gray-900 mt-4 mb-6">{{ post.title }}</h1>
          
          <div class="flex flex-wrap gap-2 mb-6">
            <span v-for="tag in post.tags" :key="tag"
              class="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              #{{ tag }}
            </span>
          </div>

          <p class="text-gray-700 text-lg leading-relaxed mb-6">{{ post.body }}</p>

          <div class="flex items-center justify-between border-t pt-6">
            <div class="flex items-center space-x-4">
              <span class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {{ post.reactions }} reactions
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Not Found State -->
      <div v-else class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Post not found!</strong>
        <span class="block sm:inline"> The requested post could not be found.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts'

const route = useRoute()
const postsStore = usePostsStore()

const postId = computed(() => Number(route.params.id))
const post = ref(null)

onMounted(async () => {
  post.value = await postsStore.fetchPostById(postId.value)
})
</script> 