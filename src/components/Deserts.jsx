import { useCart } from "../CartContext";
import desert1 from "../assets/desert1.png";
import desert2 from "../assets/desert2.png";
import desert3 from "../assets/desert3.png";
import desert4 from "../assets/desert4.png";
import desert5 from "../assets/desert5.png";
import desert6 from "../assets/desert6.png";
import { motion as Motion } from "framer-motion";
const deserts = [
  { id: "ds1", category: "deserts", title: "NEON MOUSSE", descript: "Hyper-aerated dark chocolate with a citrus core.", price: 12.00, tag: "AERATED", img: desert1 },
  { id: "ds2", category: "deserts", title: "ATOMIC BROWNIE", descript: "Dense 70% cacao fusion brownie.", price: 14.00, tag: "STRETCHED", img: desert2 },
  { id: "ds3", category: "deserts", title: "LIQUID GOLD", descript: "Molten lava cake with salted caramel center.", price: 15.00, tag: "MOLTEN", img: desert3 },
  { id: "ds4", category: "deserts", title: "CARBON CHEESECAKE", descript: "Charcoal crust creamy cheesecake.", price: 13.00, tag: "TEXTURED", img: desert4 },
  { id: "ds5", category: "deserts", title: "VAPOR TART", descript: "Berry tart with vanilla crust.", price: 16.00, tag: "CRYO", img: desert5 },
  { id: "ds6", category: "deserts", title: "PLASMA PARFAIT", descript: "Fruit parfait with smooth cream.", price: 18.00, tag: "DENSE", img: desert6 },
];

const tagColors = {
  AERATED: "#f97316",
  STRETCHED: "#6366f1",
  MOLTEN: "#ef4444",
  TEXTURED: "#eab308",
  CRYO: "#38bdf8",
  DENSE: "#a855f7"
};

export default function Deserts() {
  const { addToCart } = useCart();

  return (
    <div style={{ background: "#0f0d08", minHeight: "60vh", padding: "40px 32px" }}>
      
      {/* Heading */}
      <Motion.div 
      initial={{ y: -60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, amount: 0.3 }}
      
      style={{ marginBottom: "32px" }}>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "48px",
          color: "#fff",
          margin: 0,
          letterSpacing: "2px"
        }}>
          END ON A <span style={{ color: "#f97316" }}>HIGH.</span>
        </h2>

        <p style={{
          color: "#666",
          fontFamily: "sans-serif",
          fontSize: "13px",
          margin: "4px 0 0"
        }}>
          Deserts engineered for maximum indulgence.
        </p>
      </Motion.div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "16px"
      }}>
        {deserts.map(item => {
          const tagColor = tagColors[item.tag];

          return (
            <Motion.div
             initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, amount: 0.3 }}
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
                e.currentTarget.style.borderColor = tagColor;
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
                height: "160px",
                background: "#2a2010",
                borderRadius: "10px"
              }}>
                <img
                  src={item.img}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px"
                  }}
                />
              </div>

              {/* Tag + Price */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{
                  background: tagColor + "22",
                  color: tagColor,
                  fontSize: "10px",
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
                  margin: "0 0 4px"
                }}>
                  {item.title}
                </h3>

                <p style={{
                  color: "#777",
                  fontSize: "12px",
                  margin: 0
                }}>
                  {item.descript}
                </p>
              </div>

              {/* Button */}
              <button
                onClick={() => addToCart(item)}
                style={{
                  marginTop: "auto",
                  background: tagColor,
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "15px",
                  letterSpacing: "1.5px",
                  padding: "10px",
                  cursor: "pointer"
                }}
              >
                ADD TO BAG
              </button>

            </Motion.div>
          );
        })}
      </div>
    </div>
  );
}