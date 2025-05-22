const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src="https://static.vecteezy.com/system/resources/previews/035/767/491/non_2x/food-logo-silhouette-black-color-illustration-vector.jpg"
          alt="No Image"
        />
      </div>
      <div className="tittle">
        <h1>Good Food</h1>
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;