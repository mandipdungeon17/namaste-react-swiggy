import { LOGO_URL } from "../utils/constants.js";
import { useState } from "react";

const Header = () => {
  
  const [login, setLogin] = useState("LogIn");
  
  const getLogin = () => {
    login === "LogIn" ? setLogin("LogOut") : setLogin("LogIn");
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
          <li className="nav-items-list">Home</li>
          <li className="nav-items-list">About Us</li>
          <li className="nav-items-list">Contact Us</li>
          <li className="nav-items-list">Cart</li>
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
