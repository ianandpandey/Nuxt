# Nuxt Posts Application

A beautiful and modern posts application built with Nuxt 3, featuring post listing, detailed views, and caching functionality.

## Features

- 📱 Responsive design with Tailwind CSS
- 🏪 State management with Pinia
- 🔄 15-minute cache implementation
- 🎯 Dynamic routing for post details
- 🎨 Beautiful UI with modern design principles
- 📊 Loading and error states
- 🏷️ Tag display for posts
- 👍 Reaction counter

## Tech Stack

- Nuxt 3
- Vue 3
- Pinia
- Tailwind CSS
- TypeScript
- DummyJSON API

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v8 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── components/
│   └── PostCard.vue       # Reusable post card component
├── pages/
│   ├── posts/
│   │   ├── index.vue     # Posts listing page
│   │   └── [id].vue      # Individual post page
├── stores/
│   └── posts.ts          # Pinia store for posts
└── nuxt.config.ts        # Nuxt configuration
```

## Features in Detail

### Posts Listing
- Displays a grid of posts
- Each post shows title, excerpt, tags, and reactions
- Responsive grid layout
- Loading and error states

### Individual Post View
- Detailed view of each post
- Back navigation
- Full content display
- Tags and reactions
- Loading and error states

### Caching
- 15-minute cache implementation
- Reduces API calls
- Improves user experience

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
