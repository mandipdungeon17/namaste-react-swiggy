export const LOGO_URL =
  "https://static.vecteezy.com/system/resources/previews/035/767/491/non_2x/food-logo-silhouette-black-color-illustration-vector.jpg";

export const RESTAURANT_IMAGE_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const SWIGGY_API =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9468217&lng=77.6813992&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

  
export const SWIGGY_API_UPDATE =
  "https://www.swiggy.com/dapi/restaurants/list/update";

export const SWIGGY_MENU_API =
  "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9468217&lng=77.6813992&restaurantId=";

  // export const SWIGGY_API =
  //   "http://localhost:5000/api/restaurants?lat=12.9468217&lng=77.6813992";

  //Below API is used to update the restaurant data during the infinite scroll.
  //But this API is not working. It is not returning the next set of restaurant data. Because of this, we are using the static data from the restaurantCard.json file.
  //It is not working because this API is giving CORS error. 
  //I tried to fix the CORS error by adding the below code in the server.js file. But it is not working.
  // export const SWIGGY_API_UPDATE =
  //   "http://localhost:5000/api/restaurants/update";