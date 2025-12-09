// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
// const API_ROOT = API_BASE.replace(/\/api$/, ""); // for image URLs

// const HomePage = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [products, setProducts] = useState([]);

//   const [currentProductSlide, setCurrentProductSlide] = useState(0);
//   const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);

//   const PRODUCT_CHUNK_SIZE = 4;
//   const TESTIMONIAL_CHUNK_SIZE = 3;

//   // Load testimonials
//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/testimonials`);
//         setTestimonials(res.data || []);
//       } catch (err) {
//         console.error("Failed to load testimonials", err);
//       }
//     };
//     fetchTestimonials();
//   }, []);

//   // Load products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/products`);
//         setProducts(res.data || []);
//       } catch (err) {
//         console.error("Failed to load products", err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Auto-slide products
//   useEffect(() => {
//     const slidesCount = Math.ceil(products.length / PRODUCT_CHUNK_SIZE);
//     if (slidesCount <= 1) return;

//     const id = setInterval(() => {
//       setCurrentProductSlide((prev) =>
//         prev + 1 >= slidesCount ? 0 : prev + 1
//       );
//     }, 5000);

//     return () => clearInterval(id);
//   }, [products.length]);

//   // Auto-slide testimonials
//   useEffect(() => {
//     const slidesCount = Math.ceil(testimonials.length / TESTIMONIAL_CHUNK_SIZE);
//     if (slidesCount <= 1) return;

//     const id = setInterval(() => {
//       setCurrentTestimonialSlide((prev) =>
//         prev + 1 >= slidesCount ? 0 : prev + 1
//       );
//     }, 6000);

//     return () => clearInterval(id);
//   }, [testimonials.length]);

//   // Make slides (chunks)
//   const productSlides = [];
//   for (let i = 0; i < products.length; i += PRODUCT_CHUNK_SIZE) {
//     productSlides.push(products.slice(i, i + PRODUCT_CHUNK_SIZE));
//   }

//   const testimonialSlides = [];
//   for (let i = 0; i < testimonials.length; i += TESTIMONIAL_CHUNK_SIZE) {
//     testimonialSlides.push(testimonials.slice(i, i + TESTIMONIAL_CHUNK_SIZE));
//   }

//   return (
//     <div className="home-page">
//       {/* HERO SECTION WITH BACKGROUND IMAGE */}
//       <section className="hero hero-bg">
//         <div className="hero-content">
//           <h1>If you can think it, we can print it.</h1>
//           <p>
//             We design and print business cards, flyers, brochures, banners,
//             packaging, and more. Simple process, fast delivery, clean finish.
//           </p>

//           <div className="hero-actions">
//             <Link to="/products" className="btn-primary">
//               View Products
//             </Link>
//             <Link to="/contact" className="btn-primary">
//               Request a Quote
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* KEY SERVICES */}
//       <section className="section">
//         <h2>Our Key Services</h2>
//         <div className="card-grid">
//           <div className="card">
//             <h3>Business Stationery</h3>
//             <p>
//               Visiting cards, letterheads, envelopes, bill books, letter pads,
//               notepads & folders.
//             </p>
//           </div>

//           <div className="card">
//             <h3>Marketing Materials</h3>
//             <p>
//               Flyers, brochures, leaflets, catalogs, posters & promotional
//               prints.
//             </p>
//           </div>

//           <div className="card">
//             <h3>Large Format &amp; Signage</h3>
//             <p>
//               Banners, flex boards, standees, vinyl graphics & display boards.
//             </p>
//           </div>

//           <div className="card">
//             <h3>Event &amp; Invitation Printing</h3>
//             <p>
//               Invitation cards, wedding cards, special event cards & custom
//               designs.
//             </p>
//           </div>

//           <div className="card">
//             <h3>PVC &amp; Identity Solutions</h3>
//             <p>
//               PVC ID cards, membership cards, door ID cards & privilege cards.
//             </p>
//           </div>

