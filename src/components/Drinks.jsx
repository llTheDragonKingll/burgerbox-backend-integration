import { useCart } from "../CartContext";
import drink1 from "../assets/drink1.png";
import drink2 from "../assets/drink2.png";
import drink3 from "../assets/drink3.png";
import drink4 from "../assets/drink4.png";
import drink5 from "../assets/drink5.png";
import drink6 from "../assets/drink6.png";

const drinks = [
  { id: "d1", category: "drinks", title: "NEON COLA", descript: "Hyper-carbonated cola with a citrus afterburn. Zero chill.", price: 4.50, tag: "CLASSIC", img: drink1, color: "#f97316" },
  { id: "d2", category: "drinks", title: "VOID SHAKE", descript: "Activated charcoal vanilla milkshake with a salted caramel swirl.", price: 8.00, tag: "THICK", img: drink2, color: "#6366f1" },
  { id: "d3", category: "drinks", title: "MANGO REACTOR", descript: "Fresh mango pulp, chili salt rim, carbonated base.", price: 6.50, tag: "TROPICAL", img: drink3, color: "#f59e0b" },
  { id: "d4", category: "drinks", title: "GREASE BUSTER", descript: "Cold-pressed lemon, ginger, and mint.", price: 5.00, tag: "FRESH", img: drink4, color: "#22c55e" },
  { id: "d5", category: "drinks", title: "SMOKE LEMONADE", descript: "Smoked rosemary lemonade.", price: 6.00, tag: "SMOKED", img: drink5, color: "#94a3b8" },
  { id: "d6", category: "drinks", title: "BEAST MODE", descript: "High-caffeine cold brew.", price: 7.00, tag: "ENERGY", img: drink6, color: "#84cc16" },
];

export default function Drinks() {
  const { addToCart } = useCart();

  return (
    <div style={{ background: "#0f0d08", minHeight: "60vh", padding: "40px 32px" }}>
      <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "48px", color: "#fff" }}>
        QUENCH THE <span style={{ color: "#f97316" }}>FIRE.</span>
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {drinks.map(item => (
          <div key={item.id}
            style={{ background: "#1a1208", border: "1px solid #2a2010", borderRadius: "14px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {/* IMAGE */}
            <div style={{ width: "100%", height: "160px", background: "#2a2010", borderRadius: "10px" }}>
              <img src={item.img} alt={item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}
              />
            </div>

            <h3 style={{ color: "#fff" }}>{item.title}</h3>
            <p style={{ color: "#777" }}>{item.descript}</p>
            <span style={{ color: item.color }}>{item.tag}</span>
            <span style={{ color: "#f97316" }}>${item.price.toFixed(2)}</span>

            <button onClick={() => addToCart(item)}
              style={{ background: item.color, border: "none", borderRadius: "8px", color: "#fff", padding: "10px" }}>
              ADD TO BAG
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}