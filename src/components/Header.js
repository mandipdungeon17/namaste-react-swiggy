import { LOGO_URL } from "../utils/constants.js";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  
  const [login, setLogin] = useState("Login");
  
  const getLogin = () => {
    login === "Login" ? setLogin("Logout") : setLogin("Login");
  };

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="No Image" />
      </div>
      <div className="title">
        <h1>Good Food</h1>
      </div>
      <div className="nav-items">
        <ul>
          <li className="nav-items-list"><Link to="/">Home</Link></li>
          <li className="nav-items-list"><Link to="/about">About Us</Link></li>
          <li className="nav-items-list"><Link to="/contact">Contact Us</Link></li>
          <li className="nav-items-list"><Link to="cart">Cart</Link></li>
          <li className="login">
            <button type="submit" className="login-btn" onClick={getLogin}>
              {login}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
