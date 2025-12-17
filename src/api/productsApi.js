import { products } from "../data/products";
export const fetchProducts = async () => {
    // simulate network delay
    await new Promise( (res) => setTimeout( res, 500));
    return products;
}