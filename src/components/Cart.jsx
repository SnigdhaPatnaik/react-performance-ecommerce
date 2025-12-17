import React, {useMemo} from "react";

export default function Cart({ cart }){

    const total = useMemo(()=> {
        console.log("Calculating total...");
        return cart.reduce((sum,item) => sum + item.price , 0);
    },[cart]);

    return (
        <div>
            <h3>Cart Items: {cart.length}</h3>
            <h3>Total: ${total}</h3>
        </div>
    );
}