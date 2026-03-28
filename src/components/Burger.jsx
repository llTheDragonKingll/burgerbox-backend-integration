import burger1 from "../assets/burger1.jpeg";
import burger2 from "../assets/burger2.jpeg";
import burger3 from "../assets/burger3.jpeg";
import burger4 from "../assets/burger4.jpeg";
import burger5 from "../assets/burger5.jpeg";
import burger6 from "../assets/burger6.jpeg";

import './Burger.css';
import { motion as Motion } from "framer-motion";
import { useCart } from "../CartContext";

const burgers = [
  { id: "b1", category: "burgers", img: burger1, price: 14, title: "The Void Master", descript: "Double stacked Wagyu beef, charcoal-grilled with a secret neon sauce and triple aged cheddar" },
  { id: "b2", category: "burgers", img: burger2, price: 12, title: "The Fire Beast", descript: "Spicy flame-grilled patty loaded with jalapeños, molten cheese, and our signature fire sauce" },
  { id: "b3", category: "burgers", img: burger3, price: 15, title: "The Cheese Overload", descript: "Stuffed cheese core, double smash patties, creamy mayo, and toasted butter brioche buns" },
  { id: "b4", category: "burgers", img: burger4, price: 13, title: "The Smoky King", descript: "Smoky BBQ glazed patties with crispy onions, bacon strips, and cheddar melt" },
  { id: "b5", category: "burgers", img: burger5, price: 16, title: "The Titan Stack", descript: "Triple layered meat stack with cheese, lettuce, tomato, and house special titan sauce" },
  { id: "b6", category: "burgers", img: burger6, price: 11, title: "The Classic Hero", descript: "Juicy grilled patty with fresh lettuce, tomato, pickles, and classic burger sauce" },
];

export default function Burger() {
  const { addToCart } = useCart();

  return (
    <Motion.div
      className="burger-container"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {burgers.map((burger) => (
        <div className="card" key={burger.id}>
          <img src={burger.img} alt={burger.title} />
          <p>${burger.price}</p>
          <p>{burger.title}</p>
          <p>{burger.descript}</p>
          <button
            className="add-btn"
            onClick={() => addToCart(burger)}
          >
            ADD TO BAG
          </button>
        </div>
      ))}
    </Motion.div>
  );
}
