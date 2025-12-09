
import React, { useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    // ✅ Name + Phone + Message required
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setErrorMsg("Name, phone and message are required.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_BASE}/contact`, form);
      setSuccessMsg("Thank you. We will contact you soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Contact submit error", err);
      setErrorMsg("Could not send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappNumber = "+911234567890"; // change to your real WhatsApp number
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, "")}`;

  return (
    <div className="page-container contact-page">
      <h1>Contact Us</h1>

      <div className="contact-layout">
        {/* LEFT: FORM */}
        <div className="contact-form-wrapper">
          <form className="simple-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                Email{" "}
                <span style={{ fontSize: "12px", color: "#666" }}>
                  (optional)
                </span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                placeholder="Enter email if you want"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                Phone <span style={{ color: "red" }}>*</span>
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                Message <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Submit"}
            </button>

            {successMsg && (
              <p
                className="small-text success-text"
                style={{ marginTop: "0.75rem" }}
              >
                {successMsg}
              </p>
            )}
            {errorMsg && (
              <p
                className="small-text error-text"
                style={{ marginTop: "0.75rem" }}
              >
                {errorMsg}
              </p>
            )}
          </form>
        </div>

        {/* RIGHT: WHATSAPP + MAP */}
        <div className="contact-side-card">
          <h3>WhatsApp</h3>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            Chat on WhatsApp
          </a>

          <h3 style={{ marginTop: "2rem" }}>Visit Us</h3>
          <p className="small-text">
            Map placeholder - add your Google Map iframe here.
          </p>
          <div className="map-placeholder">Map Placeholder</div>
        </div>
      </div>

      <p className="small-text" style={{ marginTop: "1.5rem" }}>
        Thank you. We will contact you soon.
      </p>
    </div>
  );
};

export default ContactPage;
