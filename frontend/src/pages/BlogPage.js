// import React from "react";

// const BlogPage = () => {
//   const items = [
//     {
//       title: "Restaurant Menu Printing",
//       desc: "Multi-page menu for a local restaurant with laminated cover.",
//     },
//     {
//       title: "Event Branding Kit",
//       desc: "Backdrops, standees and handouts for a corporate event.",
//     },
//     {
//       title: "Packaging Sleeves",
//       desc: "Custom printed sleeves for a D2C food brand.",
//     },
//   ];

//   return (
//     <div className="page-container">
//       <h1>Portfolio / Work Samples</h1>
//       <div className="card-grid">
//         {items.map((i) => (
//           <div className="card" key={i.title}>
//             <h3>{i.title}</h3>
//             <p>{i.desc}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogPage;

import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

const BlogPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(`${API_BASE}/portfolio`);
        setItems(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  if (loading) {
    return <div className="page-container">Loading portfolio...</div>;
  }

  return (
    <div className="page-container">
      <h1>Portfolio / Work Samples</h1>
      <div className="card-grid">
        {items.map((i) => (
          <div className="card" key={i._id}>
            <h3>{i.title}</h3>
            <p>{i.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
