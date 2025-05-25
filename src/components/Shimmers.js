/* Shimmers are a popular way to indicate that content is loading on a website or app. 
They are often used in place of actual content while the content is being fetched from a server or database.
In this we created a simple shimmer effect using CSS and React.
*/
// const Shimmers = () => {
//   let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
//     return array.map((r) => (
//       <div className="res-card" key={r}>
//         <div className="img-resCard">
//           <img className="image-card" style={{ backgroundColor : "rgb(238, 234, 234)" }} />
//         </div>
//       </div>
//     ));
// };

// export default Shimmers;

const ShimmerCard = () => (
  <div className="res-card shimmer-card">
    <div className="img-resCard">
      <div className="shimmer-img shimmer"></div>
    </div>
    <div className="shimmer-title shimmer"></div>
    <div className="shimmer-rating shimmer"></div>
    <div className="shimmer-delivery shimmer"></div>
    <div className="shimmer-cuisines shimmer"></div>
    <div className="shimmer-area shimmer"></div>
  </div>
);

const Shimmers = () => {
  return (
    <>
      {Array(12)
        .fill("")
        .map((_, idx) => (
          <ShimmerCard key={idx} />
        ))}
    </>
  );
};

export default Shimmers;