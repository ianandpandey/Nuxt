<script setup lang="ts">
const router = useRouter()

onMounted(() => {
  router.push('/posts')
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF385C]"></div>
  </div>
</template> 