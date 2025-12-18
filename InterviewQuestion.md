# 🎯 Interview Q&A Mapping – React Performance Optimized Ecommerce App

This document maps **interview questions → exact code used in this project → short, confident answers**.

Use this as a **last‑day revision sheet** before interviews.

---

## 1️⃣ General Performance

### ❓ How do you improve performance in a React app?

**Answer (short):**

> By preventing unnecessary re-renders using React.memo, optimizing functions with useCallback, caching expensive calculations with useMemo, splitting code with lazy loading, virtualizing large lists, and caching server data with React Query.

📌 **Code reference:**

* `ProductCard.jsx` → React.memo
* `Home.jsx` → useCallback
* `Cart.jsx` → useMemo
* `App.jsx` → React.lazy
* `Home.jsx` → react-window
* React Query setup

---

## 2️⃣ React.memo

### ❓ What is React.memo?

**Answer:**

> React.memo is a higher‑order component that prevents re-rendering of a component if its props haven’t changed.

📌 **Where used:**

* `ProductCard.jsx`
* `Header.jsx`

### ❓ When should you NOT use React.memo?

**Answer:**

> When props change frequently or the component is very small, because memoization itself has a cost.

---

## 3️⃣ useCallback

### ❓ Why do you use useCallback?

**Answer:**

> useCallback prevents recreation of functions on every render, which helps avoid unnecessary re-renders of memoized child components.

📌 **Where used:**

* `Home.jsx → addToCart`

### ❓ Difference between useCallback and normal function?

**Answer:**

> A normal function is recreated on every render, while useCallback returns the same function reference until dependencies change.

---

## 4️⃣ useMemo

### ❓ What problem does useMemo solve?

**Answer:**

> useMemo caches expensive calculations and recalculates them only when dependencies change.

📌 **Where used:**

* `Cart.jsx` → total price calculation

### ❓ Difference between useMemo and useCallback?

**Answer:**

> useMemo memoizes values, while useCallback memoizes functions.

---

## 5️⃣ Code Splitting & Lazy Loading

### ❓ What is code splitting?

**Answer:**

> Code splitting breaks the bundle into smaller chunks so that only required code is loaded initially.

📌 **Where used:**

* `App.jsx → React.lazy + Suspense`

### ❓ Difference between lazy loading and code splitting?

**Answer:**

> Code splitting is the concept, and lazy loading is one way to implement it using React.lazy.

---

## 6️⃣ Virtualization (react-window)

### ❓ What is list virtualization?

**Answer:**

> Virtualization renders only the visible items in a list instead of all items, reducing DOM nodes and improving performance.

📌 **Where used:**

* `Home.jsx → FixedSizeList`

### ❓ Why not use map() for large lists?

**Answer:**

> map renders all items at once, which can cause slow rendering and high memory usage for large datasets.

---

## 7️⃣ React Query

### ❓ Why use React Query instead of fetch?

**Answer:**

> React Query handles caching, deduplication, background refetching, and loading/error states automatically.

📌 **Where used:**

* `Home.jsx → useQuery`

### ❓ What is staleTime?

**Answer:**

> staleTime defines how long fetched data is considered fresh and prevents unnecessary refetches.

---

## 8️⃣ React Query Devtools

### ❓ How do you debug React Query?

**Answer:**

> I use React Query Devtools to inspect cache state, query lifecycle, refetches, and stale status.

📌 **Where used:**

* `index.js → ReactQueryDevtools`

---

## 9️⃣ Keys & Reconciliation

### ❓ Why are keys important in React lists?

**Answer:**

> Keys help React identify which items have changed, improving reconciliation and preventing unnecessary DOM updates.

📌 **Where used:**

* Product IDs in list

---

## 🔟 Re-render Debugging

### ❓ How do you detect unnecessary re-renders?

**Answer:**

> By using console logs, React DevTools, and React Query Devtools to track component renders and data changes.

---

## 1️⃣1️⃣ Real‑World Scenario Question

### ❓ How would you optimize an ecommerce app with 10,000 products?

**Answer:**

> I would use list virtualization for rendering, React Query for caching product data, memoized components to prevent unnecessary re-renders, and lazy loading for routes.

---

## 🎤 15‑Second Final Interview Summary

> This ecommerce app improves performance using React.memo to prevent unnecessary re-renders, useCallback and useMemo for function and calculation optimization, code splitting for faster load time, react-window for list virtualization, and React Query with Devtools for server-state caching and debugging.

---

## ⭐ How to Use This in Interview

* Open project
* Go file by file
* Match each answer with live code

This shows **real implementation, not theory**.

---

### 👩‍💻 Built for React Interviews & Real‑World Performance

---

# 🌍 Real-World Scenario Questions (Extra)

## ❓ 1. Product list is huge and page freezes on load. What do you do?

**Answer:**

> I avoid rendering the entire list at once and use list virtualization so only visible items are mounted in the DOM. This drastically reduces memory usage and improves scroll performance.

**Keywords interviewer likes:** virtualization, DOM nodes, performance

---

## ❓ 2. Cart total recalculates on every click and UI feels laggy

**Answer:**

> I memoize the cart total calculation using useMemo so it recalculates only when cart data changes, not on every re-render.

**Code idea:**
`Cart.jsx → useMemo`

---

## ❓ 3. Header is re-rendering when products change. Is that a problem?

**Answer:**

> Yes, because Header doesn’t depend on product data. I wrap it with React.memo so it re-renders only when relevant props like cart count change.

**Concept tested:** component isolation

---

## ❓ 4. Same API is called multiple times across components

**Answer:**

> I use React Query with a shared queryKey so the data is cached and reused instead of refetched in every component.

**Bonus line:**

> React Query also deduplicates concurrent requests.

---

## ❓ 5. Initial load time is slow even before user interaction

**Answer:**

> I implement code splitting using React.lazy and Suspense so only essential code loads initially, improving time-to-interactive.

---

## ❓ 6. Scrolling works fine on desktop but lags on mobile

**Answer:**

> Mobile devices struggle with large DOM trees, so virtualization is essential. It keeps DOM size constant regardless of list length.

---

## ❓ 7. How do you decide between pagination and virtualization?

**Answer:**

> Pagination is good for SEO and backend-driven data, while virtualization is best for smooth scrolling and client-side performance. Sometimes both are combined.

🔥 **This answer is very impressive**.

---

## ❓ 8. How do you separate server state and UI state?

**Answer:**

> Server state like products is managed with React Query, while UI state like cart count or modal visibility is managed with React state.

---

## ❓ 9. How would you scale this app for production traffic?

**Answer:**

> I would add API pagination, caching with React Query, lazy load routes, virtualize lists, and monitor performance using Lighthouse and DevTools.

---

## ❓ 10. How do you prove your optimization actually worked?

**Answer:**

> I compare render counts using console logs or React DevTools, check DOM size, and measure load time before and after optimization.

---

# 🎤 ONE-LINE CLOSING (VERY STRONG)

> I focus on reducing unnecessary re-renders, minimizing DOM nodes, caching server data, and loading only what the user needs—these are the key principles I apply in real-world React performance optimization.

---

