import React from "react";

const FAQPage = () => {
  const faqs = [
    {
      q: "What file formats do you accept?",
      a: "We accept PDF, AI, CDR and high resolution JPG or PNG files.",
    },
    {
      q: "Can you help with design?",
      a: "Yes, our design team can help you create or clean up your artwork.",
    },
    {
      q: "Do you deliver outside the city?",
      a: "Yes, we can ship prints through courier partners across India.",
    },
  ];

  return (
    <div className="page-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((f) => (
          <div key={f.q} className="faq-item">
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
