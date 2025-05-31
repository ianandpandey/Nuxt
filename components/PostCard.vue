<!-- components/PostCard.vue -->
<template>
  <NuxtLink :to="`/posts/${post.id}`" class="block">
    <div class="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div class="p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">{{ post.title }}</h2>
        <p class="text-gray-600 mb-4 line-clamp-3">{{ post.body }}</p>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {{ post.reactions }} reactions
            </span>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in post.tags" :key="tag"
              class="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: number
}

defineProps<{
  post: Post
}>()</script> 