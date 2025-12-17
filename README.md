# 🛒 React Ecommerce App – Step by Step (Performance Optimized)

This guide builds a **simple ecommerce app from scratch** and **adds React performance optimizations step by step**.

👉 You can copy–paste **each step and run it**.
👉 Perfect for **learning + interviews**.

---

## ✅ STEP 0: Project Setup

```bash
npx create-react-app react-performance-ecommerce
cd react-performance-ecommerce
npm install react-window @tanstack/react-query
npm start
```

---

## 📂 Final Folder Structure

```
src/
 ├── components/
 │   ├── ProductCard.jsx
 │   ├── Cart.jsx
 │   └── Header.jsx
 ├── pages/
 │   └── Home.jsx
 ├── data/
 │   └── products.js
 ├── App.jsx
 └── index.js
```

---

## ✅ STEP 1: Entry Point (`index.js`)

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

📌 **Why?** Enables React Query caching.

---

## ✅ STEP 2: Fake Product Data (`data/products.js`)

```js
export const products = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 1000) + 100,
}));
```

📌 Large list to show performance issues.

---

## ✅ STEP 3: App with Code Splitting (`App.jsx`)

```jsx
import React, { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));

export default function App() {
  return (
    <Suspense fallback={<h2>Loading Page...</h2>}>
      <Home />
    </Suspense>
  );
}
```

🎯 **Optimization:** Code Splitting

---

## ✅ STEP 4: Product Card (React.memo) (`components/ProductCard.jsx`)

```jsx
import React from "react";

const ProductCard = React.memo(({ product, addToCart }) => {
  console.log("Rendering:", product.name);

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, margin: 5 }}>
      <h4>{product.name}</h4>
      <p>₹{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
});

export default ProductCard;
```

🎯 **Optimization:** Prevents unnecessary re-renders

---

## ✅ STEP 5: Cart with useMemo (`components/Cart.jsx`)

```jsx
import React, { useMemo } from "react";

export default function Cart({ cart }) {
  const total = useMemo(() => {
    console.log("Calculating total...");
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  return (
    <div>
      <h3>Cart Items: {cart.length}</h3>
      <h3>Total: ₹{total}</h3>
    </div>
  );
}
```

🎯 **Optimization:** Expensive calculation memoization

---

## ✅ STEP 6: Home Page (useCallback + Virtualization) (`pages/Home.jsx`)

```jsx
import React, { useCallback, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";

export default function Home() {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((product) => {
    setCart((prev) => [...prev, product]);
  }, []);

  return (
    <div>
      <h2>🛒 Ecommerce Store</h2>
      <Cart cart={cart} />

      <List
        height={500}
        itemCount={products.length}
        itemSize={120}
        width="100%"
      >
        {({ index, style }) => (
          <div style={style}>
            <ProductCard
              product={products[index]}
              addToCart={addToCart}
            />
          </div>
        )}
      </List>
    </div>
  );
}
```

🎯 **Optimizations:**

* useCallback
* List Virtualization
* Proper keys handled by react-window

---

## ✅ STEP 7: React Query Example (Optional API)

```js
useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
  staleTime: 5 * 60 * 1000
});
```

🎯 **Optimization:** API caching

---

## 🧪 How to Test Performance

1. Open DevTools → Console
2. Click **Add to Cart**
3. Watch logs

✔ Only required components re-render

---
Good catch 👍 — let’s **fix it properly** and also **use Header.jsx to demonstrate performance optimization** (so it’s not just filler).

Below is a **clean, useful, interview-ready `Header.jsx`**.

---

## ✅ `Header.jsx` (WITH React.memo optimization)

### 📁 `src/components/Header.jsx`

```jsx
import React from "react";

const Header = React.memo(({ cartCount }) => {
  console.log("Header rendered");

  return (
    <header style={styles.header}>
      <h2>🛍 React Performance Store</h2>
      <div>🛒 Cart Items: {cartCount}</div>
    </header>
  );
});

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f5f5f5",
    marginBottom: "10px",
  },
};

export default Header;
```

---

## 🔁 Update `Home.jsx` to USE Header

### 📁 `src/pages/Home.jsx` (only relevant changes shown)

```jsx
import Header from "../components/Header";

export default function Home() {
  const [cart, setCart] = useState([]);

  return (
    <div>
      <Header cartCount={cart.length} />   {/* ✅ header added */}
      <Cart cart={cart} />

      <List
        height={500}
        itemCount={products.length}
        itemSize={120}
        width={800}
      >
        {({ index, style }) => (
          <div style={style}>
            <ProductCard
              product={products[index]}
              addToCart={addToCart}
            />
          </div>
        )}
      </List>
    </div>
  );
}
```

---

## 🧠 WHY this Header is IMPORTANT (Interview angle)

### What this demonstrates:

* ✅ `React.memo` prevents re-render unless `cartCount` changes
* ✅ Shows **real performance thinking**
* ✅ Console log proves optimization

### Interview line you can say:

> I wrapped Header with React.memo so it only re-renders when the cart count changes, not when the product list updates.

🔥 This is a **strong real-world explanation**.

---

## ✅ Final Component Usage Overview

| Component    | Optimization |
| ------------ | ------------ |
| Header       | React.memo   |
| ProductCard  | React.memo   |
| Home         | useCallback  |
| Cart         | useMemo      |
| Product List | react-window |

---


## 🎤 Final Interview Explanation (15 sec)

> This ecommerce app optimizes performance using React.memo to prevent unnecessary re-renders, useCallback and useMemo for function and calculation optimization, lazy loading for code splitting, react-window for list virtualization, and React Query for caching—making the app fast and scalable.

---


