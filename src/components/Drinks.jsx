import { useCart } from "../CartContext";

const drinks = [
  { id: "d1", category: "drinks", title: "NEON COLA", descript: "Hyper-carbonated cola with a citrus afterburn. Zero chill.", price: 4.50, tag: "CLASSIC", color: "#f97316" },
  { id: "d2", category: "drinks", title: "VOID SHAKE", descript: "Activated charcoal vanilla milkshake with a salted caramel swirl.", price: 8.00, tag: "THICK", color: "#6366f1" },
  { id: "d3", category: "drinks", title: "MANGO REACTOR", descript: "Fresh mango pulp, chili salt rim, carbonated base. Tropical chaos.", price: 6.50, tag: "TROPICAL", color: "#f59e0b" },
  { id: "d4", category: "drinks", title: "GREASE BUSTER", descript: "Cold-pressed lemon, ginger, and mint. The antidote.", price: 5.00, tag: "FRESH", color: "#22c55e" },
  { id: "d5", category: "drinks", title: "SMOKE LEMONADE", descript: "Smoked rosemary lemonade with a hickory-kissed ice cube.", price: 6.00, tag: "SMOKED", color: "#94a3b8" },
  { id: "d6", category: "drinks", title: "BEAST MODE", descript: "High-caffeine cold brew with oat milk and brown sugar syrup.", price: 7.00, tag: "ENERGY", color: "#84cc16" },
];

export default function Drinks() {
  const { addToCart } = useCart();

  return (
    <div style={{ background: "#0f0d08", minHeight: "60vh", padding: "40px 32px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "48px", color: "#fff", margin: 0, letterSpacing: "2px" }}>
          QUENCH THE <span style={{ color: "#f97316" }}>FIRE.</span>
        </h2>
        <p style={{ color: "#666", fontFamily: "sans-serif", fontSize: "13px", margin: "4px 0 0" }}>
          Bold drinks for bold hunger.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {drinks.map(item => (
          <div
            key={item.id}
            style={{ background: "#1a1208", border: "1px solid #2a2010", borderRadius: "14px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px", transition: "border-color 0.2s, transform 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2010"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            {/* Image placeholder */}
            <div style={{ width: "100%", height: "160px", background: item.color + "22", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "56px" }}>
              🥤
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ background: item.color + "22", color: item.color, fontSize: "10px", fontFamily: "sans-serif", fontWeight: 700, letterSpacing: "1.5px", padding: "3px 10px", borderRadius: "999px" }}>
                {item.tag}
              </span>
              <span style={{ color: "#f97316", fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px" }}>${item.price.toFixed(2)}</span>
            </div>

            <div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", color: "#fff", margin: "0 0 4px", letterSpacing: "1px" }}>{item.title}</h3>
              <p style={{ color: "#777", fontFamily: "sans-serif", fontSize: "12px", margin: 0, lineHeight: 1.5 }}>{item.descript}</p>
            </div>

            <button
              onClick={() => addToCart(item)}
              style={{ marginTop: "auto", background: item.color, border: "none", borderRadius: "8px", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "15px", letterSpacing: "1.5px", padding: "10px", cursor: "pointer", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.target.style.opacity = "0.85"}
              onMouseLeave={e => e.target.style.opacity = "1"}
            >
              ADD TO BAG
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
