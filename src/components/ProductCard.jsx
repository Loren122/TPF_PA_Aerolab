import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { updateUserHistory } from "../services/api";


export const ProductCard = ({ product, onRedeem }) => {

    const { img, name, category, cost } = product;

    const { points, setPoints } = useContext(UserContext);
    const [isHovered, setIsHovered] = useState(false);
    const [isRedeeming, setIsRedeeming] = useState(false);
    const [error, setError] = useState(null);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <div
            className="product-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img
                src={isHovered ? "../src/assets/icons/buy-white.svg" : "../src/assets/icons/buy-blue.svg"}
                alt="Comprar"
                className="buy-icon"
            />
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
                    onClick={() => onRedeem(product._id)}
                    >
                        Redeem now
                    </button>
                </div>
            )}
        </div>
  );
};

export default ProductCard;