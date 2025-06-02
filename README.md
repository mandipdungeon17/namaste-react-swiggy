## React Fiber Architecture, Diff & Reconciliation Algorithm, and Virtual DOM

### 1. Virtual DOM

- **What is it?**  
  The Virtual DOM is a lightweight JavaScript representation of the actual DOM (Document Object Model).
- **Why use it?**  
  Manipulating the real DOM is slow. React uses the Virtual DOM to optimize updates, making UI changes faster and more efficient.

**Example:**  
Suppose your app renders a list of restaurant cards:
```jsx
<div>
  <div>Restaurant 1</div>
  <div>Restaurant 2</div>
  <div>Restaurant 3</div>
</div>
```
React keeps a virtual copy of this structure in memory.

---

### 2. Diff & Reconciliation Algorithm

- **What is it?**  
  When your app’s state changes (e.g., filtering restaurants), React creates a new Virtual DOM tree.  
  The **Diff Algorithm** compares the new Virtual DOM with the previous one to find out what actually changed.
- **How does it work?**  
  - React checks each node in the tree.
  - If a node has changed, React marks it for update.
  - Only the changed parts are updated in the real DOM.

**Example:**  
You have 7 restaurant cards. After filtering, only 3 cards remain.  
React’s diff algorithm compares the old (7 cards) and new (3 cards) trees, and updates only the necessary DOM nodes.

---

### 3. React Fiber Architecture

- **What is it?**  
  React Fiber (introduced in React 16) is the new reconciliation engine in React.  
  It enables React to break rendering work into small units and spread it out over multiple frames, making the UI more responsive.
- **Why is it important?**  
  - Allows React to pause, abort, or restart work as needed.
  - Improves performance for complex UIs.

**Example:**  
When you click a filter button:
- The app goes from showing 7 restaurant cards to 3.
- React Fiber efficiently updates only the changed cards, not the entire list.
- This keeps the UI fast and smooth, even for large applications.

---

### Visual Summary

- **res-container**: Parent div holding all restaurant cards.
- **Before filter:**  
  `res-container` → 7 ResCards (restaurant cards)
- **After filter (e.g., Top Rated):**  
  `res-container` → 3 filtered ResCards

React Fiber and the reconciliation algorithm ensure only the necessary cards are updated in the DOM, using the Virtual DOM as a reference.

---

**In short:**  
- **Virtual DOM**: Efficient in-memory representation of the UI.
- **Diff & Reconciliation**: Finds and updates only what changed.
- **React Fiber**: Makes updates smooth and efficient, even for big apps.

---

### 4. `useState` Hook

- **What is it?**  
  `useState` is a Hook that allows you to add state variables to functional components. It returns an array with two elements: the current state value and a function to update that state.
- **Why use it?**  
  It enables components to manage and react to data changes. When the state is updated using the provided function, React re-renders the component and its children.
- **Example (from [`src/components/Body.js`](src/components/Body.js)):**  
  ```javascript
  // filepath: src/components/Body.js
  // ...existing code...
  const [filteredData, setFilteredData] = useState(data);
  // ...existing code...
  ```
  Here, `filteredData` holds the list of restaurants to display, and `setFilteredData` is used to update this list, for example, after applying a filter. This causes React to re-render the component with the new filtered data.

  Never use useState inside loops, conditions, or nested functions. Instead, always use it at the top level of your functional component.

---

### 5. `useEffect` Hook

- **What is it?**  
  `useEffect` is a Hook that lets you perform side effects in functional components. Side effects can include data fetching, subscriptions, or manually changing the DOM.
- **Why use it?**  
  It helps manage component lifecycle events like mounting, updating, and unmounting, allowing you to run code at specific times.
- **How does it work?**
  - The function passed to `useEffect` will run after every render by default.
  - You can control when it runs by providing a dependency array as a second argument.
    - An empty array `[]` means the effect runs only once after the initial render (and cleanup on unmount).
    - An array with variables `[var1, var2]` means the effect runs after the initial render and whenever any of `var1` or `var2` change.
    - No dependency array (e.g., `useEffect(() => {...})`) means the effect runs after every render.
- **Example (Conceptual - Data Fetching):**
  ```javascript
  useEffect(() => {
    // Simulate fetching data from an API
    fetchRestaurantData().then(data => {
      setListOfRestaurants(data);
    });
  }, []); // Empty dependency array: runs once after initial render
  ```

---

### 6. `useCallback` Hook

- **What is it?**  
  `useCallback` is a Hook that returns a memoized version of a callback function. This means the function instance will only change if one of its dependencies has changed.
- **Why use it?**  
  It's useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g., components wrapped in `React.memo`). If a parent component re-renders, functions defined within it are recreated. `useCallback` helps maintain the same function reference if its dependencies haven't changed.
- **Example (Conceptual):**
  ```javascript
  // filepath: src/components/Body.js
  // ...existing code...
  // const getTopRatedRest = () => { ... }
  // If getTopRatedRest was passed to a memoized child component,
  // useCallback would be beneficial.

  const getTopRatedRest = useCallback(() => {
    const filteredList = originalData.filter((rest) => rest.info.avgRating > 4.5);
    setFilteredData(filteredList);
  }, [originalData]); // Assuming originalData is a dependency
  // ...existing code...
  ```
  In [`src/components/Body.js`](src/components/Body.js), if `getTopRatedRest` were passed to a child component that was optimized with `React.memo`, using `useCallback` could prevent unnecessary re-renders of that child.

