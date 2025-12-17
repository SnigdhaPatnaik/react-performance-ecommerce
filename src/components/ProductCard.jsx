import React from "react";
const ProductCard = React.memo(({product, addToCart})=>{
    console.log("Rendering:",product.name);

    return (
        <div style={{ border: "1px solid #ccc", padding: 10, margin:5}}>
            <h4>{product.name}</h4>
            <p>${product.price}</p>
            <button onClick={()=> addToCart(product)}>Add to Cart</button>
        </div>
    )
}
);
export default ProductCard;