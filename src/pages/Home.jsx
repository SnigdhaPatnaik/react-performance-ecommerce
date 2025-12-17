import React, { useCallback, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { useQuery } from "@tanstack/react-query";

import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import Header from "../components/Header";
import { fetchProducts } from "../api/productsApi";

export default function Home() {
  const [cart, setCart] = useState([]);
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  const addToCart = useCallback((product) => {
    setCart((prev) => [...prev, product]);
  }, []);

  if (isLoading) return <h3>Loading products...</h3>;

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
