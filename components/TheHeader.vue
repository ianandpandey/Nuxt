<template>
  <header class="bg-white border-b border-gray-100">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="w-full py-4 flex items-center justify-between">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <span class="text-xl font-bold text-[#FF385C]">Nuxt Posts</span>
          </NuxtLink>
        </div>
        <div class="flex items-center space-x-6">
          <NuxtLink to="/posts" 
            class="text-base font-medium text-gray-600 hover:text-gray-900">
            All Posts
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template> 