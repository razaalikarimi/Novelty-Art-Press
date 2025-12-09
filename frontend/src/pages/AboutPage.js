import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

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
