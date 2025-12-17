import React, { useCallback, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import Header from "../components/Header";

export default function Home() {
  const [cart, setCart] = useState([]);
  const addToCart = useCallback((product) => {
    setCart((prev) => [...prev, product]);
  }, []);

  return (
    <div>
      <h2>🛒 Ecommerce Store</h2>
      <Header cartCount={cart.length} /> {/* ✅ header added */}
      <Cart cart={cart} />
      <List
        height={500}
        itemCount={products.length}
        itemSize={120}
        width={800} // 🔥 FIXED
      >
        {({ index, style }) => (
          <div style={style}>
            <ProductCard product={products[index]} addToCart={addToCart} />
          </div>
        )}
      </List>
    </div>
  );
}
