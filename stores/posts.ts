import { defineStore } from 'pinia'

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
  searchQuery: string
}

export const usePostsStore = defineStore('posts', {
  state: (): PostsState => ({
    posts: [],
    loading: false,
    error: null,
    lastFetch: null,
    searchQuery: ''
  }),

  getters: {
    getPosts: (state): Post[] => {
      if (!state.searchQuery) return state.posts

      const searchLower = state.searchQuery.toLowerCase()
      return state.posts.filter(post => {
        return (
          post.title.toLowerCase().includes(searchLower) ||
          post.body.toLowerCase().includes(searchLower) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchLower))
        )
      })
    },
    getPostById: (state) => (id: number) => state.posts.find(post => post.id === id)
  },

  actions: {
    setSearchQuery(query: string) {
      this.searchQuery = query
    },

    async fetchPosts() {
      if (this.loading) return

      this.loading = true
      this.error = null

      try {
        const response = await fetch('https://dummyjson.com/posts?limit=20')
        const data = await response.json()
        
        if (!data.posts || !Array.isArray(data.posts)) {
          throw new Error('Invalid response format')
        }

        this.posts = data.posts
      } catch (error) {
        console.error('Error fetching posts:', error)
        this.error = 'Failed to fetch posts. Please try again later.'
        this.posts = []
      } finally {
        this.loading = false
      }
    },

    async fetchPostById(id: number) {
      if (!id) return null

      try {
        const response = await fetch(`https://dummyjson.com/posts/${id}`)
        const post = await response.json()

        if (!post || !post.id) {
          throw new Error('Post not found')
        }

        // Update in cache if exists
        const index = this.posts.findIndex(p => p.id === id)
        if (index !== -1) {
          this.posts[index] = post
        } else {
          this.posts.push(post)
        }

        return post
      } catch (error) {
        console.error('Error fetching post:', error)
        return null
      }
    }
  }
}) 