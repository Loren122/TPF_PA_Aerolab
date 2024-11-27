import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const {name} = useContext(UserContext);
  const { points, setPoints } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogoHomeClick = () => {
    navigate("/");
  };

  const handleHistoryClick = () => {
    navigate("/user/history");
  };

  return (
    <header className="header">
      <div className="header-image-container">
        <button className="header-logo">
        <img
          src="../src/assets/aerolab-logo.svg"
          alt="Aerolab"
          onClick={handleLogoHomeClick}
        />
        </button>
        <img
          src="../src/assets/header-x1.png"
          alt="Electronics"
          className="header-image"
        />
        <h1 className="header-title">Electronics</h1>
        <span className="header-user-name">
            {name}
        </span>
        <div className="header-user-info">
          <button className="header-user-name" onClick={handleHistoryClick}>{name}</button>
          <span className="points">
            {points}
            <img
              src="../src/assets/icons/coin.svg"
              alt="Coin icon"
              className="coin-icon"
            />
          </span>
        </div>

      </div>
    </header>
  )
}

export default Header;