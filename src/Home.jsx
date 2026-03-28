import Burger from "./components/Burger.jsx";
import Deserts from "./components/Deserts.jsx";
import Drinks from "./components/Drinks.jsx";
import Slides from "./components/Slides.jsx";
import './Home.css';
import { useState } from "react";
import { motion as Motion } from "framer-motion";


export default function Home() {
  const [change, setchange] = useState("Burger");

  function changevarity(e) {
    const changes = e.target.value;
    setchange(changes);
  }

  const components = {
    Burger: Burger,
    slides: Slides,
    Drinks: Drinks,
    Treats: Deserts
  };

  const SelectedComponent = components[change];

  return (
    <>
      <div className="Home">
        <Motion.div
          initial={{ y: -60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
          className="heading">
          <h1>PICK YOUR <span>FOOD</span></h1>
          <p>Engineered for flavours. Built for brave. Explore our range.</p>
        </Motion.div>

        <Motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        
        
        className="varieties">
          <button value="Burger" onClick={changevarity}>Burger</button>
          <button value="slides" onClick={changevarity}>Sides</button>
          <button value="Drinks" onClick={changevarity}>Drinks</button>
          <button value="Treats" onClick={changevarity}>Treats</button>
        </Motion.div>
      </div>

      <SelectedComponent />
    </>
  );
}