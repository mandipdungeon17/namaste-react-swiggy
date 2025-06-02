import ReactDOM from 'react-dom/client';
import Header from './src/components/Header';
import Body from './src/components/Body';
import About from './src/components/router/About';
import Restaurant from "./src/components/router/Restaurant";
import Contact from './src/components/router/Contact';
import Error from './src/components/router/Error';
import Cart from "./src/components/router/Cart";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

const AppLayout = () =>{
    return (
    <div className="app">
        <Header/>
        {/* Outlet is a special component provided by the react-router-dom package. 
        It is used to render the child components of the current route. */}
        <Outlet/>
    </div>);
};

// The createBrowserRouter function is used to create a router instance.
// It takes an array of route objects as an argument.
// Each route object has the following properties:
// path: The path of the route.
// element: The component to render when the route is matched.
// children: An array of route objects that represent the child routes of the current route.
// errorElement: The component to render when there is an error in the route.
// The createBrowserRouter function returns a router instance that can be used to render the router in the root component of the application.
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/restaurant/:resId",
        element: <Restaurant />
      },
      {
        path: "/cart",
        element: <Cart/>
      }
    ],
    errorElement: <Error />,
  },
  /*{
      path: "/about",
      element: <About/>
  },
  {
      path: "/contact",
      element: <Contact/>
  } */
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
// The RouterProvider component is used to provide the router instance to the child components of the root component.
// It takes a router prop that represents the router instance to provide.
// The router instance is used to render the router in the root component of the application.
root.render(<RouterProvider router={appRouter} />);    


/*
How the above logic is working?
The createRoot function is used to create a root instance. 
It takes a container element as an argument. 
The root instance has a render method that is used to render the root component of the application.
In the above example, we are rendering the RouterProvider component as the root component of the application.
The RouterProvider component takes a router prop that represents the router instance to provide.
The appRouter instance is created using the createBrowserRouter function. 
It takes an array of route objects as an argument. Each route object represents a route in the application.
The parent route AppLayout has a path of “/” and an element property whose value is the AppLayout component.
The AppLayout component renders the Header component and the Outlet component.
The Outlet component is a special component provided by the react-router-dom package. It is used to render the child components of the current route.
The AppLayout component also has a children property that is an array of route objects representing the child routes of the AppLayout route.
Each child route object has a path property representing the path of the route and an element property representing the component to render when the route is matched.
*/