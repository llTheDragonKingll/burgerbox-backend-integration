import { useCart } from "../CartContext";
// Replace null with your actual image imports once you have them:
// import softie from '../assets/softie.jpeg';

const desserts = [
  { id: "ds1", category: "desserts", title: "NEON MOUSSE", descript: "Hyper-aerated dark chocolate with a pressurized citrus core.", price: 12.00, img: null, tag: "AERATED" },
  { id: "ds2", category: "desserts", title: "ATOMIC BROWNIE", descript: "Dense 70% cacao fusion, tempered for maximum structural integrity.", price: 14.00, img: null, tag: "STRETCHED" },
  { id: "ds3", category: "desserts", title: "LIQUID GOLD", descript: "Molten lava cake with a volatile salted caramel center.", price: 15.00, img: null, tag: "MOLTEN" },
  { id: "ds4", category: "desserts", title: "CARBON CHEESECAKE", descript: "Activated charcoal crust with a silky, high-density cream filling.", price: 13.00, img: null, tag: "TEXTURED" },
  { id: "ds5", category: "desserts", title: "VAPOR TART", descript: "Cryogenic berry infusion layered with a molecular vanilla vapor crust.", price: 16.00, img: null, tag: "CRYO" },
  { id: "ds6", category: "desserts", title: "PLASMA PARFAIT", descript: "Hyper-saturated fruit reduction suspended in a dense, velvet-smooth cream.", price: 18.00, img: null, tag: "DENSE" },
];

const tagColors = {
  AERATED: "#f97316", STRETCHED: "#6366f1", MOLTEN: "#ef4444",
  TEXTURED: "#eab308", CRYO: "#38bdf8", DENSE: "#a855f7"
};

export default function Deserts() {
  const { addToCart } = useCart();

  return (
    <div style={{ background: "#0f0d08", minHeight: "60vh", padding: "40px 32px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "48px", color: "#fff", margin: 0, letterSpacing: "2px" }}>
          END ON A <span style={{ color: "#f97316" }}>HIGH.</span>
        </h2>
        <p style={{ color: "#666", fontFamily: "sans-serif", fontSize: "13px", margin: "4px 0 0" }}>
          Desserts engineered for maximum indulgence.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {desserts.map(item => {
          const tagColor = tagColors[item.tag] || "#f97316";
          return (
            <div
              key={item.id}
              style={{ background: "#1a1208", border: "1px solid #2a2010", borderRadius: "14px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px", transition: "border-color 0.2s, transform 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = tagColor; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2010"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {/* Image — swap emoji for <img> once you add images */}
              <div style={{ width: "100%", height: "160px", background: tagColor + "22", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "56px" }}>
                {item.img ? <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} /> : "🍫"}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ background: tagColor + "22", color: tagColor, fontSize: "10px", fontFamily: "sans-serif", fontWeight: 700, letterSpacing: "1.5px", padding: "3px 10px", borderRadius: "999px", border: `1px solid ${tagColor}44` }}>
                  {item.tag}
                </div>
                <span style={{ color: "#f97316", fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px" }}>${item.price.toFixed(2)}</span>
              </div>

              <div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", color: "#fff", margin: "0 0 4px", letterSpacing: "1px" }}>{item.title}</h3>
                <p style={{ color: "#777", fontFamily: "sans-serif", fontSize: "12px", margin: 0, lineHeight: 1.5 }}>{item.descript}</p>
              </div>

              <button
                onClick={() => addToCart(item)}
                style={{ marginTop: "auto", background: tagColor, border: "none", borderRadius: "8px", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "15px", letterSpacing: "1.5px", padding: "10px", cursor: "pointer", transition: "opacity 0.2s" }}
                onMouseEnter={e => e.target.style.opacity = "0.85"}
                onMouseLeave={e => e.target.style.opacity = "1"}
              >
                ADD TO BAG
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
