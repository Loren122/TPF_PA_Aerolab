import { useContext, useState } from "react";
import { redeemProduct } from "../services/api";
import { UserContext } from "../context/UserContext";


export const ProductCard = ({ product, onRedeem }) => {

    const { img, name, category, cost } = product;

    const { points, setPoints } = useContext(UserContext);
    const [isHovered, setIsHovered] = useState(false);
    const [isRedeeming, setIsRedeeming] = useState(false);
    const [error, setError] = useState(null);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleRedeem = async (productId) => {
        try {
            setIsRedeeming(true);
            await redeemProduct(productId);
            setIsRedeeming(false);

            if (onRedeem) {
                onRedeem(productId);
            }
        } catch (error) {
            console.error("Error al actualizar el historial:", error);
            setError("Hubo un problema al procesar tu redención. Inténtalo de nuevo más tarde.");
            setIsRedeeming(false);
        }
    };

    const enoughPoints = points >= cost;

    return (
        <div
            className="product-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {enoughPoints ? (
                <img
                    src={isHovered ? "../src/assets/icons/buy-white.svg" : "../src/assets/icons/buy-blue.svg"}
                    alt="Comprar"
                    className="buy-icon"
                />

            ): (
                <p className="points-needed-message">You need {cost - points}</p>
            )}

            <img src={img.url} alt={name} className="product-image" />
            <p className="product-category">{category}</p>
            <h4>{name}</h4>
            {isHovered && (
                 <div className="product-info">
                    <div className="points-info">
                        <span className="points-cost">{product.cost}</span>
                        <img src="../src/assets/icons/coin.svg" alt="Coin" className="coin-icon" />
                    </div>
                    <button
                    className="redeem-button"
                    onClick={() => handleRedeem(product._id)}
                    disabled={isRedeeming}
                    >
                        {isRedeeming ? 'Redeeming...' : 'Redeem now'}
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </div>
            )}
        </div>
  );
};

export default ProductCard;