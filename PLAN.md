# Shopping Cart Plan

## API

- Provider: DummyJSON
- Products endpoint: https://dummyjson.com/products
- MVP fetch: first 20 products using `?limit=20`
- Product fields needed:
  - id
  - title
  - price
  - description
  - category
  - stock
  - thumbnail
  - images (optional, for product detail stretch goal)
- Category filtering: optional/stretch goal, not required for core
- Stock policy: limit quantity by available stock; products with 0 stock cannot be added
- Fetching strategy:
  - Fetch 2-3 specific categories (e.g., smartphones, laptops) and merge the arrays in JS, OR just fetch one large category.
  - 1 fetch request is enough (DummyJSON has no strict low limit).

## Routes

- `/` : Home / Landing page
- `/shop` : Product grid (phones + accessories merged)
- Optional stretch: category filter tabs/dropdown on `/shop`
- `/cart` : Full cart review page
- `*` : 404 Not Found page
- Layout Route: A wrapper component that renders the `<Navbar />` and an `<Outlet />` for the pages above. This ensures the navbar (and its cart badge) persists across all pages.
- Optional Stretch Goal:
  - `/product/:id` : Product detail page

## Cart State

- State manager: Context + useReducer
- Shape: Array of cart item objects
- Persist to localStorage: yes (so cart survives page refresh)

### Cart item object

- id
- title
- price
- thumbnail
- quantity
- stock

### Derived values (not stored in state)

- Total item count (for navbar badge): sum of all item quantities
- Cart total price: sum of (price × quantity)

### Duplicate handling

- ADD_ITEM checks if product id already exists in cart
- If yes: increase that item's quantity
- If no: add as new cart item

## Reducer Actions

- ADD_ITEM
  - payload: product object and selected quantity
  - behavior:
    - if product id already exists in cart, increase its quantity
    - otherwise add a new cart item
    - clamp quantity to available stock

- REMOVE_ITEM
  - payload: product id
  - behavior: remove the item completely from the cart

- INCREASE_QUANTITY
  - payload: product id
  - behavior: increase quantity by 1, but not above stock

- DECREASE_QUANTITY
  - payload: product id
  - behavior: decrease quantity by 1, minimum quantity is 1

- CLEAR_CART
  - payload: none
  - behavior: empty the cart
  - optional for now, useful for fake checkout/thank-you flow

- SET_QUANTITY
  - optional/stretch
  - payload: product id and new quantity
  - behavior: set quantity directly, clamp between 1 and stock

## Quantity Rules

### Product card

- Default quantity: 1
- Minimum quantity: 1
- Maximum quantity: product stock
- Input accepts positive whole numbers only
- Block empty, negative, zero, decimal, and non-numeric values
- If product stock is 0, disable Add to Cart
- Add to Cart adds the selected quantity
- If product already exists in cart, increase existing quantity instead of duplicating

### Cart page

- Increase quantity by 1, capped at stock
- Decrease quantity by 1, minimum quantity is 1
- Decrement button disabled when quantity is 1
- Separate Remove button removes item completely
- Cart total updates automatically from cart state
- Navbar badge updates automatically from total item quantity

## Component Structure

### Pages (Routes)

- `HomePage`: Simple welcome/landing content.
- `ShopPage`: Fetches data, handles loading/error states, maps over products.
- `CartPage`: Maps over cart state, calculates totals, handles checkout simulation.

### Layout & Navigation

- `Layout`: Wraps the app, renders the `Navbar` and the React Router `<Outlet />`.
- `Navbar`: Contains links to Home, Shop, Cart, and the dynamic cart item count badge.

### Reusable Components

- `ProductCard`: Displays thumbnail, title, price, stock, and the `QuantitySelector`. Contains the "Add to Cart" button.
- `QuantitySelector`: Reusable input with increment/decrement buttons. Used on both `ProductCard` and `CartItem`.
- `CartItem`: Displays cart item details, uses `QuantitySelector`, and includes a "Remove" button.

### State & Logic

- `CartContext`: Provides cart state and `dispatch` function to the app.
- `cartReducer`: Pure function handling ADD, REMOVE, INCREASE, DECREASE, CLEAR.
- `useFetch` (optional custom hook): To handle the DummyJSON fetching logic on the ShopPage.

## Store Theme

- Store concept: Minimalist phone & accessories shop
- Categories to fetch:
  - phones (16 products) — confirm exact API category slug
  - accessories (14 products) — confirm exact API category slug
- Fetching strategy: fetch both categories separately, merge into one product array
- Data quality check needed: verify accessory items look realistic (chargers, cases, audio gear) and thumbnails are visually consistent

## Styling

- Approach: CSS Modules (avoiding utility frameworks like Tailwind as per project goals).
- Global styles: Minimal CSS reset (already applied in `index.css`).
- Layouts: CSS Grid for the shop page product cards to ensure a responsive layout.
- Variables: Use CSS custom properties (variables) in `:root` for colors, spacing, and typography to keep the theme consistent.

## Testing

- Tool: Vitest + React Testing Library (Vite's standard testing setup).
- Focus: User behavior and what the user sees, not implementation details.
- Data Fetching: Mock DummyJSON API responses to test loading, error, and success states.
- Interactions: Use `userEvent` for realistic clicking and typing.
- Strict Rule: Do NOT test React Router directly; only test that the correct content renders.

## Deployment

- Host: Netlify or Vercel (decide when finished).
- SPA Routing Fix: Because React Router handles URLs client-side, refreshing on `/cart` will cause a 404 error on the server.
  - If Netlify: Add a `_redirects` file in `public/` (`/* /index.html 200`).
  - If Vercel: Add a `vercel.json` file at the root with rewrite rules.
