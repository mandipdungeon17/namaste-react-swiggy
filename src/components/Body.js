import Restaurant from "../../restaurantCard.json";
import RestaurantCard from "./RestaurantCard";
import { useEffect, useState, useCallback } from "react";
import { SWIGGY_API, SWIGGY_API_UPDATE } from "../utils/constants";
import Shimmers from "./Shimmers";
import { Link } from "react-router-dom";

// const data = Restaurant?.data.restaurants;
//Both useState and useEffect are hooks whose states once changed, will re-render the component.
//useState is a Hook that allows you to have state variables in functional components.
//useEffect is a Hook that lets you perform side effects in functional components.
const Body = () => {
  // useState is a Hook that allows you to have state variables in functional components.
  // You pass the initial state to this function and it returns a variable with the current state and a function that lets you update it.
  // The only argument to useState is the initial state.
  // the useState function returns an array with two elements. The first element is the current state value and the second element is a function that lets you update it.
  // In this case, the state variable listOfRestaurant is initialized with the value of the data variable.
  // The setListOfRestaurant function is used to update the state variable listOfRestaurant with the filtered list of restaurants.

  /*
    // Commented below code because we are fetching the data from the Swiggy API (LIVE data) in the fetchRestaurants function.
    // and we are not using the static data from the restaurantCard.json file.
    // so, we don't need to initialize the state variable listOfRestaurant with the value of the data variable.
    // instead, we need to initialize the state variable listOfRestaurant with an empty array.

    const [listOfRestaurant, setListOfRestaurant] = useState(data);
    */

  // Whenever state variable is changed, the Virtual DOM will re-render the component(the whole body components) with the updated state.
  // This is the reason why we need to use the useEffect Hook to prevent the component from going into an infinite re-render loop.
  // The useEffect Hook is called after the component has been rendered to the screen.
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filterRestaurant, setFilterRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  
  let searchBoolean = false;

  // getTopRatedRest is a function that filters the restaurant data based on the average rating of the restaurant.
  // The filter() method creates a new array with all the elements that pass the test implemented by the provided function.
  // In this case, we are filtering the restaurant data based on the average rating of the restaurant.
  // the setListOfRestaurant function is used to update the state variable listOfRestaurant with the filtered list of restaurants.
  /*Filtering Logic in getTopRatedRest:
    You are filtering on listOfRestaurant, which means if you click "Top Rated Restaurant" multiple times, the list will keep shrinking and may eventually become empty.
    Fix: Always filter from the original data array, not the already filtered state.*/

  /*
    Commented below code because we are now using live data from the Swiggy API and not using the static data from the restaurantCard.json file.
    const getTopRatedRest = () => {
      const filteredList = data.filter((rest) => rest.info.avgRating > 4.5);
      setListOfRestaurant(filteredList);
    }; */

  const getTopRatedRest = () => {
    const filteredList = listOfRestaurant.filter(
      (rest) => rest.info.avgRating > 4.2
    );
    setFilterRestaurant(filteredList);
  };

  const getSearchedRest = () => {
    const searchedRest = listOfRestaurant.filter((rest) =>
      rest.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    if (searchedRest.length === 0){
      setFilterRestaurant(listOfRestaurant);
      searchBoolean = false;
    }
    else{
      setFilterRestaurant(searchedRest);
      searchBoolean = true;
    }
    setSearchText("");
  };

  const fetchRestaurants = useCallback(async () => {
    setLoading(true);
    const response = await fetch(SWIGGY_API);
    const json = await response.json();
    const restaurant =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setListOfRestaurant(restaurant);
    setFilterRestaurant(restaurant);
    setLoading(false);
  }, []);

  // Fetch more restaurants (infinite scroll)
  const fetchMoreRestaurants = useCallback(async () => {
    if (loading) return;

    setLoading(true);

    const newRestaurants = Restaurant.data.restaurants;

    if (newRestaurants.length > 0) {
      setListOfRestaurant((prev) => [...prev, ...newRestaurants]);
      setFilterRestaurant((prev) => [...prev, ...newRestaurants]);
    }
    setLoading(false);
}, [loading]);

  // The useEffect Hook is called after the component has been rendered to the screen.
  // It accepts two arguments, the first argument is a function and the second argument is an array of dependencies.
  // The function argument is the side-effect you want to perform, in this case, fetching the restaurant data.
  // The array of dependencies argument is used to specify the conditions under which the side-effect should be performed.
  // If the array of dependencies is an empty array, the side-effect will only be performed after the first render.
  // In this case, we want to fetch the restaurant data after the first render, so we pass an empty array as the second argument to the useEffect Hook.
  // If the array of dependencies contains one or more elements, the side-effect will be performed when one of the elements in the array of dependencies changes.
  // Initial fetch
  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  // Infinite scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading && !searchText
      ) {
        fetchMoreRestaurants();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, fetchMoreRestaurants]);

  return (
    <div className="body">
      <div className="search">
        <div className="search-controls">
          <div className="search-input">
            <input
              type="search"
              placeholder="Search Restaurant"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                /*
                  The && is a short-circuit logical AND operator.
                  It works like this:

                  If e.key === "Enter" is true, then getSearchedRest() is called.
                  If e.key === "Enter" is false, nothing happens.
                  This is a common JavaScript shorthand for:

                  So, && here is used to conditionally call getSearchedRest() only when the Enter key is pressed.
                */
                // The keydown event is fired when a key is pressed.
                e.key === "Enter" && getSearchedRest();
              }}
            />
          </div>
          <div className="button-search">
            <button type="submit" onClick={getSearchedRest}>
              Search
            </button>
          </div>
        </div>
        <div className="filter">
          <button type="button" onClick={getTopRatedRest}>
            Top Rated Restaurant
          </button>
        </div>
      </div>
      <div className="res-container">
        {listOfRestaurant.length === 0 ? (
          <Shimmers />
        ) : (
          filterRestaurant.map((rest, index) => (
            <Link
              to={"/restaurant/"+ rest.info.id}
              key={rest.info.id + "-" + index}
            >
              <RestaurantCard
                // key={rest.info.id + index}
                //   restName={rest.info.name}
                //   rating={rest.info.avgRating}
                //   delivery={rest.info.sla.slaString}
                //   cuisines={rest.info.cuisines}
                //   areaName={rest.info.areaName}
                //   image={rest.info.cloudinaryImageId}
                restData={rest.info}
              />
            </Link>
          ))
        )}
        {loading && <div>Loading more restaurants...</div>}
      </div>
    </div>
  );
};

export default Body;
