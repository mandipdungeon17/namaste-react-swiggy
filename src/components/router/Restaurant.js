import Shimmers from "../Shimmers";
import { useEffect, useState } from "react";
import { SWIGGY_MENU_API } from "../../utils/constants";
import { useParams } from "react-router-dom";

const Restaurant = () => {
  //Currently, you're initializing restInfo as an empty string (""). It's better practice to initialize it as null or {} to clearly indicate it's an object or data structure.
  const [restInfo, setRestInfo] = useState(null);

  // The useParams hook returns an object of key/value pairs of URL parameters.
  // If the URL is /restaurant/123, then the object returned by the useParams hook will be {resId: 123}.
  // In App.js, we have defined the /restaurant/:resId route with a parameter named resId.
  // You can then access the value of the resId parameter by using the object's key, like this:
  const { resId } = useParams();

  const fetchMenu = async () => {
    try {
      const response = await fetch(SWIGGY_MENU_API + resId);
      const json = await response.json();
      setRestInfo(json?.data?.cards[2]?.card?.card?.info);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  return (
    <div className="rest">
      {restInfo === null ? <Shimmers /> : <h1>{restInfo.name}</h1>}
    </div>
  );
};

export default Restaurant;
