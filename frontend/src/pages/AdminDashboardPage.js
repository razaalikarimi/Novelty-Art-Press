// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../components/AuthContext";

// const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

// const AdminDashboardPage = () => {
//   const { token, user } = useAuth();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("overview");
//   const [users, setUsers] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [quotes, setQuotes] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [settings, setSettings] = useState(null);
//   const [logs, setLogs] = useState([]);

//   const authHeader = { headers: { Authorization: `Bearer ${token}` } };

//   useEffect(() => {
//     if (!token) {
//       navigate("/admin/login");
//     }
//   }, [token, navigate]);

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const [u, c, p, q, cm, s, l] = await Promise.all([
//           axios.get(`${API_BASE}/users`, authHeader),
//           axios.get(`${API_BASE}/categories`),
//           axios.get(`${API_BASE}/products`),
//           axios.get(`${API_BASE}/quotes`, authHeader),
//           axios.get(`${API_BASE}/contact`, authHeader),
//           axios.get(`${API_BASE}/settings`),
//           axios.get(`${API_BASE}/logs`, authHeader).catch(() => ({ data: [] })),
//         ]);
//         setUsers(u.data);
//         setCategories(c.data);
//         setProducts(p.data);
//         setQuotes(q.data);
//         setContacts(cm.data);
//         setSettings(s.data);
//         setLogs(l.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     if (token) {
//       fetchAll();
//     }
//   }, [token]);

//   if (!user) return null;

//   const isAdmin = user.role === "admin";

//   return (
//     <div className="page-container admin-page">
//       <h1>Admin Dashboard</h1>
//       <p className="small-text">
//         Logged in as {user.name} ({user.role})
//       </p>
//       <div className="admin-layout">
//         <aside className="admin-sidebar">
//           <button onClick={() => setActiveTab("overview")}>Overview</button>
//           {isAdmin && <button onClick={() => setActiveTab("users")}>Users</button>}
//           <button onClick={() => setActiveTab("categories")}>Categories</button>
//           <button onClick={() => setActiveTab("products")}>Products</button>
//           <button onClick={() => setActiveTab("quotes")}>Quotes</button>
//           <button onClick={() => setActiveTab("contacts")}>Contact Messages</button>
//           {isAdmin && <button onClick={() => setActiveTab("settings")}>Settings</button>}
//           {isAdmin && <button onClick={() => setActiveTab("logs")}>Logs</button>}
//         </aside>
//         <section className="admin-content">
//           {activeTab === "overview" && (
//             <div className="card-grid">
//               <div className="card">
//                 <h3>Total Products</h3>
//                 <p>{products.length}</p>
//               </div>
//               <div className="card">
//                 <h3>Open Quotes</h3>
//                 <p>{quotes.filter((q) => q.status === "New").length}</p>
//               </div>
//               <div className="card">
//                 <h3>New Contact Messages</h3>
//                 <p>{contacts.filter((c) => c.status === "New").length}</p>
//               </div>
//             </div>
//           )}

//           {activeTab === "users" && isAdmin && (
//             <div>
//               <h2>User Management</h2>
//               <table className="simple-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Role</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((u) => (
//                     <tr key={u._id}>
//                       <td>{u.name}</td>
//                       <td>{u.email}</td>
//                       <td>{u.role}</td>
//                       <td>{u.isActive ? "Active" : "Inactive"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <p className="small-text">
//                 For simplicity, role and status changes can be done via API calls
//                 or extended UI.
//               </p>
//             </div>
//           )}

//           {activeTab === "categories" && (
//             <div>
//               <h2>Categories</h2>
//               <ul>
//                 {categories.map((c) => (
//                   <li key={c._id}>
//                     <strong>{c.name}</strong> - {c.description}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {activeTab === "products" && (
//             <div>
//               <h2>Products</h2>
//               <table className="simple-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Category</th>
//                     <th>Price / Unit</th>
//                     <th>Active</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {products.map((p) => (
//                     <tr key={p._id}>
//                       <td>{p.name}</td>
//                       <td>{p.category?.name}</td>
//                       <td>₹{p.pricePerUnit}</td>
//                       <td>{p.isActive ? "Yes" : "No"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {activeTab === "quotes" && (
//             <div>
//               <h2>Quotes</h2>
//               <table className="simple-table">
//                 <thead>
//                   <tr>
//                     <th>Customer</th>
//                     <th>Email</th>
//                     <th>Product</th>
//                     <th>Qty</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {quotes.map((q) => (
//                     <tr key={q._id}>
//                       <td>{q.customerName}</td>
//                       <td>{q.email}</td>
//                       <td>{q.product?.name}</td>
//                       <td>{q.quantity}</td>
//                       <td>{q.status}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {activeTab === "contacts" && (
//             <div>
//               <h2>Contact Messages</h2>
//               <table className="simple-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {contacts.map((c) => (
//                     <tr key={c._id}>
//                       <td>{c.name}</td>
//                       <td>{c.email}</td>
//                       <td>{c.phone}</td>
//                       <td>{c.status}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {activeTab === "settings" && isAdmin && (
//             <div>
//               <h2>Basic Settings</h2>
//               {settings ? (
//                 <ul>
//                   <li>Company Name: {settings.companyName}</li>
//                   <li>Email: {settings.email}</li>
//                   <li>Phone: {settings.phone}</li>
//                   <li>Address: {settings.address}</li>
//                 </ul>
//               ) : (
//                 <p>No settings saved yet.</p>
//               )}
//               <p className="small-text">
//                 For a full settings UI, you can add forms and update via the
//                 settings API.
//               </p>
//             </div>
//           )}

//           {activeTab === "logs" && isAdmin && (
//             <div>
//               <h2>Logs</h2>
//               <ul className="log-list">
//                 {logs.map((l) => (
//                   <li key={l._id}>
//                     <strong>{l.action}</strong> - {l.user?.email} -{" "}
//                     {new Date(l.createdAt).toLocaleString()}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../components/AuthContext";

// const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

// const AdminDashboardPage = () => {
//   const { token, user } = useAuth();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("overview");

//   const [users, setUsers] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [quotes, setQuotes] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [settings, setSettings] = useState(null);
//   const [logs, setLogs] = useState([]);

//   // ⭐ New CMS states
//   const [servicesCms, setServicesCms] = useState([]);
//   const [portfolioCms, setPortfolioCms] = useState([]);
//   const [testimonialsCms, setTestimonialsCms] = useState([]);
//   const [aboutCms, setAboutCms] = useState(null);

//   // Form states
//   const [newService, setNewService] = useState({
//     title: "",
//     description: "",
//     order: 0,
//   });

//   const [newPortfolioItem, setNewPortfolioItem] = useState({
//     title: "",
//     description: "",
//     order: 0,
//   });

//   const [newTestimonial, setNewTestimonial] = useState({
//     name: "",
//     role: "",
//     message: "",
//     order: 0,
//   });

//   const authHeader = { headers: { Authorization: `Bearer ${token}` } };

//   useEffect(() => {
//     if (!token) {
//       navigate("/admin/login");
//     }
//   }, [token, navigate]);

//   // Load main dashboard data
//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const [u, c, p, q, cm, s, l] = await Promise.all([
//           axios.get(`${API_BASE}/users`, authHeader),
//           axios.get(`${API_BASE}/categories`),
//           axios.get(`${API_BASE}/products`),
//           axios.get(`${API_BASE}/quotes`, authHeader),
//           axios.get(`${API_BASE}/contact`, authHeader),
//           axios.get(`${API_BASE}/settings`),
//           axios.get(`${API_BASE}/logs`, authHeader).catch(() => ({ data: [] })),
//         ]);
//         setUsers(u.data);
//         setCategories(c.data);
//         setProducts(p.data);
//         setQuotes(q.data);
//         setContacts(cm.data);
//         setSettings(s.data);
//         setLogs(l.data);
//       } catch (err) {
//         console.error("Failed to load dashboard data", err);
//       }
//     };
//     if (token) {
//       fetchAll();
//     }
//   }, [token]);

//   // Load CMS data
//   useEffect(() => {
//     const fetchCms = async () => {
//       try {
//         const [srv, port, t, a] = await Promise.all([
//           axios.get(`${API_BASE}/services-content`),
//           axios.get(`${API_BASE}/portfolio`),
//           axios.get(`${API_BASE}/testimonials`),
//           axios.get(`${API_BASE}/about`),
//         ]);

//         setServicesCms(srv.data);
//         setPortfolioCms(port.data);
//         setTestimonialsCms(t.data);
//         setAboutCms(a.data);
//       } catch (err) {
//         console.error("Failed to load CMS data", err);
//       }
//     };
//     if (token) {
//       fetchCms();
//     }
//   }, [token]);

//   if (!user) return null;

//   const isAdmin = user.role === "admin";
//   const isManagerOrAdmin = user.role === "admin" || user.role === "manager";

//   // =============================
//   // CMS HANDLERS
//   // =============================

//   // Services
//   const handleCreateService = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${API_BASE}/services-content`,
//         {
//           title: newService.title,
//           description: newService.description,
//           order: Number(newService.order) || 0,
//         },
//         authHeader
//       );
//       setServicesCms((prev) => [...prev, res.data]);
//       setNewService({ title: "", description: "", order: 0 });
//     } catch (err) {
//       console.error("Failed to create service", err);
//       alert("Could not create service. Check console for details.");
//     }
//   };

//   const handleDeleteService = async (id) => {
//     if (!window.confirm("Delete this service?")) return;
//     try {
//       await axios.delete(`${API_BASE}/services-content/${id}`, authHeader);
//       setServicesCms((prev) => prev.filter((s) => s._id !== id));
//     } catch (err) {
//       console.error("Failed to delete service", err);
//       alert("Could not delete service.");
//     }
//   };

//   // Portfolio
//   const handleCreatePortfolio = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${API_BASE}/portfolio`,
//         {
//           title: newPortfolioItem.title,
//           description: newPortfolioItem.description,
//           order: Number(newPortfolioItem.order) || 0,
//         },
//         authHeader
//       );
//       setPortfolioCms((prev) => [...prev, res.data]);
//       setNewPortfolioItem({ title: "", description: "", order: 0 });
//     } catch (err) {
//       console.error("Failed to create portfolio item", err);
//       alert("Could not create portfolio item.");
//     }
//   };

//   const handleDeletePortfolio = async (id) => {
//     if (!window.confirm("Delete this portfolio item?")) return;
//     try {
//       await axios.delete(`${API_BASE}/portfolio/${id}`, authHeader);
//       setPortfolioCms((prev) => prev.filter((p) => p._id !== id));
//     } catch (err) {
//       console.error("Failed to delete portfolio item", err);
//       alert("Could not delete portfolio item.");
//     }
//   };

//   // Testimonials
//   const handleCreateTestimonial = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${API_BASE}/testimonials`,
//         {
//           name: newTestimonial.name,
//           role: newTestimonial.role,
//           message: newTestimonial.message,
//           order: Number(newTestimonial.order) || 0,
//         },
//         authHeader
//       );
//       setTestimonialsCms((prev) => [...prev, res.data]);
//       setNewTestimonial({ name: "", role: "", message: "", order: 0 });
//     } catch (err) {
//       console.error("Failed to create testimonial", err);
//       alert("Could not create testimonial.");
//     }
//   };

//   const handleDeleteTestimonial = async (id) => {
//     if (!window.confirm("Delete this testimonial?")) return;
//     try {
//       await axios.delete(`${API_BASE}/testimonials/${id}`, authHeader);
//       setTestimonialsCms((prev) => prev.filter((t) => t._id !== id));
//     } catch (err) {
//       console.error("Failed to delete testimonial", err);
//       alert("Could not delete testimonial.");
//     }
//   };

//   // About content
//   const handleUpdateAbout = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.put(`${API_BASE}/about`, aboutCms, authHeader);
//       setAboutCms(res.data);
//       alert("About content updated.");
//     } catch (err) {
//       console.error("Failed to update about content", err);
//       alert("Could not update about content.");
//     }
//   };

//   const handleAboutChange = (e) => {
//     const { name, value } = e.target;
//     setAboutCms((prev) => ({ ...prev, [name]: value }));
//   };

//   // =============================
//   // RENDER
//   // =============================

//   return (
//     <div className="page-container admin-page">
//       <h1>Admin Dashboard</h1>
//       <p className="small-text">
//         Logged in as {user.name} ({user.role})
//       </p>
//       <div className="admin-layout">
//         <aside className="admin-sidebar">
//           <button onClick={() => setActiveTab("overview")}>Overview</button>
//           {isAdmin && (
//             <button onClick={() => setActiveTab("users")}>Users</button>
//           )}
//           <button onClick={() => setActiveTab("categories")}>Categories</button>
//           <button onClick={() => setActiveTab("products")}>Products</button>
//           <button onClick={() => setActiveTab("quotes")}>Quotes</button>
//           <button onClick={() => setActiveTab("contacts")}>
//             Contact Messages
//           </button>

//           {/* ⭐ New CMS Tabs (admin + manager) */}
//           {isManagerOrAdmin && (
//             <>
//               <button onClick={() => setActiveTab("servicesCms")}>
//                 Services CMS
//               </button>
//               <button onClick={() => setActiveTab("portfolioCms")}>
//                 Portfolio CMS
//               </button>
//               <button onClick={() => setActiveTab("testimonialsCms")}>
//                 Testimonials CMS
//               </button>
//             </>
//           )}

//           {isAdmin && (
//             <>
//               <button onClick={() => setActiveTab("aboutCms")}>
//                 About Content
//               </button>
//               <button onClick={() => setActiveTab("settings")}>Settings</button>
//               <button onClick={() => setActiveTab("logs")}>Logs</button>
//             </>
//           )}
//         </aside>

//         <section className="admin-content">
//           {/* ---------------- Overview --------------- */}
//           {activeTab === "overview" && (
//             <div className="card-grid">
//               <div className="card">
//                 <h3>Total Products</h3>
//                 <p>{products.length}</p>
//               </div>
//               <div className="card">
//                 <h3>Open Quotes</h3>
//                 <p>{quotes.filter((q) => q.status === "New").length}</p>
//               </div>
//               <div className="card">
//                 <h3>New Contact Messages</h3>
//                 <p>{contacts.filter((c) => c.status === "New").length}</p>
//               </div>
//             </div>
//           )}

//           {/* ---------------- Users --------------- */}
//           {activeTab === "users" && isAdmin && (
//             <div>
//               <h2>User Management</h2>
//               <table className="simple-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Role</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((u) => (
//                     <tr key={u._id}>
//                       <td>{u.name}</td>
//                       <td>{u.email}</td>
//                       <td>{u.role}</td>
//                       <td>{u.isActive ? "Active" : "Inactive"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <p className="small-text">
//                 For simplicity, role and status changes can be done via API
//                 calls or extended UI.
//               </p>
//             </div>
//           )}

//           {/* ---------------- Categories --------------- */}
//           {activeTab === "categories" && (
//             <div>
//               <h2>Categories</h2>
//               <ul>
//                 {categories.map((c) => (
//                   <li key={c._id}>
//                     <strong>{c.name}</strong> - {c.description}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* ---------------- Products --------------- */}
//           {activeTab === "products" && (
//             <div>
//               <h2>Products</h2>
//               <table className="simple-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Category</th>
//                     <th>Price / Unit</th>
//                     <th>Active</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {products.map((p) => (
//                     <tr key={p._id}>
//                       <td>{p.name}</td>
//                       <td>{p.category?.name}</td>
//                       <td>₹{p.pricePerUnit}</td>
//                       <td>{p.isActive ? "Yes" : "No"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <p className="small-text">
//                 For full product CRUD, you can add forms similar to Services
//                 CMS.
//               </p>
//             </div>
//           )}

//           {/* ---------------- Quotes --------------- */}
//           {activeTab === "quotes" && (
//             <div>
//               <h2>Quotes</h2>
//               <table className="simple-table">
//                 <thead>
//                   <tr>
//                     <th>Customer</th>
//                     <th>Email</th>
//                     <th>Product</th>
//                     <th>Qty</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {quotes.map((q) => (
//                     <tr key={q._id}>
//                       <td>{q.customerName}</td>
//                       <td>{q.email}</td>
//                       <td>{q.product?.name}</td>
//                       <td>{q.quantity}</td>
//                       <td>{q.status}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* ---------------- Contacts --------------- */}
//           {activeTab === "contacts" && (
//             <div>
//               <h2>Contact Messages</h2>
//               <table className="simple-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {contacts.map((c) => (
//                     <tr key={c._id}>
//                       <td>{c.name}</td>
//                       <td>{c.email}</td>
//                       <td>{c.phone}</td>
//                       <td>{c.status}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* ---------------- Services CMS --------------- */}
//           {activeTab === "servicesCms" && isManagerOrAdmin && (
//             <div>
//               <h2>Services CMS</h2>
//               <form className="simple-form" onSubmit={handleCreateService}>
//                 <div className="form-group">
//                   <label>Title</label>
//                   <input
//                     value={newService.title}
//                     onChange={(e) =>
//                       setNewService((prev) => ({
//                         ...prev,
//                         title: e.target.value,
//                       }))
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Description</label>
//                   <textarea
//                     value={newService.description}
//                     onChange={(e) =>
//                       setNewService((prev) => ({
//                         ...prev,
//                         description: e.target.value,
//                       }))
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Order (optional)</label>
//                   <input
//                     type="number"
//                     value={newService.order}
//                     onChange={(e) =>
//                       setNewService((prev) => ({
//                         ...prev,
//                         order: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>
//                 <button className="btn-primary" type="submit">
//                   Add Service
//                 </button>
//               </form>

//               <h3 style={{ marginTop: "1.5rem" }}>Existing Services</h3>
//               <ul>
//                 {servicesCms.map((s) => (
//                   <li key={s._id}>
//                     <strong>{s.title}</strong> - {s.description}{" "}
//                     <button
//                       className="btn-link"
//                       type="button"
//                       onClick={() => handleDeleteService(s._id)}
//                     >
//                       Delete
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* ---------------- Portfolio CMS --------------- */}
//           {activeTab === "portfolioCms" && isManagerOrAdmin && (
//             <div>
//               <h2>Portfolio CMS</h2>
//               <form className="simple-form" onSubmit={handleCreatePortfolio}>
//                 <div className="form-group">
//                   <label>Title</label>
//                   <input
//                     value={newPortfolioItem.title}
//                     onChange={(e) =>
//                       setNewPortfolioItem((prev) => ({
//                         ...prev,
//                         title: e.target.value,
//                       }))
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Description</label>
//                   <textarea
//                     value={newPortfolioItem.description}
//                     onChange={(e) =>
//                       setNewPortfolioItem((prev) => ({
//                         ...prev,
//                         description: e.target.value,
//                       }))
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Order (optional)</label>
//                   <input
//                     type="number"
//                     value={newPortfolioItem.order}
//                     onChange={(e) =>
//                       setNewPortfolioItem((prev) => ({
//                         ...prev,
//                         order: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>
//                 <button className="btn-primary" type="submit">
//                   Add Portfolio Item
//                 </button>
//               </form>

//               <h3 style={{ marginTop: "1.5rem" }}>Existing Portfolio Items</h3>
//               <ul>
//                 {portfolioCms.map((p) => (
//                   <li key={p._id}>
//                     <strong>{p.title}</strong> - {p.description}{" "}
//                     <button
//                       className="btn-link"
//                       type="button"
//                       onClick={() => handleDeletePortfolio(p._id)}
//                     >
//                       Delete
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* ---------------- Testimonials CMS --------------- */}
//           {activeTab === "testimonialsCms" && isManagerOrAdmin && (
//             <div>
//               <h2>Testimonials CMS</h2>
//               <form className="simple-form" onSubmit={handleCreateTestimonial}>
//                 <div className="form-group">
//                   <label>Client Name</label>
//                   <input
//                     value={newTestimonial.name}
//                     onChange={(e) =>
//                       setNewTestimonial((prev) => ({
//                         ...prev,
//                         name: e.target.value,
//                       }))
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Role / Company (optional)</label>
//                   <input
//                     value={newTestimonial.role}
//                     onChange={(e) =>
//                       setNewTestimonial((prev) => ({
//                         ...prev,
//                         role: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Message</label>
//                   <textarea
//                     value={newTestimonial.message}
//                     onChange={(e) =>
//                       setNewTestimonial((prev) => ({
//                         ...prev,
//                         message: e.target.value,
//                       }))
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Order (optional)</label>
//                   <input
//                     type="number"
//                     value={newTestimonial.order}
//                     onChange={(e) =>
//                       setNewTestimonial((prev) => ({
//                         ...prev,
//                         order: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>
//                 <button className="btn-primary" type="submit">
//                   Add Testimonial
//                 </button>
//               </form>

