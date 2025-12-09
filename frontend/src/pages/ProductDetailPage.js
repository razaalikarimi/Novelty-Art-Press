import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(100);
  const [selectedOption, setSelectedOption] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE}/products/${id}`);
        setProduct(res.data);
        setSelectedOption(res.data.options?.[0] || "");
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      const qtyNum = Number(qty) || 0;
      setPrice(qtyNum * product.pricePerUnit);
    }
  }, [qty, product]);

  const handleQuote = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/quotes`, {
        customerName: name,
        email,
        phone: "",
        product: product._id,
        quantity: qty,
        details: `Option: ${selectedOption}. Message: ${message}`,
        estimatedPrice: price,
      });
      setStatus("Your quote request has been submitted.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong. Please try again.");
    }
  };

  if (!product) return <div className="page-container">Loading...</div>;

  return (
    <div className="page-container">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <div className="product-detail-grid">
        <div>
          <h3>Configure</h3>
          {product.options && product.options.length > 0 && (
            <div className="form-group">
              <label>Finish / Size</label>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                {product.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={qty}
              min={product.minQty}
              max={product.maxQty}
              onChange={(e) => setQty(e.target.value)}
            />
          </div>
          <p className="price-line">
            Live Price: <strong>₹{price}</strong>
          </p>
        </div>
        <div>
          <h3>Request a Quote</h3>
          <form onSubmit={handleQuote} className="simple-form">
            <div className="form-group">
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Comments</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share any special instructions or delivery needs."
              />
            </div>
            <button className="btn-primary" type="submit">
              Submit Quote Request
            </button>
            {status && <p className="form-status">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
