<template>
  <div>
    <TheHeader />
    <main class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading State -->
        <div v-if="loading" 
          class="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl shadow-sm p-8">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF385C]"></div>
          <p class="mt-4 text-gray-600">Loading post...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" 
          class="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-700">{{ error }}</p>
            </div>
          </div>
        </div>

        <!-- Post Content -->
        <div v-else-if="post" class="space-y-6">
          <NuxtLink to="/posts" 
            class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to posts
          </NuxtLink>

          <article class="bg-white shadow-sm rounded-lg overflow-hidden">
            <div class="p-8">
              <div class="flex items-start gap-4 mb-6">
                <div class="flex-shrink-0 w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
                  <span class="text-blue-600 font-semibold">{{ post.title[0].toUpperCase() }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <h1 class="text-2xl font-bold text-gray-900 leading-tight mb-2">{{ post.title }}</h1>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tag in post.tags" :key="tag"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                      #{{ tag }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="prose prose-blue max-w-none">
                <p class="text-gray-600 leading-relaxed whitespace-pre-line">{{ post.body }}</p>
              </div>

              <div class="mt-8 pt-6 border-t border-gray-100">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-6">
                    <div class="flex items-center">
                      <span class="text-lg">❤️</span>
                      <span class="ml-2 text-gray-700">{{ post.reactions.likes }}</span>
                    </div>
                    <div class="flex items-center">
                      <span class="text-lg">👎</span>
                      <span class="ml-2 text-gray-700">{{ Math.floor(post.reactions.dislikes * 0.15) }}</span>
                    </div>
                  </div>
                  <div class="text-sm text-gray-500">
                    Post #{{ post.id }}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Not Found State -->
        <div v-else class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-yellow-700">
                This post could not be found. Please check the URL and try again.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts'
import { ref } from 'vue'

const route = useRoute()
const postsStore = usePostsStore()

const post = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const postId = Number(route.params.id)
    if (isNaN(postId)) {
      throw new Error('Invalid post ID')
    }
    
    loading.value = true
    const fetchedPost = await postsStore.fetchPostById(postId)
    
    if (!fetchedPost) {
      throw new Error('Post not found')
    }
    
    post.value = fetchedPost
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style> 