//               <h3 style={{ marginTop: "1.5rem" }}>Existing Testimonials</h3>
//               <ul>
//                 {testimonialsCms.map((t) => (
//                   <li key={t._id}>
//                     <strong>{t.name}</strong> {t.role ? `(${t.role})` : ""} – "
//                     {t.message}"{" "}
//                     <button
//                       className="btn-link"
//                       type="button"
//                       onClick={() => handleDeleteTestimonial(t._id)}
//                     >
//                       Delete
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* ---------------- About CMS --------------- */}
//           {activeTab === "aboutCms" && isAdmin && (
//             <div>
//               <h2>About Content</h2>
//               {aboutCms ? (
//                 <form className="simple-form" onSubmit={handleUpdateAbout}>
//                   <div className="form-group">
//                     <label>Heading</label>
//                     <input
//                       name="heading"
//                       value={aboutCms.heading || ""}
//                       onChange={handleAboutChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Section 1</label>
//                     <textarea
//                       name="section1"
//                       value={aboutCms.section1 || ""}
//                       onChange={handleAboutChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Section 2</label>
//                     <textarea
//                       name="section2"
//                       value={aboutCms.section2 || ""}
//                       onChange={handleAboutChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Section 3</label>
//                     <textarea
//                       name="section3"
//                       value={aboutCms.section3 || ""}
//                       onChange={handleAboutChange}
//                     />
//                   </div>
//                   <button className="btn-primary" type="submit">
//                     Save About Content
//                   </button>
//                 </form>
//               ) : (
//                 <p>Loading about content...</p>
//               )}
//             </div>
//           )}

