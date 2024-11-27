import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../services/api";

export const ProductDetails = () => {

  const { id } = useParams();
  const [productDetail, setProductDetail] = useState({});

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        const product = data.find((item) => item._id === id);
        if (product) {
          setProductDetail(product);
        } else {
          console.log("Producto no encontrado");
        }
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };
    loadProducts();
  }, [id]);

  if (!productDetail) {
    return <p>Cargando detalles del producto...</p>;
  }

  return (
    <div className="product-details-container">
      <h1>Detalles del Producto</h1>
      <img src={productDetail.img?.url} alt={productDetail.name} />
      <p>Categoría: {productDetail.category}</p>
      <p>Nombre: {productDetail.name}</p>
      <p>Precio: {productDetail.cost}</p>
    </div>
  );
};

export default ProductDetails;