# 🛒 Product Explorer — Module 23 Assignment

A simple **Product Explorer** application built with **React.js + Vite**.
Products are fetched live from the **Fake Store API**, with category
filtering, debounced search, and basic performance optimization.

---

## ✨ Features

- **Dynamic Navbar** — Logo, Home, Products links + Search box (consistent across the app)
- **Product Listing** — Image, Title, Price & Category for each product
- **Category Filter** — Filter by category, "All" shows everything
- **Debounced Search** — Search by title with a 500ms debounce delay
- **React Lifecycle** — `useEffect()` for data fetching + cleanup on unmount
- **Performance Optimization** — `useMemo()` used for the filtering logic
- **Loading & Error Handling** — Loading spinner message + friendly error message

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | UI library |
| Vite | Build tool / dev server |
| Plain CSS | Styling |
| Fake Store API | Product data (https://fakestoreapi.com) |

---

## 📁 Project Structure

```
product-explorer/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Navbar.jsx
    │   └── ProductCard.jsx
    ├── pages/
    │   ├── Home.jsx
    │   └── Products.jsx
    ├── hooks/
    │   └── useDebounce.js
    └── utils/
        └── api.js
```

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## ⚡ Performance Optimization (Task 7 Explanation)

I used **`useMemo()`** in `src/pages/Products.jsx` to memoize the product
filtering logic. This ensures the category + search filtering only re-runs
when `products`, `selectedCategory`, or the debounced search text actually
changes — instead of re-filtering the whole list on every single re-render.

Additionally, the search input uses a **custom `useDebounce` hook**
(`src/hooks/useDebounce.js`), so filtering waits 500ms after the user stops
typing instead of running on every keystroke.

---

## 🌐 API Reference

- All products: `https://fakestoreapi.com/products`
- Categories: `https://fakestoreapi.com/products/categories`