//           {/* ---------------- Settings --------------- */}
//           {activeTab === "settings" && isAdmin && (
//             <div>
//               <h2>Basic Settings</h2>
//               {settings ? (
//                 <ul>
//                   <li>Company Name: {settings.companyName}</li>
//                   <li>Email: {settings.email}</li>
//                   <li>Phone: {settings.phone}</li>
//                   <li>Address: {settings.address}</li>
//                 </ul>
//               ) : (
//                 <p>No settings saved yet.</p>
//               )}
//               <p className="small-text">
//                 For a full settings UI, you can add forms and update via the
//                 settings API.
//               </p>
//             </div>
//           )}

//           {/* ---------------- Logs --------------- */}
//           {activeTab === "logs" && isAdmin && (
//             <div>
//               <h2>Logs</h2>
//               <ul className="log-list">
//                 {logs.map((l) => (
//                   <li key={l._id}>
//                     <strong>{l.action}</strong> - {l.user?.email} -{" "}
//                     {new Date(l.createdAt).toLocaleString()}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../components/AuthContext";

// const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

// const AdminDashboardPage = () => {
//   const { token, user } = useAuth();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("overview");

//   // Core data
//   const [users, setUsers] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [quotes, setQuotes] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [settings, setSettings] = useState(null);
//   const [logs, setLogs] = useState([]);

//   // CMS lists
//   const [servicesCms, setServicesCms] = useState([]);
//   const [portfolioCms, setPortfolioCms] = useState([]);
//   const [testimonialsCms, setTestimonialsCms] = useState([]);
//   const [aboutCms, setAboutCms] = useState(null);

//   // Forms
//   const [newService, setNewService] = useState({
//     title: "",
//     description: "",
//     order: 0,
//   });

//   const [newPortfolioItem, setNewPortfolioItem] = useState({
//     title: "",
//     description: "",
//     order: 0,
//   });

//   const [newTestimonial, setNewTestimonial] = useState({
//     name: "",
//     role: "",
//     message: "",
//     order: 0,
//   });

//   const [newCategory, setNewCategory] = useState({
//     name: "",
//     description: "",
//   });

//   // Product CMS
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     description: "",
//     category: "",
//     pricePerUnit: "",
//     minQty: 1,
//     maxQty: 1000,
//     options: "",
//     videoUrl: "",
//     extraImages: "",
//     isActive: true,
//   });
//   const [productImageFile, setProductImageFile] = useState(null);
//   const [editingProductId, setEditingProductId] = useState(null);

//   const authHeader = { headers: { Authorization: `Bearer ${token}` } };

//   useEffect(() => {
//     if (!token) {
//       navigate("/admin/login");
//     }
//   }, [token, navigate]);

//   // Load main dashboard data
//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const [u, c, p, q, cm, s, l] = await Promise.all([
//           axios.get(`${API_BASE}/users`, authHeader),
//           axios.get(`${API_BASE}/categories`),
//           axios.get(`${API_BASE}/products`),
//           axios.get(`${API_BASE}/quotes`, authHeader),
//           axios.get(`${API_BASE}/contact`, authHeader),
//           axios.get(`${API_BASE}/settings`),
//           axios.get(`${API_BASE}/logs`, authHeader).catch(() => ({ data: [] })),
//         ]);
//         setUsers(u.data);
//         setCategories(c.data);
//         setProducts(p.data);
//         setQuotes(q.data);
//         setContacts(cm.data);
//         setSettings(s.data);
//         setLogs(l.data);
//       } catch (err) {
//         console.error("Failed to load dashboard data", err);
//       }
//     };
//     if (token) {
//       fetchAll();
//     }
//   }, [token]);

//   // Load CMS data
//   useEffect(() => {
//     const fetchCms = async () => {
//       try {
//         const [srv, port, t, a] = await Promise.all([
//           axios.get(`${API_BASE}/services-content`),
//           axios.get(`${API_BASE}/portfolio`),
//           axios.get(`${API_BASE}/testimonials`),
//           axios.get(`${API_BASE}/about`),
//         ]);

