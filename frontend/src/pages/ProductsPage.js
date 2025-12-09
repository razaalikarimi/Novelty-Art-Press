import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/products`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="page-container">Loading products...</div>;

  return (
    <div className="page-container">
      <h1>Products</h1>
      <div className="card-grid">
        {products.map((p) => (
          <div className="card" key={p._id}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>
              From <strong>₹{p.pricePerUnit}</strong> per unit
            </p>
            <Link to={`/products/${p._id}`} className="btn-secondary">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
