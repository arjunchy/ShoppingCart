# ShopHub - Product Listing Application

A modern, fully-featured product listing web application built with **React** and **TailwindCSS**.

<img width="1875" height="894" alt="image" src="https://github.com/user-attachments/assets/0bbe4164-7d9f-429f-9b59-7dafc6dcf503" />


---

## Features

### Core Features
- **Product Listing:** Fetches and displays products from [DummyJSON API](https://dummyjson.com/products)
- **Real-time Search:** Filter products instantly by name, description, or brand
- **Category Filter:** Dynamic category dropdown loaded from API
- **Infinite Scroll:** Automatically loads more products as you scroll
- **Responsive Design:** Works seamlessly on mobile, tablet, and desktop

### Bonus Features
- **Dark/Light Theme:** Toggle between themes, preference saved to `localStorage`
- **Sorting Options:** Sort by price (low-high, high-low) or rating
- **Shopping Cart:** Full cart functionality using Context API
  - Add/remove items
  - Update quantities
  - Cart drawer with animations
- **Loading Skeletons:** Beautiful shimmer animations during loading states

---

## Tech Stack
- **React 18** (JavaScript)
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **React Router** for routing
- **Context API** for state management (Cart, Theme)
- **DummyJSON API** for product data
- **Lucide React** for icons
- **Shadcn/ui** for UI components

---

## Getting Started

### Prerequisites
- Node.js 18+  
- npm (or yarn)

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd shophub

# Install dependencies
npm install

# Start development server
npm run dev

The app will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ui/               # Shadcn UI components
│   ├── CartDrawer.jsx    # Shopping cart drawer
│   ├── CategoryFilter.jsx
│   ├── FilterBar.jsx
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── ProductGrid.jsx
│   ├── ProductSkeleton.jsx
│   ├── SearchBar.jsx
│   ├── SortDropdown.jsx
│   └── ThemeToggle.jsx
├── context/
│   ├── CartContext.jsx   # Cart state management
│   └── ThemeContext.jsx  # Theme state management
├── hooks/
│   ├── useInfiniteScroll.js
│   └── useProducts.js    # Product fetching & filtering
├── pages/
│   ├── Index.jsx         # Main product listing page
│   └── NotFound.jsx
├── App.jsx
└── main.jsx
```

## API

This app uses the [DummyJSON API](https://dummyjson.com/) for product data:
- Products endpoint: `https://dummyjson.com/products`
- Categories endpoint: `https://dummyjson.com/products/categories`

## Features Overview

### Search
Type in the search bar to filter products in real-time. The search matches against product title, description, and brand.

### Category Filter
Select a category from the dropdown to show only products in that category. Categories are loaded dynamically from the API.

### Sorting
Sort products by:
- Default (API order)
- Price: Low to High
- Price: High to Low
- Highest Rated

### Infinite Scroll
Scroll down to automatically load more products. The app uses Intersection Observer for efficient scroll detection.

### Cart
- Click "Add" on any product to add it to your cart
- Open the cart drawer to view items
- Adjust quantities or remove items
- Cart persists across page refreshes

### Theme
Toggle between light and dark mode using the sun/moon icon. Your preference is saved to localStorage.

## License

MIT
