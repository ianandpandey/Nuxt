import { defineStore } from 'pinia'
import axios from 'axios'

interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: number
}

interface PostsState {
  posts: Post[]
  loading: boolean
  error: string | null
  lastFetch: number | null
}

export const usePostsStore = defineStore('posts', {
  state: (): PostsState => ({
    posts: [],
    loading: false,
    error: null,
    lastFetch: null
  }),

  getters: {
    getPosts: (state) => state.posts,
    getPostById: (state) => (id: number) => state.posts.find(post => post.id === id)
  },

  actions: {
    async fetchPosts() {
      // Check if cache is still valid (15 minutes)
      const now = Date.now()
      const cacheTime = 15 * 60 * 1000 // 15 minutes in milliseconds
      
      if (this.lastFetch && (now - this.lastFetch) < cacheTime) {
        return
      }

      this.loading = true
      this.error = null

      try {
        const response = await axios.get('https://dummyjson.com/posts')
        this.posts = response.data.posts
        this.lastFetch = now
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An error occurred'
      } finally {
        this.loading = false
      }
    },

    async fetchPostById(id: number) {
      // Check if post exists in cache
      const existingPost = this.getPostById(id)
      if (existingPost) return existingPost

      this.loading = true
      this.error = null

      try {
        const response = await axios.get(`https://dummyjson.com/posts/${id}`)
        const post = response.data
        
        // Add to cache if not already present
        if (!this.posts.some(p => p.id === post.id)) {
          this.posts.push(post)
        }
        
        return post
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An error occurred'
        return null
      } finally {
        this.loading = false
      }
    }
  }
}) 