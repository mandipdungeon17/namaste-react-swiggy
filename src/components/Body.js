import Restaurant from "../../restaurantCard.json";
import RestaurantCard from "./RestaurantCard";
import { useState } from "react";

const data = Restaurant?.data.restaurants;

const Body = () => {
    // useState is a Hook that allows you to have state variables in functional components.
    // You pass the initial state to this function and it returns a variable with the current state and a function that lets you update it.
    // The only argument to useState is the initial state.
    // the useState function returns an array with two elements. The first element is the current state value and the second element is a function that lets you update it.
    // In this case, the state variable filteredData is initialized with the value of the data variable.
    // The setFilteredData function is used to update the state variable filteredData with the filtered list of restaurants.
    const [filteredData, setFilteredData] = useState(data);

    // getTopRatedRest is a function that filters the restaurant data based on the average rating of the restaurant.
    // The filter() method creates a new array with all the elements that pass the test implemented by the provided function.
    // In this case, we are filtering the restaurant data based on the average rating of the restaurant.
    // the setFilteredData function is used to update the state variable filteredData with the filtered list of restaurants.
    const getTopRatedRest = () => {
      const filteredList = filteredData.filter((rest) => rest.info.avgRating > 4.5);
      setFilteredData(filteredList);
    };

  return (
    <div className="body">
      <div className="search">
        <div className="search-input">
          <input type="search" placeholder="Search Restaurant" />
        </div>
        <div className="button-search">
          <button type="submit">Search</button>
        </div>
        <div className="filter">
          <button className="filter-btn" onClick={getTopRatedRest}>
            Top Rated Restaurant
          </button>
        </div>
      </div>
      <div className="res-container">
        {filteredData.map((rest) => (
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

export default Body;
