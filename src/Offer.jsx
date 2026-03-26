import React from 'react';
import './Offer.css';
import { motion as Motion } from 'framer-motion';

const dealsData = [
  {
    badge: "Tuesdays Only",
    title: "2-For-1 MegaBox",
    desc: "Double the bite, half the price. Every Tuesday at all locations.",
    btnText: "Claim Now",
    type: "primary",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500"
  },
  {
    badge: "New Users",
    title: "Free Neon Fries",
    desc: "Get a glowing box of our signature seasoned fries on your first app order.",
    btnText: "Unlock Treat",
    type: "outline",
    img: "https://www.recipetineats.com/tachyon/2022/09/Fries-with-rosemary-salt_1.jpg"
  },
  {
    badge: "Limited Edition",
    title: "Vortex Shake",
    desc: "A swirl of midnight chocolate and neon mint. Available this week only.",
    btnText: "Grab One",
    type: "outline",
    img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=500"
  }
];

const Offer = () => {
  return (
    <div className="mega-container">
      <header className="header-section">
        <p className="exclusive-tag">Exclusive Drops</p>
        <h1 className="main-title">Mega <span className="highlight-text">Deals</span></h1>
      </header>

      <div className="offers-grid">
        {dealsData.map((deal, index) => (
          <Motion.div 
            key={index}
            className="offer-card"
            whileHover={{ y: -8 }}
          >
            <div className="image-wrapper">
              <img src={deal.img} alt={deal.title} className="offer-img" />
              <span className={`badge ${deal.type === 'primary' ? 'btn-primary' : 'btn-outline'}`}>
                {deal.badge}
              </span>
            </div>
            
            <div className="card-content">
              <h2 className="offer-title">{deal.title.toUpperCase()}</h2>
              <p className="offer-desc">{deal.desc}</p>
              <button className={`claim-btn ${deal.type === 'primary' ? 'btn-primary' : 'btn-outline'}`}>
                {deal.btnText}
              </button>
            </div>
          </Motion.div>
        ))}
      </div>
    </div>
  );
};

export default Offer;