//           <div className="card">
//             <h3>School &amp; Office Supplies</h3>
//             <p>
//               School diary, calendars, notebooks & customized printing
//               materials.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* FEATURED PRODUCTS SLIDER (IMAGE ONLY) */}
//       <section className="section section-alt">
//         <div className="featured-header">
//           <h2>Featured Print Products</h2>
//           <p className="small-text">
//             Some of the popular items we regularly print for our clients.
//           </p>
//         </div>

//         {products.length === 0 && (
//           <p className="small-text">No products added yet.</p>
//         )}

//         {products.length > 0 && (
//           <>
//             <div className="product-carousel">
//               {productSlides.map((slide, index) => (
//                 <div
//                   key={index}
//                   className={`product-slide ${
//                     index === currentProductSlide ? "is-active" : ""
//                   }`}
//                 >
//                   {slide.map((p) => (
//                     <div className="card product-card image-only" key={p._id}>
//                       {p.imageUrl && (
//                         <div className="product-card-image-wrapper full">
//                           <img
//                             src={
//                               p.imageUrl.startsWith("http")
//                                 ? p.imageUrl
//                                 : `${API_ROOT}${p.imageUrl}`
//                             }
//                             alt={p.name}
//                             className="product-card-image"
//                           />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>

//             {productSlides.length > 1 && (
//               <div className="product-carousel-dots">
//                 {productSlides.map((_, idx) => (
//                   <button
//                     key={idx}
//                     className={
//                       idx === currentProductSlide ? "is-active" : undefined
//                     }
//                     onClick={() => setCurrentProductSlide(idx)}
//                     aria-label={`Show product slide ${idx + 1}`}
//                   />
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </section>

//       {/* WHY CHOOSE US */}
//       <section className="section section-alt">
//         <h2>Why Choose Us</h2>
//         <div className="feature-grid">
//           <div className="feature-item">
//             <h4>Modern Machines</h4>
//             <p>Offset and digital presses for sharp and consistent output.</p>
//           </div>
//           <div className="feature-item">
//             <h4>On-Time Delivery</h4>
//             <p>Structured workflow and tracking to deliver as committed.</p>
//           </div>
//           <div className="feature-item">
//             <h4>Dedicated Support</h4>
//             <p>
//               Friendly team to help you choose paper, finish and quantities.
//             </p>
//           </div>
//           <div className="feature-item">
//             <h4>File Check</h4>
//             <p>We review your artwork files before printing to avoid errors.</p>
//           </div>
//         </div>
//       </section>

//       {/* HOW IT WORKS */}
//       <section className="section section-how">
//         <h2>How It Works</h2>
//         <div className="steps-wrapper">
//           <ol className="steps">
//             <li>
//               Choose the product you need, select the size, paper type and total
//               quantity for your order.
//             </li>
//             <li>
//               Upload your artwork, or simply tell us your idea and we will
//               create the design for you.
//             </li>
//             <li>
//               We send you a clear preview image and the final price, so you can
//               check and approve it.
//             </li>
//             <li>
//               After your approval, we print your order with care, pack it safely
//               and deliver it to your address.
//             </li>
//           </ol>
//         </div>
//       </section>

//       {/* TESTIMONIALS SLIDER */}
//       <section className="section section-alt">
//         <h2>What Our Clients Say</h2>

//         {testimonials.length === 0 && <p>No testimonials added yet.</p>}

//         {testimonials.length > 0 && (
//           <>
//             <div className="testimonial-carousel">
//               {testimonialSlides.map((slide, index) => (
//                 <div
//                   key={index}
//                   className={`testimonial-slide ${
//                     index === currentTestimonialSlide ? "is-active" : ""
//                   }`}
//                 >
//                   {slide.map((t) => (
//                     <div className="card" key={t._id}>
//                       <p>"{t.message}"</p>
//                       <p className="testimonial-name">
//                         — {t.name} {t.role ? `(${t.role})` : ""}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>

