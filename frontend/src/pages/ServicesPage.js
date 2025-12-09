// import React from "react";

// const ServicesPage = () => {
//   const services = [
//     {
//       title: "Business Cards & Stationery",
//       description:
//         "Premium business cards, letterheads, envelopes and notepads for daily use.",
//     },
//     {
//       title: "Flyers & Brochures",
//       description:
//         "Single page and multi-page marketing materials for events and campaigns.",
//     },
//     {
//       title: "Books & Catalogs",
//       description:
//         "Perfect bound, saddle stitched and wiro bound books, manuals and catalogs.",
//     },
//     {
//       title: "Banners & Standees",
//       description: "Indoor and outdoor banners, sunboard and roll-up standees.",
//     },
//   ];

//   return (
//     <div className="page-container">
//       <h1>Services</h1>
//       <div className="card-grid">
//         {services.map((s) => (
//           <div className="card" key={s.title}>
//             <h3>{s.title}</h3>
//             <p>{s.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ServicesPage;

import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_BASE}/services-content`);
        setServices(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return <div className="page-container">Loading services...</div>;
  }

  return (
    <div className="page-container">
      <h1>Services</h1>
      <div className="card-grid">
        {services.map((s) => (
          <div className="card" key={s._id}>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
