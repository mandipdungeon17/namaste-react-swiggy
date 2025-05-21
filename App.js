import ReactDOM from 'react-dom/client';
import restaurant from './restaurantCard.json';

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
        <div className='tittle'>
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

const data = restaurant?.data.restaurants;

const RestaurantCard = (props) => {
    const {restData} = props;

    const {
        name,
        cloudinaryImageId,
        areaName,
        cuisines,
        avgRating,
        sla
    } = restData;

    return (
      <div className="res-card">
        <img
          className="image-card"
          alt="No Image"
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
            cloudinaryImageId
          }
        />
        {/* <h3>{props.restName}</h3>
        <h4>{props.rating}</h4>
        <h4>{props.delivery}</h4>
        <h5 style={{ color: "rgb(99, 96, 96)" }}>
          {props.cuisines.join(", ")}
        </h5>
        <h5 style={{ color: "rgb(99, 96, 96)" }}>{props.areaName}</h5> */}
        <h3>{name}</h3>
        <h4>{avgRating}</h4>
        <h4>{sla.slaString}</h4>
        <h5 style={{ color: "rgb(99, 96, 96)" }}>
          {cuisines.join(", ")}
        </h5>
        <h5 style={{ color: "rgb(99, 96, 96)" }}>{areaName}</h5>
      </div>
    );
}

const Body = () => {
    return (
      <div className="body">
        <div className="search">
          <div className="search-input">
            <input type="search" placeholder="Search Restaurant" />
          </div>
          <div className="button-search">
            <button type="submit">Search</button>
          </div>
        </div>
        <div className="res-container">
          {data.map((rest) => (
            <RestaurantCard
              key={rest.info.id}
              //   restName={rest.info.name}
              //   rating={rest.info.avgRating}
              //   delivery={rest.info.sla.slaString}
              //   cuisines={rest.info.cuisines}
              //   areaName={rest.info.areaName}
              //   image={rest.info.cloudinaryImageId}
              restData={rest.info}
            />
          ))}
        </div>
      </div>
    );
};

const AppLayout = () =>{
    return (
    <div className="app">
        <Header/>
        <Body/>
    </div>);
};


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout/>);