//         setServicesCms(srv.data);
//         setPortfolioCms(port.data);
//         setTestimonialsCms(t.data);
//         setAboutCms(a.data);
//       } catch (err) {
//         console.error("Failed to load CMS data", err);
//       }
//     };
//     if (token) {
//       fetchCms();
//     }
//   }, [token]);

//   if (!user) return null;

//   const isAdmin = user.role === "admin";
//   const isManagerOrAdmin = user.role === "admin" || user.role === "manager";

//   // =============================
//   // PRODUCT HANDLERS
//   // =============================

//   const handleProductFieldChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setNewProduct((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleProductImageChange = (e) => {
//     const file = e.target.files?.[0];
//     setProductImageFile(file || null);
//   };

//   const handleEditProduct = (product) => {
//     setEditingProductId(product._id);
//     setNewProduct({
//       name: product.name || "",
//       description: product.description || "",
//       category: product.category?._id || "",
//       pricePerUnit: product.pricePerUnit?.toString() || "",
//       minQty: product.minQty || 1,
//       maxQty: product.maxQty || 1000,
//       options: product.options ? product.options.join(", ") : "",
//       videoUrl: product.videoUrl || "",
//       extraImages: product.extraImages ? product.extraImages.join(", ") : "",
//       isActive: product.isActive,
//     });
//     setProductImageFile(null);
//     setActiveTab("products");
//   };

//   const handleResetProductForm = () => {
//     setEditingProductId(null);
//     setNewProduct({
//       name: "",
//       description: "",
//       category: "",
//       pricePerUnit: "",
//       minQty: 1,
//       maxQty: 1000,
//       options: "",
//       videoUrl: "",
//       extraImages: "",
//       isActive: true,
//     });
//     setProductImageFile(null);
//   };

//   const handleSubmitProduct = async (e) => {
//     e.preventDefault();
//     if (!newProduct.category) {
//       alert("Please select a category.");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("name", newProduct.name);
//       formData.append("description", newProduct.description);
//       formData.append("category", newProduct.category);
//       formData.append("pricePerUnit", newProduct.pricePerUnit);
//       formData.append("minQty", newProduct.minQty);
//       formData.append("maxQty", newProduct.maxQty);
//       formData.append("options", newProduct.options);
//       formData.append("videoUrl", newProduct.videoUrl);
//       formData.append("extraImages", newProduct.extraImages);
//       formData.append("isActive", newProduct.isActive ? "true" : "false");

//       if (productImageFile) {
//         formData.append("image", productImageFile);
//       }

//       let res;
//       if (editingProductId) {
//         res = await axios.put(
//           `${API_BASE}/products/${editingProductId}`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         setProducts((prev) =>
//           prev.map((p) => (p._id === editingProductId ? res.data : p))
//         );
//       } else {
//         res = await axios.post(`${API_BASE}/products`, formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         setProducts((prev) => [...prev, res.data]);
//       }

//       handleResetProductForm();
//     } catch (err) {
//       console.error("Failed to save product", err);
//       alert("Could not save product. Please check console for details.");
//     }
//   };

//   const handleDeleteProduct = async (id) => {
//     if (!window.confirm("Delete this product?")) return;
//     try {
//       await axios.delete(`${API_BASE}/products/${id}`, authHeader);
//       setProducts((prev) => prev.filter((p) => p._id !== id));
//       if (editingProductId === id) {
//         handleResetProductForm();
//       }
//     } catch (err) {
//       console.error("Failed to delete product", err);
//       alert("Could not delete product.");
//     }
//   };

//   // =============================
//   // CATEGORY HANDLERS
//   // =============================

//   const handleCreateCategory = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${API_BASE}/categories`,
//         {
//           name: newCategory.name,
//           description: newCategory.description,
//         },
//         authHeader
//       );
//       setCategories((prev) => [...prev, res.data]);
//       setNewCategory({ name: "", description: "" });
//     } catch (err) {
//       console.error("Failed to create category", err);
//       alert("Could not create category. Check console for details.");
//     }
//   };

//   const handleDeleteCategory = async (id) => {
//     if (!window.confirm("Delete this category?")) return;
//     try {
//       await axios.delete(`${API_BASE}/categories/${id}`, authHeader);
//       setCategories((prev) => prev.filter((c) => c._id !== id));
//     } catch (err) {
//       console.error("Failed to delete category", err);
//       alert("Could not delete category.");
//     }
//   };

//   // =============================
//   // SERVICES / PORTFOLIO / TESTIMONIAL / ABOUT HANDLERS
//   // =============================

//   // Services
//   const handleCreateService = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${API_BASE}/services-content`,
//         {
//           title: newService.title,
//           description: newService.description,
//           order: Number(newService.order) || 0,
//         },
//         authHeader
//       );
//       setServicesCms((prev) => [...prev, res.data]);
//       setNewService({ title: "", description: "", order: 0 });
//     } catch (err) {
//       console.error("Failed to create service", err);
//       alert("Could not create service. Check console for details.");
//     }
//   };

//   const handleDeleteService = async (id) => {
//     if (!window.confirm("Delete this service?")) return;
//     try {
//       await axios.delete(`${API_BASE}/services-content/${id}`, authHeader);
//       setServicesCms((prev) => prev.filter((s) => s._id !== id));
//     } catch (err) {
//       console.error("Failed to delete service", err);
//       alert("Could not delete service.");
//     }
//   };

//   // Portfolio
//   const handleCreatePortfolio = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${API_BASE}/portfolio`,
//         {
//           title: newPortfolioItem.title,
//           description: newPortfolioItem.description,
//           order: Number(newPortfolioItem.order) || 0,
//         },
//         authHeader
//       );
//       setPortfolioCms((prev) => [...prev, res.data]);
//       setNewPortfolioItem({ title: "", description: "", order: 0 });
//     } catch (err) {
//       console.error("Failed to create portfolio item", err);
//       alert("Could not create portfolio item.");
//     }
//   };

//   const handleDeletePortfolio = async (id) => {
//     if (!window.confirm("Delete this portfolio item?")) return;
//     try {
//       await axios.delete(`${API_BASE}/portfolio/${id}`, authHeader);
//       setPortfolioCms((prev) => prev.filter((p) => p._id !== id));
//     } catch (err) {
//       console.error("Failed to delete portfolio item", err);
//       alert("Could not delete portfolio item.");
//     }
//   };

//   // Testimonials
//   const handleCreateTestimonial = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${API_BASE}/testimonials`,
//         {
//           name: newTestimonial.name,
//           role: newTestimonial.role,
//           message: newTestimonial.message,
//           order: Number(newTestimonial.order) || 0,
//         },
//         authHeader
//       );
//       setTestimonialsCms((prev) => [...prev, res.data]);
//       setNewTestimonial({ name: "", role: "", message: "", order: 0 });
//     } catch (err) {
//       console.error("Failed to create testimonial", err);
//       alert("Could not create testimonial.");
//     }
//   };

//   const handleDeleteTestimonial = async (id) => {
//     if (!window.confirm("Delete this testimonial?")) return;
//     try {
//       await axios.delete(`${API_BASE}/testimonials/${id}`, authHeader);
//       setTestimonialsCms((prev) => prev.filter((t) => t._id !== id));
//     } catch (err) {
//       console.error("Failed to delete testimonial", err);
//       alert("Could not delete testimonial.");
//     }
//   };

//   // About content
//   const handleUpdateAbout = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.put(`${API_BASE}/about`, aboutCms, authHeader);
//       setAboutCms(res.data);
//       alert("About content updated.");
//     } catch (err) {
//       console.error("Failed to update about content", err);
//       alert("Could not update about content.");
//     }
//   };

//   const handleAboutChange = (e) => {
//     const { name, value } = e.target;
//     setAboutCms((prev) => ({ ...prev, [name]: value }));
//   };

//   // =============================
//   // RENDER
//   // =============================

//   return (
//     <div className="page-container admin-page">
//       <h1>Admin Dashboard</h1>
//       <p className="small-text">
//         Logged in as {user.name} ({user.role})
//       </p>
//       <div className="admin-layout">
//         <aside className="admin-sidebar">
//           <button onClick={() => setActiveTab("overview")}>Overview</button>
//           {isAdmin && (
//             <button onClick={() => setActiveTab("users")}>Users</button>
//           )}
//           <button onClick={() => setActiveTab("categories")}>Categories</button>
//           <button onClick={() => setActiveTab("products")}>Products</button>
//           <button onClick={() => setActiveTab("quotes")}>Quotes</button>
//           <button onClick={() => setActiveTab("contacts")}>
//             Contact Messages
//           </button>

//           {isManagerOrAdmin && (
//             <>
//               <button onClick={() => setActiveTab("servicesCms")}>
//                 Services CMS
//               </button>
//               <button onClick={() => setActiveTab("portfolioCms")}>
//                 Portfolio CMS
//               </button>
//               <button onClick={() => setActiveTab("testimonialsCms")}>
//                 Testimonials CMS
//               </button>
//             </>
//           )}

