import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { useState, useEffect } from "react";

const STATUSES = [
  { key: "kitchen", label: "KITCHEN", sub: "FLAME GRILLING", icon: "🍳" },
  { key: "transit", label: "IN TRANSIT", sub: "HITTING THE ROAD", icon: "🛵" },
  { key: "door",    label: "AT YOUR DOOR", sub: "GET READY", icon: "📍" },
];

export default function Order() {
  const { id } = useParams();
  const { orders, addToCart } = useCart();
  const navigate = useNavigate();

  const order = orders.find(o => o.id === id) || orders[0];
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (!order) return;
    const t1 = setTimeout(() => setStatusIndex(1), 6000);
    const t2 = setTimeout(() => setStatusIndex(2), 14000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [order?.id]);

  if (!order) {
    return (
      <div style={{ background: "#0f0d08", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "32px", color: "#fff" }}>NO ORDER FOUND</h2>
        <button onClick={() => navigate("/")} style={{ background: "#f97316", border: "none", borderRadius: "999px", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "16px", letterSpacing: "2px", padding: "14px 32px", cursor: "pointer" }}>
          BACK TO MENU
        </button>
      </div>
    );
  }

  const orderTotal = order.items?.reduce((s, i) => s + i.price * i.qty, 0) || 0;
  const fillPct = statusIndex === 0 ? "0%" : statusIndex === 1 ? "50%" : "100%";

  const S = {
    page: { background: "#0f0d08", minHeight: "100vh", color: "#fff", fontFamily: "'Bebas Neue', sans-serif" },
    inner: { maxWidth: "1000px", margin: "0 auto", padding: "40px 32px" },
    heading: { fontSize: "60px", lineHeight: 1, margin: "0 0 6px", letterSpacing: "2px" },
    orderMeta: { color: "#666", fontFamily: "sans-serif", fontSize: "13px", margin: "0 0 40px" },
    layout: { display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" },
    trackerCard: { background: "#1a1208", border: "1px solid #2a2010", borderRadius: "14px", padding: "28px", marginBottom: "20px" },
    trackLine: { position: "absolute", top: "28px", left: "40px", right: "40px", height: "4px", background: "#2a2010", zIndex: 0, borderRadius: "2px" },
    trackFill: { position: "absolute", top: "28px", left: "40px", height: "4px", background: "#f97316", zIndex: 1, borderRadius: "2px", transition: "width 1s ease" },
    stepWrap: { display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 2, flex: 1 },
    stepCircle: (active, done) => ({
      width: "56px", height: "56px", borderRadius: "50%",
      background: done ? "#f97316" : active ? "#22c55e" : "#2a2010",
      border: `3px solid ${done ? "#f97316" : active ? "#22c55e" : "#3a3020"}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "22px",
      boxShadow: active ? "0 0 20px rgba(34,197,94,0.5)" : "none",
      transition: "all 0.5s ease",
    }),
    stepLabel: (active, done) => ({
      fontFamily: "'Bebas Neue', sans-serif", fontSize: "13px", letterSpacing: "1px",
      color: done ? "#f97316" : active ? "#22c55e" : "#444", textAlign: "center",
    }),
    stepSub: { fontFamily: "sans-serif", fontSize: "10px", color: "#555", textAlign: "center" },
    mapCard: {
      background: "#1a1208", border: "1px solid #2a2010", borderRadius: "14px",
      height: "180px", position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
    },
    riderBadge: {
      position: "absolute", bottom: "12px", left: "12px",
      background: "#22c55e", borderRadius: "8px", padding: "6px 12px",
      display: "flex", alignItems: "center", gap: "8px",
    },
    detailCard: { background: "#1a1208", border: "1px solid #2a2010", borderRadius: "14px", padding: "24px" },
    detailTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", letterSpacing: "1px", margin: "0 0 16px" },
    detailItem: { display: "flex", justifyContent: "space-between", marginBottom: "10px", fontFamily: "sans-serif", fontSize: "13px", color: "#888" },
    callBtn: {
      width: "100%", marginTop: "16px", background: "#22c55e", border: "none",
      borderRadius: "999px", color: "#fff", fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "16px", letterSpacing: "2px", padding: "14px", cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
    },
    infoRow: { display: "flex", gap: "12px", marginTop: "16px" },
    infoBox: {
      flex: 1, background: "#1a1208", border: "1px solid #2a2010", borderRadius: "10px",
      padding: "14px", display: "flex", flexDirection: "column", gap: "4px",
    },
    infoLabel: { fontFamily: "sans-serif", fontSize: "10px", color: "#555", letterSpacing: "1px", textTransform: "uppercase" },
    infoValue: (color) => ({ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", color: color || "#fff" }),
  };

  return (
    <div style={S.page}>
      <div style={S.inner}>
        <h1 style={S.heading}>WHERE'S THE <span style={{ color: "#f97316" }}>HEAT?</span></h1>
        <p style={S.orderMeta}>ORDER #{order.id} • EST. ARRIVAL: {order.eta}</p>

        <div style={S.layout}>
          <div>
            {/* Progress Tracker */}
            <div style={S.trackerCard}>
              <div style={{ position: "relative" }}>
                <div style={S.trackLine} />
                <div style={{ ...S.trackFill, width: fillPct }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  {STATUSES.map((s, i) => {
                    const done = i < statusIndex;
                    const active = i === statusIndex;
                    return (
                      <div key={s.key} style={S.stepWrap}>
                        <div style={S.stepCircle(active, done)}>{s.icon}</div>
                        <span style={S.stepLabel(active, done)}>{s.label}</span>
                        {active && <span style={S.stepSub}>{s.sub}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Map mockup */}
            <div style={S.mapCard}>
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#f97316" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              <div style={{ fontSize: "40px", zIndex: 1 }}>🛵</div>
              <div style={S.riderBadge}>
                <span style={{ fontSize: "16px" }}>🛵</span>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "13px", color: "#fff" }}>RIDER: MIKE D.</div>
                  <div style={{ fontFamily: "sans-serif", fontSize: "10px", color: "#fff" }}>2.4 MILES AWAY</div>
                </div>
              </div>
            </div>

            {/* Info row */}
            <div style={S.infoRow}>
              <div style={S.infoBox}>
                <span style={S.infoLabel}>Arrival Time</span>
                <span style={S.infoValue("#22c55e")}>{order.eta}</span>
              </div>
              <div style={S.infoBox}>
                <span style={S.infoLabel}>Status</span>
                <span style={S.infoValue("#f97316")}>{STATUSES[statusIndex].label}</span>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div style={S.detailCard}>
            <h3 style={S.detailTitle}>ORDER DETAILS</h3>
            {order.items?.map((item, i) => (
              <div key={i} style={S.detailItem}>
                <span>{item.qty}x {item.title}</span>
                <span style={{ color: "#fff" }}>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}

            <div style={{ borderTop: "1px solid #2a2010", paddingTop: "12px", marginTop: "4px" }}>
              <div style={S.detailItem}><span>Subtotal</span><span style={{ color: "#fff" }}>${orderTotal.toFixed(2)}</span></div>
              <div style={S.detailItem}><span>Delivery Fee</span><span style={{ color: "#22c55e" }}>$5.00</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px" }}>TOTAL PAID</span>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", color: "#f97316" }}>${(order.total || orderTotal + 5).toFixed(2)}</span>
              </div>
            </div>

            <button style={S.callBtn}>📞 CALL RIDER</button>

            <button
              onClick={() => { order.items?.forEach(i => addToCart(i)); navigate("/cart"); }}
              style={{
                width: "100%", marginTop: "10px", background: "none", border: "1px solid #3a3020",
                borderRadius: "999px", color: "#888", fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "14px", letterSpacing: "1.5px", padding: "12px", cursor: "pointer",
              }}
            >
              REORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
