import Burger from "./components/Burger.jsx";
import Deserts from "./components/Deserts.jsx";
import Drinks from "./components/Drinks.jsx";
import Slides from "./components/Slides.jsx";
import './Home.css';
import { useState } from "react";

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
        <div className="heading">
          <h1>PICK YOUR <span>FOOD</span></h1>
          <p>Engineered for flavours. Built for brave. Explore our range.</p>
        </div>

        <div className="varieties">
          <button value="Burger" onClick={changevarity}>Burger</button>
          <button value="slides" onClick={changevarity}>Slides</button>
          <button value="Drinks" onClick={changevarity}>Drinks</button>
          <button value="Treats" onClick={changevarity}>Treats</button>
        </div>
      </div>

      <SelectedComponent />
    </>
  );
}