//           {isAdmin && (
//             <>
//               <button onClick={() => setActiveTab("aboutCms")}>
//                 About Content
//               </button>
//               <button onClick={() => setActiveTab("settings")}>Settings</button>
//               <button onClick={() => setActiveTab("logs")}>Logs</button>
//             </>
//           )}
//         </aside>

//         <section className="admin-content">
//           {/* -------- Overview -------- */}
//           {activeTab === "overview" && (
//             <div className="card-grid">
//               <div className="card">
//                 <h3>Total Products</h3>
//                 <p>{products.length}</p>
//               </div>
//               <div className="card">
//                 <h3>Open Quotes</h3>
//                 <p>{quotes.filter((q) => q.status === "New").length}</p>
//               </div>
//               <div className="card">
//                 <h3>New Contact Messages</h3>
//                 <p>{contacts.filter((c) => c.status === "New").length}</p>
//               </div>
//             </div>
//           )}

//           {/* -------- Users -------- */}
//           {activeTab === "users" && isAdmin && (
//             <div>
//               <h2>User Management</h2>
//               <table className="simple-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Role</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((u) => (
//                     <tr key={u._id}>
//                       <td>{u.name}</td>
//                       <td>{u.email}</td>
//                       <td>{u.role}</td>
//                       <td>{u.isActive ? "Active" : "Inactive"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <p className="small-text">
//                 For simplicity, role and status changes can be done via API
//                 calls or extended UI.
//               </p>
//             </div>
//           )}

//           {/* -------- Categories (Add + List + Delete) -------- */}
//           {activeTab === "categories" && (
//             <div>
//               <h2>Categories</h2>

//               <form className="simple-form" onSubmit={handleCreateCategory}>
//                 <div className="form-group">
//                   <label>Category Name</label>
//                   <input
//                     value={newCategory.name}
//                     onChange={(e) =>
//                       setNewCategory((prev) => ({
//                         ...prev,
//                         name: e.target.value,
//                       }))
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Description</label>
//                   <textarea
//                     value={newCategory.description}
//                     onChange={(e) =>
//                       setNewCategory((prev) => ({
//                         ...prev,
//                         description: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>
//                 <button className="btn-primary" type="submit">
//                   Add Category
//                 </button>
//               </form>

//               <h3 style={{ marginTop: "1.5rem" }}>Existing Categories</h3>
//               <ul>
//                 {categories.map((c) => (
//                   <li key={c._id}>
//                     <strong>{c.name}</strong> - {c.description}{" "}
//                     <button
//                       className="btn-link"
//                       type="button"
//                       onClick={() => handleDeleteCategory(c._id)}
//                     >
//                       Delete
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* -------- Products (Full CRUD + Media) -------- */}
//           {activeTab === "products" && (
//             <div>
//               <h2>Products</h2>

//               {/* Product Form */}
//               <form className="simple-form" onSubmit={handleSubmitProduct}>
//                 <div className="form-group">
//                   <label>Product Name</label>
//                   <input
//                     name="name"
//                     value={newProduct.name}
//                     onChange={handleProductFieldChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Description</label>
//                   <textarea
//                     name="description"
//                     value={newProduct.description}
//                     onChange={handleProductFieldChange}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Category</label>
//                   <select
//                     name="category"
//                     value={newProduct.category}
//                     onChange={handleProductFieldChange}
//                     required
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((c) => (
//                       <option key={c._id} value={c._id}>
//                         {c.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label>
//                     Price per Unit (₹){" "}
//                     <span style={{ fontSize: "12px", color: "#666" }}>
//                       (optional)
//                     </span>
//                   </label>
//                   <input
//                     type="number"
//                     name="pricePerUnit"
//                     value={newProduct.pricePerUnit}
//                     placeholder="Leave blank if price on request"
//                     onChange={handleProductFieldChange}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Min Quantity</label>
//                   <input
//                     type="number"
//                     name="minQty"
//                     value={newProduct.minQty}
//                     onChange={handleProductFieldChange}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Max Quantity</label>
//                   <input
//                     type="number"
//                     name="maxQty"
//                     value={newProduct.maxQty}
//                     onChange={handleProductFieldChange}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Options (comma separated)</label>
//                   <input
//                     name="options"
//                     placeholder="Gloss, Matte, 350 GSM, etc."
//                     value={newProduct.options}
//                     onChange={handleProductFieldChange}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Main Image</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleProductImageChange}
//                   />
//                   {editingProductId && (
//                     <p className="small-text">
//                       Leave empty to keep existing image.
//                     </p>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label>Video URL (optional)</label>
//                   <input
//                     name="videoUrl"
//                     placeholder="https://youtube.com/..."
//                     value={newProduct.videoUrl}
//                     onChange={handleProductFieldChange}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Extra Image URLs (comma separated)</label>
//                   <input
//                     name="extraImages"
//                     placeholder="https://..., https://..."
//                     value={newProduct.extraImages}
//                     onChange={handleProductFieldChange}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>
//                     <input
//                       type="checkbox"
//                       name="isActive"
//                       checked={newProduct.isActive}
//                       onChange={handleProductFieldChange}
//                     />{" "}
//                     Active
//                   </label>
//                 </div>

//                 <div>
//                   <button className="btn-primary" type="submit">
//                     {editingProductId ? "Update Product" : "Create Product"}
//                   </button>
//                   {editingProductId && (
//                     <button
//                       type="button"
//                       className="btn-secondary"
//                       style={{ marginLeft: "0.5rem" }}
//                       onClick={handleResetProductForm}
//                     >
//                       Cancel Edit
//                     </button>
//                   )}
//                 </div>
//               </form>

//               {/* Product List */}
//               <h3 style={{ marginTop: "2rem" }}>Existing Products</h3>
//               <table className="simple-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Category</th>
//                     <th>Price / Unit</th>
//                     <th>Active</th>
//                     <th>Media</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {products.map((p) => (
//                     <tr key={p._id}>
//                       <td>{p.name}</td>
//                       <td>{p.category?.name}</td>
//                       <td>{p.pricePerUnit ? `₹${p.pricePerUnit}` : "N/A"}</td>
//                       <td>{p.isActive ? "Yes" : "No"}</td>
//                       <td>
//                         {p.imageUrl && (
//                           <span className="small-text">Image ✓ </span>
//                         )}
//                         {p.videoUrl && (
//                           <span className="small-text">Video ✓ </span>
//                         )}
//                       </td>
//                       <td>
//                         <button
//                           className="btn-link"
//                           type="button"
//                           onClick={() => handleEditProduct(p)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="btn-link"
//                           type="button"
//                           onClick={() => handleDeleteProduct(p._id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <p className="small-text">
//                 You can upload one main image per product and link extra images
//                 or videos via URLs.
//               </p>
//             </div>
//           )}

//           {/* -------- Quotes -------- */}
//           {activeTab === "quotes" && (
//             <div>
//               <h2>Quotes</h2>
//               <table className="simple-table">
//                 <thead>
//                   <tr>
//                     <th>Customer</th>
//                     <th>Email</th>
//                     <th>Product</th>
//                     <th>Qty</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {quotes.map((q) => (
//                     <tr key={q._id}>
//                       <td>{q.customerName}</td>
//                       <td>{q.email}</td>
//                       <td>{q.product?.name}</td>
//                       <td>{q.quantity}</td>
//                       <td>{q.status}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* -------- Contacts -------- */}
//           {activeTab === "contacts" && (
//             <div>
//               <h2>Contact Messages</h2>
//               <table className="simple-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {contacts.map((c) => (
//                     <tr key={c._id}>
//                       <td>{c.name}</td>
//                       <td>{c.email}</td>
//                       <td>{c.phone}</td>
//                       <td>{c.status}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* -------- Services CMS -------- */}
//           {activeTab === "servicesCms" && isManagerOrAdmin && (
//             <div>
//               <h2>Services CMS</h2>
//               <form className="simple-form" onSubmit={handleCreateService}>
//                 <div className="form-group">
//                   <label>Title</label>
//                   <input
//                     value={newService.title}
//                     onChange={(e) =>
//                       setNewService((prev) => ({
//                         ...prev,
//                         title: e.target.value,
//                       }))
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Description</label>
//                   <textarea
//                     value={newService.description}
//                     onChange={(e) =>
//                       setNewService((prev) => ({
//                         ...prev,
//                         description: e.target.value,
//                       }))
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Order (optional)</label>
//                   <input
//                     type="number"
//                     value={newService.order}
//                     onChange={(e) =>
//                       setNewService((prev) => ({
//                         ...prev,
//                         order: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>
//                 <button className="btn-primary" type="submit">
//                   Add Service
//                 </button>
//               </form>

//               <h3 style={{ marginTop: "1.5rem" }}>Existing Services</h3>
//               <ul>
//                 {servicesCms.map((s) => (
//                   <li key={s._id}>
//                     <strong>{s.title}</strong> - {s.description}{" "}
//                     <button
//                       className="btn-link"
//                       type="button"
//                       onClick={() => handleDeleteService(s._id)}
//                     >
//                       Delete
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* -------- Portfolio CMS -------- */}
//           {activeTab === "portfolioCms" && isManagerOrAdmin && (
//             <div>
//               <h2>Portfolio CMS</h2>
//               <form className="simple-form" onSubmit={handleCreatePortfolio}>
//                 <div className="form-group">
//                   <label>Title</label>
//                   <input
//                     value={newPortfolioItem.title}
//                     onChange={(e) =>
//                       setNewPortfolioItem((prev) => ({
//                         ...prev,
//                         title: e.target.value,
//                       }))
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Description</label>
//                   <textarea
//                     value={newPortfolioItem.description}
//                     onChange={(e) =>
//                       setNewPortfolioItem((prev) => ({
//                         ...prev,
//                         description: e.target.value,
//                       }))
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Order (optional)</label>
//                   <input
//                     type="number"
//                     value={newPortfolioItem.order}
//                     onChange={(e) =>
//                       setNewPortfolioItem((prev) => ({
//                         ...prev,
//                         order: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>
//                 <button className="btn-primary" type="submit">
//                   Add Portfolio Item
//                 </button>
//               </form>

//               <h3 style={{ marginTop: "1.5rem" }}>Existing Portfolio Items</h3>
//               <ul>
//                 {portfolioCms.map((p) => (
//                   <li key={p._id}>
//                     <strong>{p.title}</strong> - {p.description}{" "}
//                     <button
//                       className="btn-link"
//                       type="button"
//                       onClick={() => handleDeletePortfolio(p._id)}
//                     >
//                       Delete
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* -------- Testimonials CMS -------- */}
//           {activeTab === "testimonialsCms" && isManagerOrAdmin && (
//             <div>
//               <h2>Testimonials CMS</h2>
//               <form className="simple-form" onSubmit={handleCreateTestimonial}>
//                 <div className="form-group">
//                   <label>Client Name</label>
//                   <input
//                     value={newTestimonial.name}
//                     onChange={(e) =>
//                       setNewTestimonial((prev) => ({
//                         ...prev,
//                         name: e.target.value,
//                       }))
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Role / Company (optional)</label>
//                   <input
//                     value={newTestimonial.role}
//                     onChange={(e) =>
//                       setNewTestimonial((prev) => ({
//                         ...prev,
//                         role: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Message</label>
//                   <textarea
//                     value={newTestimonial.message}
//                     onChange={(e) =>
//                       setNewTestimonial((prev) => ({
//                         ...prev,
//                         message: e.target.value,
//                       }))
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Order (optional)</label>
//                   <input
//                     type="number"
//                     value={newTestimonial.order}
//                     onChange={(e) =>
//                       setNewTestimonial((prev) => ({
//                         ...prev,
//                         order: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>
//                 <button className="btn-primary" type="submit">
//                   Add Testimonial
//                 </button>
//               </form>

