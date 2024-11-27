import { useContext,useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import ProductCard from "./ProductCard";
import { UserContext } from "../context/UserContext";

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { points, setPoints } = useContext(UserContext);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts();
            setProducts(Array.isArray(data) ? data : []); // Verificación de array
        };

        loadProducts();
    }, []);

    const handleRedeem = (productId) => {
    const product = products.find((item) => item._id === productId);
    
    if (product && points >= product.cost) {
        setPoints((prevPoints) => {
            const newPoints = prevPoints - product.cost;
            console.log(`Producto ${product.name} canjeado con éxito.`);
            console.log(`Puntos restantes: ${newPoints}`);
            return newPoints;
        });
    } else {
        console.log("No tienes suficientes puntos para canjear este producto.");
    }
};

    return (
        <div className="product-list">
            {products.length > 0 ? (
                products.map((product) => (
                    <ProductCard key={product._id} product={product} onRedeem={handleRedeem} />
                ))
            ) : (
                <p>No hay productos disponibles</p>
            )}
        </div>
    );
}

export default ProductList;