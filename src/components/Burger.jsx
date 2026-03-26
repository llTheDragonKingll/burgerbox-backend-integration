import burger1 from "../assets/burger1.jpeg";
import './Burger.css';
import { motion as Motion } from "framer-motion";

const burgers = [
    {
        id: 1,
        img: burger1,
        price: 14,
        title: "The Void Master",
        descript:
            "Double stacked Wagyu beef, charcoal-grilled with a secret neon sauce and triple aged cheddar",
    },
    {
        id: 2,
        img: burger1,
        price: 12,
        title: "The Fire Beast",
        descript:
            "Spicy flame-grilled patty loaded with jalapeños, molten cheese, and our signature fire sauce",
    },
    {
        id: 3,
        img: burger1,
        price: 15,
        title: "The Cheese Overload",
        descript:
            "Stuffed cheese core, double smash patties, creamy mayo, and toasted butter brioche buns",
    },
    {
        id: 4,
        img: burger1,
        price: 13,
        title: "The Smoky King",
        descript:
            "Smoky BBQ glazed patties with crispy onions, bacon strips, and cheddar melt",
    },
    {
        id: 5,
        img: burger1,
        price: 16,
        title: "The Titan Stack",
        descript:
            "Triple layered meat stack with cheese, lettuce, tomato, and house special titan sauce",
    },
    {
        id: 6,
        img: burger1,
        price: 11,
        title: "The Classic Hero",
        descript:
            "Juicy grilled patty with fresh lettuce, tomato, pickles, and classic burger sauce",
    },
];

export default function Burger() {
    return (
        <Motion.div className="burger-container" initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}>
            {burgers.map((burger) => (
                <div className="card">
                    <img src={burger.img} alt="" />
                    <p>${burger.price}</p>
                    <p>{burger.title}</p>
                    <p>{burger.descript}</p>

                </div>
            ))}

        </Motion.div>
    )
}