//               <h3 style={{ marginTop: "1.5rem" }}>Existing Testimonials</h3>
//               <ul>
//                 {testimonialsCms.map((t) => (
//                   <li key={t._id}>
//                     <strong>{t.name}</strong> {t.role ? `(${t.role})` : ""} – "
//                     {t.message}"{" "}
//                     <button
//                       className="btn-link"
//                       type="button"
//                       onClick={() => handleDeleteTestimonial(t._id)}
//                     >
//                       Delete
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* -------- About CMS -------- */}
//           {activeTab === "aboutCms" && isAdmin && (
//             <div>
//               <h2>About Content</h2>
//               {aboutCms ? (
//                 <form className="simple-form" onSubmit={handleUpdateAbout}>
//                   <div className="form-group">
//                     <label>Heading</label>
//                     <input
//                       name="heading"
//                       value={aboutCms.heading || ""}
//                       onChange={handleAboutChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Section 1</label>
//                     <textarea
//                       name="section1"
//                       value={aboutCms.section1 || ""}
//                       onChange={handleAboutChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Section 2</label>
//                     <textarea
//                       name="section2"
//                       value={aboutCms.section2 || ""}
//                       onChange={handleAboutChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Section 3</label>
//                     <textarea
//                       name="section3"
//                       value={aboutCms.section3 || ""}
//                       onChange={handleAboutChange}
//                     />
//                   </div>
//                   <button className="btn-primary" type="submit">
//                     Save About Content
//                   </button>
//                 </form>
//               ) : (
//                 <p>Loading about content...</p>
//               )}
//             </div>
//           )}

//           {/* -------- Settings -------- */}
//           {activeTab === "settings" && isAdmin && (
//             <div>
//               <h2>Basic Settings</h2>
//               {settings ? (
//                 <ul>
//                   <li>Company Name: {settings.companyName}</li>
//                   <li>Email: {settings.email}</li>
//                   <li>Phone: {settings.phone}</li>
//                   <li>Address: {settings.address}</li>
//                 </ul>
//               ) : (
//                 <p>No settings saved yet.</p>
//               )}
//               <p className="small-text">
//                 For a full settings UI, you can add forms and update via the
//                 settings API.
//               </p>
//             </div>
//           )}

//           {/* -------- Logs -------- */}
//           {activeTab === "logs" && isAdmin && (
//             <div>
//               <h2>Logs</h2>
//               <ul className="log-list">
//                 {logs.map((l) => (
//                   <li key={l._id}>
//                     <strong>{l.action}</strong> - {l.user?.email} -{" "}
//                     {new Date(l.createdAt).toLocaleString()}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

