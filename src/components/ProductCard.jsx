import { useContext, useState } from "react";
import { redeemProduct } from "../services/api";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


export const ProductCard = ({ product, onRedeem }) => {

    const { img, name, category, cost } = product;

    const { points, setPoints } = useContext(UserContext);
    const [isHovered, setIsHovered] = useState(false);
    const [isRedeeming, setIsRedeeming] = useState(false);
    const [error, setError] = useState(null);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const navigate = useNavigate();

    const handleRedeemClick = () => {
        navigate(`/product/${product._id}`)
    }

    const handleRedeem = async (e, productId) => {
        e.stopPropagation();
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
            role="button"
            onClick={handleRedeemClick}
        >
            {enoughPoints ? (
                <img
                    src={isHovered ? "../src/assets/icons/buy-white.svg" : "../src/assets/icons/buy-blue.svg"}
                    alt="Comprar"
                    className="buy-icon"
                />

            ): (
                <p className="points-needed-message">You need {cost - points} <img src="../src/assets/icons/coin.svg" alt="" /></p>
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
                    onClick={(e) => {handleRedeem(e, product._id)}}
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