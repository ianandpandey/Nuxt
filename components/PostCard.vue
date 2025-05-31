<!-- components/PostCard.vue -->
<template>
  <NuxtLink :to="`/posts/${post.id}`" class="group block">
    <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] group-hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] transition-all duration-200">
      <div class="space-y-4">
        <!-- Title and Description -->
        <div>
          <h2 class="text-[18px] font-medium text-gray-900 mb-1.5 line-clamp-2 group-hover:text-[#FF385C]">
            {{ post.title }}
          </h2>
          <p class="text-[15px] leading-[1.4] text-gray-500 line-clamp-2">
            {{ post.body }}
          </p>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-1.5">
          <span v-for="tag in post.tags" :key="tag"
            class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-[13px] font-medium text-gray-600 bg-gray-100/80 hover:bg-gray-100">
            #{{ tag }}
          </span>
        </div>

        <!-- Reactions and Read More -->
        <div class="flex items-center justify-between pt-3 border-t border-gray-100">
          <div class="flex items-center gap-3 text-[15px]">
            <div class="flex items-center text-gray-700 transition-transform hover:scale-110" title="Likes">
              <span class="mr-1.5 transform group-hover:scale-110 transition-transform">❤️</span>
              <span class="tabular-nums">{{ post.reactions.likes }}</span>
            </div>
            <span class="text-gray-300">•</span>
            <div class="flex items-center text-gray-700 transition-transform hover:scale-110" title="Dislikes">
              <span class="mr-1.5 transform group-hover:scale-110 transition-transform">👎</span>
              <span class="tabular-nums">{{ post.reactions.dislikes }}</span>
            </div>
          </div>
          <div class="text-[#FF385C] font-medium flex items-center text-[15px] group-hover:gap-1.5 transition-all">
            Read more
            <svg class="w-4 h-4 ml-0.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Reactions {
  likes: number
  dislikes: number
}

interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: Reactions
}

defineProps<{
  post: Post
}>()</script>

<style scoped>
.group:hover .group-hover\:translate-x-0\.5 {
  transform: translateX(2px);
}

.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style> 