const AdminDashboardPage = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Core data
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [settings, setSettings] = useState(null);
  const [logs, setLogs] = useState([]);

  // CMS lists
  const [servicesCms, setServicesCms] = useState([]);
  const [portfolioCms, setPortfolioCms] = useState([]);
  const [testimonialsCms, setTestimonialsCms] = useState([]);
  const [aboutCms, setAboutCms] = useState(null);

  // Forms
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    order: 0,
  });

  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: "",
    description: "",
    order: 0,
  });

  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    message: "",
    order: 0,
  });

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  // Product CMS
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    pricePerUnit: "",
    minQty: 1,
    maxQty: 1000,
    options: "",
    videoUrl: "",
    extraImages: "",
    isActive: true,
  });
  const [productImageFile, setProductImageFile] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);

  // Load main dashboard data
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [u, c, p, q, cm, s, l] = await Promise.all([
          axios.get(`${API_BASE}/users`, authHeader),
          axios.get(`${API_BASE}/categories`),
          axios.get(`${API_BASE}/products`),
          axios.get(`${API_BASE}/quotes`, authHeader),
          axios.get(`${API_BASE}/contact`, authHeader),
          axios.get(`${API_BASE}/settings`),
          axios.get(`${API_BASE}/logs`, authHeader).catch(() => ({ data: [] })),
        ]);
        setUsers(u.data);
        setCategories(c.data);
        setProducts(p.data);
        setQuotes(q.data);
        setContacts(cm.data);
        setSettings(s.data);
        setLogs(l.data);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };
    if (token) {
      fetchAll();
    }
  }, [token]);

  // Load CMS data
  useEffect(() => {
    const fetchCms = async () => {
      try {
        const [srv, port, t, a] = await Promise.all([
          axios.get(`${API_BASE}/services-content`),
          axios.get(`${API_BASE}/portfolio`),
          axios.get(`${API_BASE}/testimonials`),
          axios.get(`${API_BASE}/about`),
        ]);

        setServicesCms(srv.data);
        setPortfolioCms(port.data);
        setTestimonialsCms(t.data);
        setAboutCms(a.data);
      } catch (err) {
        console.error("Failed to load CMS data", err);
      }
    };
    if (token) {
      fetchCms();
    }
  }, [token]);

  if (!user) return null;

  const isAdmin = user.role === "admin";
  const isManagerOrAdmin = user.role === "admin" || user.role === "manager";

  // =============================
  // PRODUCT HANDLERS
  // =============================

  const handleProductFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProductImageChange = (e) => {
    const file = e.target.files?.[0];
    setProductImageFile(file || null);
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product._id);
    setNewProduct({
      name: product.name || "",
      description: product.description || "",
      category: product.category?._id || "",
      pricePerUnit: product.pricePerUnit?.toString() || "",
      minQty: product.minQty || 1,
      maxQty: product.maxQty || 1000,
      options: product.options ? product.options.join(", ") : "",
      videoUrl: product.videoUrl || "",
      extraImages: product.extraImages ? product.extraImages.join(", ") : "",
      isActive: product.isActive,
    });
    setProductImageFile(null);
    setActiveTab("products");
  };

  const handleResetProductForm = () => {
    setEditingProductId(null);
    setNewProduct({
      name: "",
      description: "",
      category: "",
      pricePerUnit: "",
      minQty: 1,
      maxQty: 1000,
      options: "",
      videoUrl: "",
      extraImages: "",
      isActive: true,
    });
    setProductImageFile(null);
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.category) {
      alert("Please select a category.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("category", newProduct.category);
      formData.append("pricePerUnit", newProduct.pricePerUnit);
      formData.append("minQty", newProduct.minQty);
      formData.append("maxQty", newProduct.maxQty);
      formData.append("options", newProduct.options);
      formData.append("videoUrl", newProduct.videoUrl);
      formData.append("extraImages", newProduct.extraImages);
      formData.append("isActive", newProduct.isActive ? "true" : "false");

      if (productImageFile) {
        formData.append("image", productImageFile);
      }

      let res;
      if (editingProductId) {
        res = await axios.put(
          `${API_BASE}/products/${editingProductId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setProducts((prev) =>
          prev.map((p) => (p._id === editingProductId ? res.data : p))
        );
      } else {
        res = await axios.post(`${API_BASE}/products`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setProducts((prev) => [...prev, res.data]);
      }

      handleResetProductForm();
    } catch (err) {
      console.error("Failed to save product", err);
      alert("Could not save product. Please check console for details.");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API_BASE}/products/${id}`, authHeader);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      if (editingProductId === id) {
        handleResetProductForm();
      }
    } catch (err) {
      console.error("Failed to delete product", err);
      alert("Could not delete product.");
    }
  };

  // =============================
  // CATEGORY HANDLERS
  // =============================

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_BASE}/categories`,
        {
          name: newCategory.name,
          description: newCategory.description,
        },
        authHeader
      );
      setCategories((prev) => [...prev, res.data]);
      setNewCategory({ name: "", description: "" });
    } catch (err) {
      console.error("Failed to create category", err);
      alert("Could not create category. Check console for details.");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await axios.delete(`${API_BASE}/categories/${id}`, authHeader);
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Failed to delete category", err);
      alert("Could not delete category.");
    }
  };

  // =============================
  // SERVICES / PORTFOLIO / TESTIMONIAL / ABOUT HANDLERS
  // =============================

  // Services
  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_BASE}/services-content`,
        {
          title: newService.title,
          description: newService.description,
          order: Number(newService.order) || 0,
        },
        authHeader
      );
      setServicesCms((prev) => [...prev, res.data]);
      setNewService({ title: "", description: "", order: 0 });
    } catch (err) {
      console.error("Failed to create service", err);
      alert("Could not create service. Check console for details.");
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await axios.delete(`${API_BASE}/services-content/${id}`, authHeader);
      setServicesCms((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Failed to delete service", err);
      alert("Could not delete service.");
    }
  };

  // Portfolio
  const handleCreatePortfolio = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_BASE}/portfolio`,
        {
          title: newPortfolioItem.title,
          description: newPortfolioItem.description,
          order: Number(newPortfolioItem.order) || 0,
        },
        authHeader
      );
      setPortfolioCms((prev) => [...prev, res.data]);
      setNewPortfolioItem({ title: "", description: "", order: 0 });
    } catch (err) {
      console.error("Failed to create portfolio item", err);
      alert("Could not create portfolio item.");
    }
  };

  const handleDeletePortfolio = async (id) => {
    if (!window.confirm("Delete this portfolio item?")) return;
    try {
      await axios.delete(`${API_BASE}/portfolio/${id}`, authHeader);
      setPortfolioCms((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Failed to delete portfolio item", err);
      alert("Could not delete portfolio item.");
    }
  };

  // Testimonials
  const handleCreateTestimonial = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_BASE}/testimonials`,
        {
          name: newTestimonial.name,
          role: newTestimonial.role,
          message: newTestimonial.message,
          order: Number(newTestimonial.order) || 0,
        },
        authHeader
      );
      setTestimonialsCms((prev) => [...prev, res.data]);
      setNewTestimonial({ name: "", role: "", message: "", order: 0 });
    } catch (err) {
      console.error("Failed to create testimonial", err);
      alert("Could not create testimonial.");
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await axios.delete(`${API_BASE}/testimonials/${id}`, authHeader);
      setTestimonialsCms((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Failed to delete testimonial", err);
      alert("Could not delete testimonial.");
    }
  };

  // About content
  const handleUpdateAbout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_BASE}/about`, aboutCms, authHeader);
      setAboutCms(res.data);
      alert("About content updated.");
    } catch (err) {
      console.error("Failed to update about content", err);
      alert("Could not update about content.");
    }
  };

  const handleAboutChange = (e) => {
    const { name, value } = e.target;
    setAboutCms((prev) => ({ ...prev, [name]: value }));
  };

  // =============================
  // RENDER
  // =============================

  return (
    <div className="page-container admin-page">
      <h1>Admin Dashboard</h1>
      <p className="small-text">
        Logged in as {user.name} ({user.role})
      </p>
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <button
            className={activeTab === "overview" ? "is-active" : ""}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>

          {isAdmin && (
            <button
              className={activeTab === "users" ? "is-active" : ""}
              onClick={() => setActiveTab("users")}
            >
              Users
            </button>
          )}

          <button
            className={activeTab === "categories" ? "is-active" : ""}
            onClick={() => setActiveTab("categories")}
          >
            Categories
          </button>

          <button
            className={activeTab === "products" ? "is-active" : ""}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>

          <button
            className={activeTab === "quotes" ? "is-active" : ""}
            onClick={() => setActiveTab("quotes")}
          >
            Quotes
          </button>

          <button
            className={activeTab === "contacts" ? "is-active" : ""}
            onClick={() => setActiveTab("contacts")}
          >
            Contact Messages
          </button>

          {isManagerOrAdmin && (
            <>
              <button
                className={activeTab === "servicesCms" ? "is-active" : ""}
                onClick={() => setActiveTab("servicesCms")}
              >
                Services CMS
              </button>
              <button
                className={activeTab === "portfolioCms" ? "is-active" : ""}
                onClick={() => setActiveTab("portfolioCms")}
              >
                Portfolio CMS
              </button>
              <button
                className={activeTab === "testimonialsCms" ? "is-active" : ""}
                onClick={() => setActiveTab("testimonialsCms")}
              >
                Testimonials CMS
              </button>
            </>
          )}

          {isAdmin && (
            <>
              <button
                className={activeTab === "aboutCms" ? "is-active" : ""}
                onClick={() => setActiveTab("aboutCms")}
              >
                About Content
              </button>
              <button
                className={activeTab === "settings" ? "is-active" : ""}
                onClick={() => setActiveTab("settings")}
              >
                Settings
              </button>
              <button
                className={activeTab === "logs" ? "is-active" : ""}
                onClick={() => setActiveTab("logs")}
              >
                Logs
              </button>
            </>
          )}
        </aside>

        <section className="admin-content">
          {/* -------- Overview -------- */}
          {activeTab === "overview" && (
            <div className="card-grid">
              <div className="card">
                <h3>Total Products</h3>
                <p>{products.length}</p>
              </div>
              <div className="card">
                <h3>Open Quotes</h3>
                <p>{quotes.filter((q) => q.status === "New").length}</p>
              </div>
              <div className="card">
                <h3>New Contact Messages</h3>
                <p>{contacts.filter((c) => c.status === "New").length}</p>
              </div>
            </div>
          )}

          {/* -------- Users -------- */}
          {activeTab === "users" && isAdmin && (
            <div>
              <h2>User Management</h2>
              <table className="simple-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                      <td>{u.isActive ? "Active" : "Inactive"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="small-text">
                For simplicity, role and status changes can be done via API
                calls or extended UI.
              </p>
            </div>
          )}

          {/* -------- Categories (Add + List + Delete) -------- */}
          {activeTab === "categories" && (
            <div>
              <h2>Categories</h2>

              <form className="simple-form" onSubmit={handleCreateCategory}>
                <div className="form-group">
                  <label>Category Name</label>
                  <input
                    value={newCategory.name}
                    onChange={(e) =>
                      setNewCategory((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) =>
                      setNewCategory((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
                <button className="btn-primary" type="submit">
                  Add Category
                </button>
              </form>

              <h3 style={{ marginTop: "1.5rem" }}>Existing Categories</h3>
              <ul>
                {categories.map((c) => (
                  <li key={c._id}>
                    <strong>{c.name}</strong> - {c.description}{" "}
                    <button
                      className="btn-link"
                      type="button"
                      onClick={() => handleDeleteCategory(c._id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* -------- Products (Full CRUD + Media) -------- */}
          {activeTab === "products" && (
            <div>
              <h2>Products</h2>

              {/* Product Form */}
              <form className="simple-form" onSubmit={handleSubmitProduct}>
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    name="name"
                    value={newProduct.name}
                    onChange={handleProductFieldChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={newProduct.description}
                    onChange={handleProductFieldChange}
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={newProduct.category}
                    onChange={handleProductFieldChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Price per Unit (₹){" "}
                    <span style={{ fontSize: "12px", color: "#666" }}>
                      (optional)
                    </span>
                  </label>
                  <input
                    type="number"
                    name="pricePerUnit"
                    value={newProduct.pricePerUnit}
                    placeholder="Leave blank if price on request"
                    onChange={handleProductFieldChange}
                  />
                </div>

                <div className="form-group">
                  <label>Min Quantity</label>
                  <input
                    type="number"
                    name="minQty"
                    value={newProduct.minQty}
                    onChange={handleProductFieldChange}
                  />
                </div>

                <div className="form-group">
                  <label>Max Quantity</label>
                  <input
                    type="number"
                    name="maxQty"
                    value={newProduct.maxQty}
                    onChange={handleProductFieldChange}
                  />
                </div>

                <div className="form-group">
                  <label>Options (comma separated)</label>
                  <input
                    name="options"
                    placeholder="Gloss, Matte, 350 GSM, etc."
                    value={newProduct.options}
                    onChange={handleProductFieldChange}
                  />
                </div>

                <div className="form-group">
                  <label>Main Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProductImageChange}
                  />
                  {editingProductId && (
                    <p className="small-text">
                      Leave empty to keep existing image.
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label>Video URL (optional)</label>
                  <input
                    name="videoUrl"
                    placeholder="https://youtube.com/..."
                    value={newProduct.videoUrl}
                    onChange={handleProductFieldChange}
                  />
                </div>

                <div className="form-group">
                  <label>Extra Image URLs (comma separated)</label>
                  <input
                    name="extraImages"
                    placeholder="https://..., https://..."
                    value={newProduct.extraImages}
                    onChange={handleProductFieldChange}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={newProduct.isActive}
                      onChange={handleProductFieldChange}
                    />{" "}
                    Active
                  </label>
                </div>

                <div>
                  <button className="btn-primary" type="submit">
                    {editingProductId ? "Update Product" : "Create Product"}
                  </button>
                  {editingProductId && (
                    <button
                      type="button"
                      className="btn-secondary"
                      style={{ marginLeft: "0.5rem" }}
                      onClick={handleResetProductForm}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>

              {/* Product List */}
              <h3 style={{ marginTop: "2rem" }}>Existing Products</h3>
              <table className="simple-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price / Unit</th>
                    <th>Active</th>
                    <th>Media</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p._id}>
                      <td>{p.name}</td>
                      <td>{p.category?.name}</td>
                      <td>{p.pricePerUnit ? `₹${p.pricePerUnit}` : "N/A"}</td>
                      <td>{p.isActive ? "Yes" : "No"}</td>
                      <td>
                        {p.imageUrl && (
                          <span className="small-text">Image ✓ </span>
                        )}
                        {p.videoUrl && (
                          <span className="small-text">Video ✓ </span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn-link"
                          type="button"
                          onClick={() => handleEditProduct(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-link"
                          type="button"
                          onClick={() => handleDeleteProduct(p._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="small-text">
                You can upload one main image per product and link extra images
                or videos via URLs.
              </p>
            </div>
          )}

          {/* -------- Quotes -------- */}
          {activeTab === "quotes" && (
            <div>
              <h2>Quotes</h2>
              <table className="simple-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((q) => (
                    <tr key={q._id}>
                      <td>{q.customerName}</td>
                      <td>{q.email}</td>
                      <td>{q.product?.name}</td>
                      <td>{q.quantity}</td>
                      <td>{q.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* -------- Contacts -------- */}
          {activeTab === "contacts" && (
            <div>
              <h2>Contact Messages</h2>
              <table className="simple-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>
                      <td>{c.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* -------- Services CMS -------- */}
          {activeTab === "servicesCms" && isManagerOrAdmin && (
            <div>
              <h2>Services CMS</h2>
              <form className="simple-form" onSubmit={handleCreateService}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    value={newService.title}
                    onChange={(e) =>
                      setNewService((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newService.description}
                    onChange={(e) =>
                      setNewService((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Order (optional)</label>
                  <input
                    type="number"
                    value={newService.order}
                    onChange={(e) =>
                      setNewService((prev) => ({
                        ...prev,
                        order: e.target.value,
                      }))
                    }
                  />
                </div>
                <button className="btn-primary" type="submit">
                  Add Service
                </button>
              </form>

              <h3 style={{ marginTop: "1.5rem" }}>Existing Services</h3>
              <ul>
                {servicesCms.map((s) => (
                  <li key={s._id}>
                    <strong>{s.title}</strong> - {s.description}{" "}
                    <button
                      className="btn-link"
                      type="button"
                      onClick={() => handleDeleteService(s._id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* -------- Portfolio CMS -------- */}
          {activeTab === "portfolioCms" && isManagerOrAdmin && (
            <div>
              <h2>Portfolio CMS</h2>
              <form className="simple-form" onSubmit={handleCreatePortfolio}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    value={newPortfolioItem.title}
                    onChange={(e) =>
                      setNewPortfolioItem((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newPortfolioItem.description}
                    onChange={(e) =>
                      setNewPortfolioItem((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Order (optional)</label>
                  <input
                    type="number"
                    value={newPortfolioItem.order}
                    onChange={(e) =>
                      setNewPortfolioItem((prev) => ({
                        ...prev,
                        order: e.target.value,
                      }))
                    }
                  />
                </div>
                <button className="btn-primary" type="submit">
                  Add Portfolio Item
                </button>
              </form>

              <h3 style={{ marginTop: "1.5rem" }}>Existing Portfolio Items</h3>
              <ul>
                {portfolioCms.map((p) => (
                  <li key={p._id}>
                    <strong>{p.title}</strong> - {p.description}{" "}
                    <button
                      className="btn-link"
                      type="button"
                      onClick={() => handleDeletePortfolio(p._id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* -------- Testimonials CMS -------- */}
          {activeTab === "testimonialsCms" && isManagerOrAdmin && (
            <div>
              <h2>Testimonials CMS</h2>
              <form className="simple-form" onSubmit={handleCreateTestimonial}>
                <div className="form-group">
                  <label>Client Name</label>
                  <input
                    value={newTestimonial.name}
                    onChange={(e) =>
                      setNewTestimonial((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Role / Company (optional)</label>
                  <input
                    value={newTestimonial.role}
                    onChange={(e) =>
                      setNewTestimonial((prev) => ({
                        ...prev,
                        role: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    value={newTestimonial.message}
                    onChange={(e) =>
                      setNewTestimonial((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Order (optional)</label>
                  <input
                    type="number"
                    value={newTestimonial.order}
                    onChange={(e) =>
                      setNewTestimonial((prev) => ({
                        ...prev,
                        order: e.target.value,
                      }))
                    }
                  />
                </div>
                <button className="btn-primary" type="submit">
                  Add Testimonial
                </button>
              </form>

              <h3 style={{ marginTop: "1.5rem" }}>Existing Testimonials</h3>
              <ul>
                {testimonialsCms.map((t) => (
                  <li key={t._id}>
                    <strong>{t.name}</strong> {t.role ? `(${t.role})` : ""} – "
                    {t.message}"{" "}
                    <button
                      className="btn-link"
                      type="button"
                      onClick={() => handleDeleteTestimonial(t._id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* -------- About CMS -------- */}
          {activeTab === "aboutCms" && isAdmin && (
            <div>
              <h2>About Content</h2>
              {aboutCms ? (
                <form className="simple-form" onSubmit={handleUpdateAbout}>
                  <div className="form-group">
                    <label>Heading</label>
                    <input
                      name="heading"
                      value={aboutCms.heading || ""}
                      onChange={handleAboutChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Section 1</label>
                    <textarea
                      name="section1"
                      value={aboutCms.section1 || ""}
                      onChange={handleAboutChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Section 2</label>
                    <textarea
                      name="section2"
                      value={aboutCms.section2 || ""}
                      onChange={handleAboutChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Section 3</label>
                    <textarea
                      name="section3"
                      value={aboutCms.section3 || ""}
                      onChange={handleAboutChange}
                    />
                  </div>
                  <button className="btn-primary" type="submit">
                    Save About Content
                  </button>
                </form>
              ) : (
                <p>Loading about content...</p>
              )}
            </div>
          )}

          {/* -------- Settings -------- */}
          {activeTab === "settings" && isAdmin && (
            <div>
              <h2>Basic Settings</h2>
              {settings ? (
                <ul>
                  <li>Company Name: {settings.companyName}</li>
                  <li>Email: {settings.email}</li>
                  <li>Phone: {settings.phone}</li>
                  <li>Address: {settings.address}</li>
                </ul>
              ) : (
                <p>No settings saved yet.</p>
              )}
              <p className="small-text">
                For a full settings UI, you can add forms and update via the
                settings API.
              </p>
            </div>
          )}

          {/* -------- Logs -------- */}
          {activeTab === "logs" && isAdmin && (
            <div>
              <h2>Logs</h2>
              <ul className="log-list">
                {logs.map((l) => (
                  <li key={l._id}>
                    <strong>{l.action}</strong> - {l.user?.email} -{" "}
                    {new Date(l.createdAt).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