//             {testimonialSlides.length > 1 && (
//               <div className="testimonial-dots">
//                 {testimonialSlides.map((_, idx) => (
//                   <button
//                     key={idx}
//                     className={
//                       idx === currentTestimonialSlide ? "is-active" : undefined
//                     }
//                     onClick={() => setCurrentTestimonialSlide(idx)}
//                     aria-label={`Show testimonial slide ${idx + 1}`}
//                   />
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </section>

//       {/* CTA */}
//       <section className="section cta-section">
//         <h2>Ready to Print Your Next Project?</h2>
//         <p>Share your requirement and we will reply with a quick estimate.</p>
//         <Link to="/contact" className="btn-primary">
//           Get a Custom Quote
//         </Link>
//       </section>
//     </div>
//   );
// };

// export default HomePage;

// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
const API_ROOT = API_BASE.replace(/\/api$/, ""); // for image URLs

const HomePage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [products, setProducts] = useState([]);

  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);

  const PRODUCT_CHUNK_SIZE = 4;
  const TESTIMONIAL_CHUNK_SIZE = 3;

  // Load testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(`${API_BASE}/testimonials`);
        setTestimonials(res.data || []);
      } catch (err) {
        console.error("Failed to load testimonials", err);
      }
    };
    fetchTestimonials();
  }, []);

  // Load products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/products`);
        setProducts(res.data || []);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    };
    fetchProducts();
  }, []);

  // Auto-slide products
  useEffect(() => {
    const slidesCount = Math.ceil(products.length / PRODUCT_CHUNK_SIZE);
    if (slidesCount <= 1) return;

    const id = setInterval(() => {
      setCurrentProductSlide((prev) =>
        prev + 1 >= slidesCount ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(id);
  }, [products.length]);

  // Auto-slide testimonials
  useEffect(() => {
    const slidesCount = Math.ceil(testimonials.length / TESTIMONIAL_CHUNK_SIZE);
    if (slidesCount <= 1) return;

    const id = setInterval(() => {
      setCurrentTestimonialSlide((prev) =>
        prev + 1 >= slidesCount ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(id);
  }, [testimonials.length]);

  // Make slides (chunks)
  const productSlides = [];
  for (let i = 0; i < products.length; i += PRODUCT_CHUNK_SIZE) {
    productSlides.push(products.slice(i, i + PRODUCT_CHUNK_SIZE));
  }

  const testimonialSlides = [];
  for (let i = 0; i < testimonials.length; i += TESTIMONIAL_CHUNK_SIZE) {
    testimonialSlides.push(testimonials.slice(i, i + TESTIMONIAL_CHUNK_SIZE));
  }

  return (
    <div className="home-page">
      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <section className="hero hero-bg">
        <div className="hero-content">
          <h1>If you can think it, we can print it.</h1>
          <p>
            We design and print business cards, flyers, brochures, banners,
            packaging, and more. Simple process, fast delivery, clean finish.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="btn-secondary hero-secondary-btn">
              View Products
            </Link>
            <Link to="/contact" className="btn-secondary hero-secondary-btn">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* KEY SERVICES */}
      <section className="section">
        <h2>Our Key Services</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Business Stationery</h3>
            <p>
              Visiting cards, letterheads, envelopes, bill books, letter pads,
              notepads & folders.
            </p>
          </div>

          <div className="card">
            <h3>Marketing Materials</h3>
            <p>
              Flyers, brochures, leaflets, catalogs, posters & promotional
              prints.
            </p>
          </div>

          <div className="card">
            <h3>Large Format &amp; Signage</h3>
            <p>
              Banners, flex boards, standees, vinyl graphics & display boards.
            </p>
          </div>

          <div className="card">
            <h3>Event &amp; Invitation Printing</h3>
            <p>
              Invitation cards, wedding cards, special event cards & custom
              designs.
            </p>
          </div>

          <div className="card">
            <h3>PVC &amp; Identity Solutions</h3>
            <p>
              PVC ID cards, membership cards, door ID cards & privilege cards.
            </p>
          </div>

          <div className="card">
            <h3>School &amp; Office Supplies</h3>
            <p>
              School diary, calendars, notebooks & customized printing
              materials.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SLIDER (ONLY IMAGES) */}
      <section className="section section-alt">
        <div className="featured-header">
          <h2>Featured Print Products</h2>
          <p className="small-text">
            Some of the popular items we regularly print for our clients.
          </p>
        </div>

        {products.length === 0 && (
          <p className="small-text">No products added yet.</p>
        )}

        {products.length > 0 && (
          <>
            <div className="product-carousel">
              {productSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`product-slide ${
                    index === currentProductSlide ? "is-active" : ""
                  }`}
                >
                  {slide.map((p) => (
                    <div
                      className="card product-card-only-image"
                      key={p._id || p.name}
                    >
                      <div className="product-card-image-wrapper only-image">
                        <img
                          src={
                            p.imageUrl && p.imageUrl.startsWith("http")
                              ? p.imageUrl
                              : `${API_ROOT}${p.imageUrl}`
                          }
                          alt={p.name || "Print product"}
                          className="product-card-image only-image"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {productSlides.length > 1 && (
              <div className="product-carousel-dots">
                {productSlides.map((_, idx) => (
                  <button
                    key={idx}
                    className={
                      idx === currentProductSlide ? "is-active" : undefined
                    }
                    onClick={() => setCurrentProductSlide(idx)}
                    aria-label={`Show product slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* WHY CHOOSE US */}
      <section className="section section-alt">
        <h2>Why Choose Us</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <h4>Modern Machines</h4>
            <p>Offset and digital presses for sharp and consistent output.</p>
          </div>
          <div className="feature-item">
            <h4>On-Time Delivery</h4>
            <p>Structured workflow and tracking to deliver as committed.</p>
          </div>
          <div className="feature-item">
            <h4>Dedicated Support</h4>
            <p>
              Friendly team to help you choose paper, finish and quantities.
            </p>
          </div>
          <div className="feature-item">
            <h4>File Check</h4>
            <p>We review your artwork files before printing to avoid errors.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <h2>How It Works</h2>
        <ol className="steps">
          <li>
            Choose the product you need, select the size, paper type and total
            quantity for your order.
          </li>
          <li>
            Upload your artwork, or simply tell us your idea and we will create
            the design for you.
          </li>
          <li>
            We send you a clear preview image and the final price, so you can
            check and approve it.
          </li>
          <li>
            After your approval, we print your order with care, pack it safely
            and deliver it to your address.
          </li>
        </ol>
      </section>

      {/* TESTIMONIALS SLIDER */}
      <section className="section section-alt">
        <h2>What Our Clients Say</h2>

        {testimonials.length === 0 && <p>No testimonials added yet.</p>}

        {testimonials.length > 0 && (
          <>
            <div className="testimonial-carousel">
              {testimonialSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`testimonial-slide ${
                    index === currentTestimonialSlide ? "is-active" : ""
                  }`}
                >
                  {slide.map((t) => (
                    <div className="card" key={t._id}>
                      <p>"{t.message}"</p>
                      <p className="testimonial-name">
                        — {t.name} {t.role ? `(${t.role})` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {testimonialSlides.length > 1 && (
              <div className="testimonial-dots">
                {testimonialSlides.map((_, idx) => (
                  <button
                    key={idx}
                    className={
                      idx === currentTestimonialSlide ? "is-active" : undefined
                    }
                    onClick={() => setCurrentTestimonialSlide(idx)}
                    aria-label={`Show testimonial slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <h2>Ready to Print Your Next Project?</h2>
        <p>Share your requirement and we will reply with a quick estimate.</p>
        <Link to="/contact" className="btn-primary">
          Get a Custom Quote
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
