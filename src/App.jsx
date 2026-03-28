import Navbar from "./components/Navbar";
import burger1 from "./assets/burger1.jpeg";
import burger2 from "./assets/burger2.jpeg";
import burger3 from "./assets/burger3.jpeg";
import burger4 from "./assets/burger4.jpeg";
import { useEffect, useState } from "react";
import Home from "./Home.jsx";
import Footer from "./footer.jsx";
import Offer from "./Offer.jsx";
import "./App.css";
import { motion as Motion } from "framer-motion";


function App() {
  const lists = [
    {
      id: 1,
      title: "New Release: THE MEGABOX",
      heading: "STUFF YOUR FACE",
      descript:
        "Forget the diet. Embrace the grease. Our 100% wagyu patties are double-smashed for maximum crust and lethal flavour.",
      button: "Order Now",
      img: burger1,
    },
    {
      id: 2,
      title: "Chef Special: FIRE STACK",
      heading: "FEEL THE HEAT",
      descript:
        "Loaded with jalapeños, spicy sauce and triple cheese. Built for people who love bold flavors and serious heat.",
      button: "Order Now",
      img: burger2,
    },
    {
      id: 3,
      title: "Limited Edition: CHEESE BURST",
      heading: "MELT YOUR MOOD",
      descript:
        "A molten cheese core surrounded by crispy patties and fresh buns. Every bite is a cheese explosion.",
      button: "Order Now",
      img: burger3,
    },
    {
      id: 4,
      title: "Premium Range: SMOKY BBQ",
      heading: "SMOKE THE HUNGER",
      descript:
        "Smoky BBQ sauce, grilled onions and double smashed patties give you the ultimate barbecue experience.",
      button: "Order Now",
      img: burger4,
    },

  ];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % lists.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function nextSlide() {
    setIndex((prev) => (prev + 1) % lists.length);
  }

  function prevSlide() {
    setIndex((prev) => (prev - 1 + lists.length) % lists.length);
  }
  return (
    <>
      <div
      
      
      id="Home" className="Home">
        
        <Motion.button 
         initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }} 
        
        className="prev" onClick={prevSlide}>{"<"}</Motion.button>
        <Motion.div 
         initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }} 
        
        className="new-burgers-add">
          <p>{lists[index].title}</p>
          <h1>{lists[index].heading}</h1>
          <p className="description">{lists[index].descript}</p>
          <button>{lists[index].button}</button>
        </Motion.div>

        <Motion.div
         initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }} 
        className="Add-image">
          <img src={lists[index].img} alt="burger" />
        </Motion.div>
        <Motion.button className="next" onClick={nextSlide}>{">"}</Motion.button>
        
      </div>

      <div id="menu">
        <Home />
      </div>

      <div id="Offers">
        <Offer />
      </div>
      <div>
        <Footer />
      </div>





    </>
  );
}


export default App;