// import React from "react";

// const AboutPage = () => {
//   return (
//     <div className="page-container">
//       <h1>About ArtPress</h1>
//       <p>
//         ArtPress is a print and design partner for brands, agencies and small
//         businesses. We combine modern printing machines with a detail-focused
//         team to deliver clean, consistent results.
//       </p>
//       <p>
//         Our team has experience across offset, digital and large format
//         printing. We understand paper, ink, color profiles and finishing so you
//         do not have to worry about the technical side.
//       </p>
//       <p>
//         Whether you need a small batch of business cards or a full campaign
//         with flyers, standees and packaging, we can support you from file
//         preparation to final delivery.
//       </p>
//     </div>
//   );
// };

// export default AboutPage;

import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

const AboutPage = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get(`${API_BASE}/about`);
        setAbout(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) {
    return <div className="page-container">Loading...</div>;
  }

  if (!about) {
    return <div className="page-container">No about info found.</div>;
  }

  return (
    <div className="page-container">
      <h1>{about.heading || "About Novelty Art Press"}</h1>
      {about.section1 && <p>{about.section1}</p>}
      {about.section2 && <p>{about.section2}</p>}
      {about.section3 && <p>{about.section3}</p>}
    </div>
  );
};

export default AboutPage;
