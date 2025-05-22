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
