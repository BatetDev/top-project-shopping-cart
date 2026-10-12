# Lakon Tech

<div align="center">

![Demo](./docs/ShoppingCart.gif)

## A minimalist shopping cart for the modern stoic

**Built with:**

[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![CSS Modules](https://img.shields.io/badge/CSS_Modules-000000?style=for-the-badge&logo=cssmodules&logoColor=white)](https://github.com/css-modules/css-modules)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

</div>

<div align="center">

[Live Demo](https://your-vercel-url.vercel.app) · [View Code](https://github.com/BatetDev/top-project-shopping-cart)

</div>

---

## About

A minimal e-commerce front end built as part of The Odin Project's React curriculum. Products are fetched from [DummyJSON](https://dummyjson.com/), rendered in a responsive grid, and managed through a persistent cart with a slide-in drawer.

The focus was **state management with Context + useReducer**, **CSS Modules**, and a **thorough testing suite** with React Testing Library.

---

## 🛍 Key Features

- **Product catalog** — smartphones and accessories fetched in parallel via `Promise.all`
- **URL-driven filtering** — category filters update `useSearchParams`, so filtered views are shareable and back-button friendly
- **Slide-in cart drawer** — animated, keyboard-dismissable (Esc), closes on navigation and backdrop click
- **Persistent cart** — synced to `localStorage`, seeded with sample items on first visit
- **Responsive** — mobile-first layout, full-screen drawer on phones
- **Accessible** — semantic HTML, ARIA labels on icon-only buttons, focus-aware dialog

---

## 🛠 Built With

- **React 19** — component architecture and hooks
- **React Router 7** — client-side routing with a shared Layout route
- **Context + useReducer** — cart state with named action helpers
- **CSS Modules** — scoped, component-level styling
- **Vite** — dev server and build tool
- **Vitest + React Testing Library** — 32 tests covering reducer logic and user interactions
- **DummyJSON** — product data API

---

## 🧪 Getting Started

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/BatetDev/top-project-shopping-cart.git

# Navigate to project directory
cd top-project-shopping-cart

# Install dependencies
npm install

# Start dev server
npm run dev

# Run the test suite
npm test

# Build for production
npm run build
```

**Environment variable** — create a `.env` at the project root:

---

## Testing

The suite runs with **Vitest** in a jsdom environment:

```bash
npm test
```

**Coverage:**

- **cartReducer** (14 tests) — all actions, stock caps, quantity floors, unknown action fallback
- **ProductCard** (4 tests) — rendering + add-to-cart callback
- **Navbar** (2 tests) — brand, links, live cart badge
- **ShopPage** (4 tests) — loading, success, error, filtering
- **CartItem** (8 tests) — rendering, interactions, disabled states

## Credits

- **Project by:** [The Odin Project](https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart)
- **Product data:** [DummyJSON](https://dummyjson.com/)
- **Icons:** [Lucide](https://lucide.dev/) via [react-icons](https://react-icons.github.io/react-icons/)
- **Fonts:** [Cinzel](https://fonts.google.com/specimen/Cinzel) + [Inter](https://fonts.google.com/specimen/Inter) via [Fontsource](https://fontsource.org/)
- **Hero images:** [Unsplash](https://unsplash.com/)
