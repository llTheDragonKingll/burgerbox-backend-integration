import { useCart } from "../CartContext";

import burger1 from "../assets/burger1.jpeg";
import burger2 from "../assets/burger2.jpeg";
import burger3 from "../assets/burger3.jpeg";
import burger4 from "../assets/burger4.jpeg";
import burger5 from "../assets/burger5.jpeg";
import burger6 from "../assets/burger6.jpeg";

const burgers = [
  { id: "b1", category: "burgers", title: "VOID MASTER", descript: "Double stacked Wagyu beef, charcoal-grilled with a secret neon sauce and triple aged cheddar.", price: 14, tag: "SIGNATURE", img: burger1 },
  { id: "b2", category: "burgers", title: "FIRE BEAST", descript: "Spicy flame-grilled patty loaded with jalapeños, molten cheese, and fire sauce.", price: 12, tag: "SPICY", img: burger2 },
  { id: "b3", category: "burgers", title: "CHEESE OVERLOAD", descript: "Stuffed cheese core, double smash patties, creamy mayo, toasted brioche buns.", price: 15, tag: "CHEESY", img: burger3 },
  { id: "b4", category: "burgers", title: "SMOKY KING", descript: "Smoky BBQ glazed patties with crispy onions, bacon strips, and cheddar melt.", price: 13, tag: "SMOKY", img: burger4 },
  { id: "b5", category: "burgers", title: "TITAN STACK", descript: "Triple layered meat stack with cheese, lettuce, tomato, and titan sauce.", price: 16, tag: "HEAVY", img: burger5 },
  { id: "b6", category: "burgers", title: "CLASSIC HERO", descript: "Juicy grilled patty with lettuce, tomato, pickles, and classic sauce.", price: 11, tag: "CLASSIC", img: burger6 },
];

const tagColors = {
  SIGNATURE: "#f97316",
  SPICY: "#ef4444",
  CHEESY: "#eab308",
  SMOKY: "#6b7280",
  HEAVY: "#22c55e",
  CLASSIC: "#38bdf8"
};

export default function Burger() {
  const { addToCart } = useCart();

  return (
    <div style={{ background: "#0f0d08", minHeight: "60vh", padding: "40px 32px" }}>

      {/* Heading */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "48px", color: "#fff", margin: 0, letterSpacing: "2px" }}>
          THE <span style={{ color: "#f97316" }}>BURGERS.</span>
        </h2>
        <p style={{ color: "#666", fontFamily: "sans-serif", fontSize: "13px", margin: "4px 0 0" }}>
          Built different. Built for legends.
        </p>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {burgers.map(item => {
          const tagColor = tagColors[item.tag] || "#f97316";
          return (
            <div
              key={item.id}
              style={{
                background: "#1a1208",
                border: "1px solid #2a2010",
                borderRadius: "14px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                transition: "border-color 0.2s, transform 0.2s"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#f97316";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#2a2010";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Image */}
              <div style={{
                width: "100%",
                height: "180px",
                borderRadius: "12px",
                overflow: "hidden",
                background: "#2a2010"
              }}>
                <img
                  src={item.img}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center"
                  }}
                />
              </div>

              {/* Tag + Price */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{
                  background: tagColor + "22",
                  color: tagColor,
                  fontSize: "10px",
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  padding: "3px 10px",
                  borderRadius: "999px",
                  border: `1px solid ${tagColor}44`
                }}>
                  {item.tag}
                </div>
                <span style={{
                  color: "#f97316",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "22px"
                }}>
                  ${item.price.toFixed(2)}
                </span>
              </div>

              {/* Title + Description */}
              <div>
                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "22px",
                  color: "#fff",
                  margin: "0 0 4px",
                  letterSpacing: "1px"
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: "#777",
                  fontFamily: "sans-serif",
                  fontSize: "12px",
                  margin: 0,
                  lineHeight: 1.5
                }}>
                  {item.descript}
                </p>
              </div>

              {/* Button */}
              <button
                onClick={() => addToCart(item)}
                style={{
                  marginTop: "auto",
                  background: "#f97316",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "15px",
                  letterSpacing: "1.5px",
                  padding: "10px",
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
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