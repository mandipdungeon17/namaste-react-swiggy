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
  Here, `filteredData` holds the list of restaurants to display, and `setFilteredData` is used to update this list, for example, after applying a filter.

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
