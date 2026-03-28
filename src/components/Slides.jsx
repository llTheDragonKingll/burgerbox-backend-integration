import { useCart } from "../CartContext";

const sides = [
  { id: "s1", category: "sides", title: "NEON FRIES", descript: "Shoestring fries dusted with neon seasoning and ghost pepper flakes.", price: 5.50, tag: "SPICY" },
  { id: "s2", category: "sides", title: "ONION RINGS OF DOOM", descript: "Thick-cut rings double-battered and deep-fried to a shattering crisp.", price: 6.00, tag: "CRISPY" },
  { id: "s3", category: "sides", title: "MAC BOMB", descript: "Gruyere and smoked gouda mac in a crispy breadcrumb shell.", price: 7.50, tag: "CHEESY" },
  { id: "s4", category: "sides", title: "LOADED SKINS", descript: "Potato skins loaded with pulled brisket, sour cream, and cheddar.", price: 8.00, tag: "LOADED" },
  { id: "s5", category: "sides", title: "COLESLAW HIT", descript: "Tangy apple-cider slaw with a kick of sriracha and toasted sesame.", price: 4.00, tag: "FRESH" },
  { id: "s6", category: "sides", title: "CORN RIBS", descript: "Slow-grilled corn ribs glazed with chipotle honey butter.", price: 6.50, tag: "GLAZED" },
];

const tagColors = {
  SPICY: "#f97316", CRISPY: "#eab308", CHEESY: "#f59e0b",
  LOADED: "#22c55e", FRESH: "#34d399", GLAZED: "#fb923c"
};

export default function Slides() {
  const { addToCart } = useCart();

  return (
    <div style={{ background: "#0f0d08", minHeight: "60vh", padding: "40px 32px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "48px", color: "#fff", margin: 0, letterSpacing: "2px" }}>
          ON THE <span style={{ color: "#f97316" }}>SIDE.</span>
        </h2>
        <p style={{ color: "#666", fontFamily: "sans-serif", fontSize: "13px", margin: "4px 0 0" }}>
          Every great burger deserves a worthy companion.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {sides.map(item => {
          const tagColor = tagColors[item.tag] || "#f97316";
          return (
            <div
              key={item.id}
              style={{ background: "#1a1208", border: "1px solid #2a2010", borderRadius: "14px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px", transition: "border-color 0.2s, transform 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#f97316"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2010"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {/* Image placeholder */}
              <div style={{ width: "100%", height: "160px", background: "#2a2010", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>
                🍟
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
                style={{ marginTop: "auto", background: "#f97316", border: "none", borderRadius: "8px", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "15px", letterSpacing: "1.5px", padding: "10px", cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={e => e.target.style.background = "#ea6c0a"}
                onMouseLeave={e => e.target.style.background = "#f97316"}
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
