# 🛒 Simple Ecommerce App (React Performance Optimization Demo)

This mini **ecommerce app** is designed **only to demonstrate React performance optimization techniques** that interviewers usually ask about.

We will cover:

1. React.memo
2. useCallback
3. useMemo
4. Code Splitting (lazy & Suspense)
5. List Virtualization (react-window)
6. Proper key usage
7. Avoid unnecessary re-renders
8. React Query caching (bonus)

---

## 🗂️ Folder Structure

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

## 📦 Fake Product Data (`products.js`)

```js
export const products = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 1000)
}));
```

---

## 🧠 1. `React.memo` – Prevent Unnecessary Re-renders

### ProductCard.jsx

```jsx
import React from "react";

const ProductCard = React.memo(({ product, addToCart }) => {
  console.log("Rendered:", product.name);

  return (
    <div className="card">
      <h4>{product.name}</h4>
      <p>₹{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
});

export default ProductCard;
```

👉 **Interview line:**

> React.memo avoids re-rendering child components if props don’t change.

---

## 🔁 2. `useCallback` – Stable Function Reference

### Home.jsx

```jsx
import React, { useCallback, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((product) => {
    setCart((prev) => [...prev, product]);
  }, []);

  return (
    <div>
      {products.slice(0, 20).map((p) => (
        <ProductCard key={p.id} product={p} addToCart={addToCart} />
      ))}
    </div>
  );
}
```

👉 **Interview line:**

> useCallback prevents child components from re-rendering due to new function references.

---

## 🧮 3. `useMemo` – Expensive Calculation Optimization

### Cart.jsx

```jsx
import React, { useMemo } from "react";

export default function Cart({ cart }) {
  const total = useMemo(() => {
    console.log("Calculating total...");
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  return <h3>Total: ₹{total}</h3>;
}
```

👉 **Interview line:**

> useMemo caches expensive calculations and recalculates only when dependencies change.

---

## 📦 4. Code Splitting (Lazy Loading)

### App.jsx

```jsx
import React, { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));

export default function App() {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Home />
    </Suspense>
  );
}
```

👉 **Interview line:**

> Code splitting loads components only when needed, reducing initial bundle size.

---

## 🚀 5. List Virtualization (Huge Performance Boost)

### Home.jsx (replace mapping)

```jsx
import { FixedSizeList as List } from "react-window";

<List
  height={600}
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
```

👉 **Interview line:**

> Virtualization renders only visible items instead of thousands of DOM nodes.

---

## 🔑 6. Proper `key` Usage

```jsx
<ProductCard key={product.id} />
```

👉 Prevents DOM re-creation and improves reconciliation.

---

## 🚫 7. Avoid Inline Functions & Objects

❌ Bad

```jsx
<button onClick={() => addToCart(p)} />
```

✅ Good (memoized)

```jsx
const handleAdd = useCallback(() => addToCart(p), [p]);
```

---

## ⚡ 8. React Query Caching (Bonus)

```js
useQuery({
  queryKey: ["products"],
  queryFn: fetchProducts,
  staleTime: 5 * 60 * 1000
});
```

👉 Avoids repeated API calls and improves perceived performance.

---

## 🎤 15-Second Interview Summary

> This ecommerce app uses React.memo to avoid unnecessary re-renders, useCallback and useMemo to optimize functions and calculations, lazy loading for code splitting, react-window for list virtualization, proper keys for reconciliation, and React Query for caching—all improving performance and user experience.

---
