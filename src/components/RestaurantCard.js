import { RESTAURANT_IMAGE_URL } from "../utils/constants.js";
const RestaurantCard = (props) => {
  const { restData } = props;

  const { name, cloudinaryImageId, areaName, cuisines, avgRating, sla } =
    restData;

  return (
    <div className="res-card">
      <div className="img-resCard"> 
        <img 
          className="image-card"
          alt="No Image"
          src={
            RESTAURANT_IMAGE_URL +
            cloudinaryImageId
          }
        />
      </div>
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
      <h5 style={{ color: "rgb(99, 96, 96)" }}>{cuisines.join(", ")}</h5>
      <h5 style={{ color: "rgb(99, 96, 96)" }}>{areaName}</h5>
    </div>
  );
};

export default RestaurantCard;