---

### 7. Shimmer UI (Loading Placeholder)

- **What is it?**  
  A Shimmer UI is a visual placeholder, often an animation, that mimics the structure of the content being loaded. It provides a better user experience than a blank screen or a simple loading spinner.
- **Why use it?**  
  - Improves perceived performance by giving users an indication that content is on its way.
  - Reduces layout shifts when content finally loads.
  - Provides a more polished and professional feel to the application.
- **How it's used in this project:**
  - A [`Shimmers.js`](src/components/Shimmers.js) component can be created to display multiple shimmer cards.
  - In [`src/components/Body.js`](src/components/Body.js), you would typically show the `Shimmers` component while `filteredData` is empty or in a loading state (e.g., during an API call). Once data is available, the `Shimmers` component is replaced with the actual `RestaurantCard` components.
  ```javascript
  // Conceptual usage in Body.js
  // if (loading) { // 'loading' would be a state variable
  //   return <Shimmers />;
  // }

  // return (
  //   <div className="res-container">
  //     {filteredData.map((rest) => (
  //       <RestaurantCard key={rest.info.id} restData={rest.info} />
  //     ))}
  //   </div>
  // );
  ```

---
---

## 8. React Router DOM

### What is React Router DOM?

React Router DOM is a popular library used for handling routing in React applications. It allows you to create single-page applications (SPAs) with multiple views or pages without reloading the entire page.

---

### Why use React Router DOM?

- **Single Page Application (SPA)**: Enables navigation between different components without a full page refresh.
- **Dynamic Routing**: Supports dynamic URL parameters, allowing you to render components based on URL data.
- **Nested Routes**: Allows you to define routes within routes, making your application structure clear and maintainable.
- **Error Handling**: Provides built-in mechanisms to handle errors gracefully.

---

### Key Components and Hooks:

- **`BrowserRouter`**: Uses HTML5 history API to keep your UI in sync with the URL.
- **`createBrowserRouter`**: A function to create a router instance with route definitions.
- **`RouterProvider`**: Provides the router instance to your React application.
- **`Route`**: Defines a mapping between a URL path and a React component.
- **`Outlet`**: A placeholder component that renders matched child routes.
- **`Link`**: Provides declarative navigation between routes without page reload.
- **`useParams`**: A hook to access URL parameters.
- **`useRouteError`**: A hook to access error information when a route fails to render.

---

### How React Router DOM is used in this project:

#### 1. Defining Routes (`App.js`):

In your project, routes are defined using `createBrowserRouter`. Each route object specifies:

- `path`: URL path.
- `element`: Component to render when the path matches.
- `children`: Nested routes.
- `errorElement`: Component to render when an error occurs.

```javascript
// filepath: App.js
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/restaurant/:resId", element: <Restaurant /> },
      { path: "/cart", element: <Cart /> }
    ],
    errorElement: <Error />,
  }
]);
```

#### 2. Rendering Router (`App.js`):

The router instance (`appRouter`) is provided to your application using `RouterProvider`:

```javascript
// filepath: App.js
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
```

#### 3. Layout and Nested Routes (`App.js`):

The `AppLayout` component acts as a layout wrapper, rendering common UI elements (like `Header`) and an `Outlet` component, which renders matched child routes:

```javascript
// filepath: App.js
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet /> {/* renders matched child route components */}
    </div>
  );
};
```

#### 4. Dynamic Routing (`Restaurant.js`):

Dynamic routes allow you to capture URL parameters. For example, `/restaurant/:resId` captures the restaurant ID from the URL:

```javascript
// filepath: Restaurant.js
import { useParams } from "react-router-dom";

const Restaurant = () => {
  const { resId } = useParams(); // captures the dynamic URL parameter

  useEffect(() => {
    fetchMenu(resId); // fetch data based on resId
  }, [resId]);

  return (
    <div>
      {/* Render restaurant details */}
    </div>
  );
};
```

#### 5. Navigation (`Body.js`):

Use the `Link` component to navigate between routes without reloading the page:

```javascript
// filepath: Body.js
<Link to={"/restaurant/" + rest.info.id}>
  <RestaurantCard restData={rest.info} />
</Link>
```

#### 6. Error Handling (`Error.js`):

React Router DOM provides the `useRouteError` hook to handle errors gracefully:

```javascript
// filepath: Error.js
import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();

  return (
    <div className="error">
      <h1>Ooops!</h1>
      <h2>{error.status} : {error.statusText}</h2>
      <h3 style={{color:"red"}}>{error.error.message}</h3>
    </div>
  );
};
```

---

### Summary of React Router DOM in this project:

- **Routes**: Defined clearly in `App.js` using `createBrowserRouter`.
- **Nested Routes**: Managed using the `Outlet` component in `AppLayout`.
- **Dynamic Routing**: Implemented using URL parameters (`useParams`).
- **Navigation**: Handled smoothly with `Link` components.
- **Error Handling**: Managed gracefully using `useRouteError`.

This setup provides a robust, scalable, and user-friendly routing solution for your React application.

---