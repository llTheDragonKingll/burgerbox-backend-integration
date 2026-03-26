import './Burger.css';
import softie from '../assets/softie.jpeg'
const desserts = [
  {
    id: 1,
    title: "NEON MOUSSE",
    descript: "Hyper-aerated dark chocolate with a pressurized citrus core.",
    price: 12.00,
    img: softie, // Replace with your actual paths
    tag: "AERATED"
  },
  {
    id: 2,
    title: "ATOMIC BROWNIE",
    descript: "Dense 70% cacao fusion, tempered for maximum structural integrity.",
    price: 14.00,
    img: softie,
    tag: "STRETCHED"
  },
  {
    id: 3,
    title: "LIQUID GOLD",
    descript: "Molten lava cake with a volatile salted caramel center.",
    price: 15.00,
    img: softie,
    tag: "MOLTEN"
  },
  {
    id: 4,
    title: "CARBON CHEESECAKE",
    descript: "Activated charcoal crust with a silky, high-density cream filling.",
    price: 13.00,
    img: softie,
    tag: "TEXTURED"
  },

  {
    img: softie,
    price: 16,
    title: "VAPOR TART",
    descript: "Cryogenic berry infusion layered with a molecular vanilla vapor crust."
  },
  {
    img: softie, 
    price: 18,
    title: "PLASMA PARFAIT",
    descript: "Hyper-saturated fruit reduction suspended in a dense, velvet-smooth cream."
  }
];

export default function Deserts() {
  return (

    <div className="burger-container"> {/* You can reuse the same container class for layout */}
      {desserts.map((dessert, index) => (
        <div className="card" key={index}>
          <img src={dessert.img} alt={dessert.title} />
          <div className="card-info">
            <p className="price">${dessert.price.toFixed(2)}</p>
            <p className="title">{dessert.title}</p>
            <p className="description">{dessert.descript}</p>
          </div>
        </div>
      ))}
    </div>

  )
}