import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

export default function Profile() {
  const navigate = useNavigate();
  const { orders, addToCart } = useCart();
  const [session, setSession] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", home: "", work: "" });
  const [saved, setSaved] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("bb_session");
      if (!raw) { navigate("/login"); return; }
      const s = JSON.parse(raw);
      setSession(s);
      const profile = JSON.parse(localStorage.getItem("bb_profile") || "{}");
      setForm({
        name: s.name || "THE BOSS",
        email: s.email || "",
        phone: profile.phone || "",
        home: profile.home || "123 State Alley, Cyber City",
        work: profile.work || "456 Vibe Towers, Floor 69",
      });
    } catch { navigate("/login"); }
  }, []);

  function handleSave() {
    const updated = { ...session, name: form.name };
    localStorage.setItem("bb_session", JSON.stringify(updated));
    localStorage.setItem("bb_profile", JSON.stringify({ phone: form.phone, home: form.home, work: form.work }));
    setSession(updated);
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleLogout() {
    localStorage.removeItem("bb_session");
    navigate("/login");
  }

  const initials = form.name ? form.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "BB";
  const grease = Math.min(100, (orders.length * 12) + 40);
  const recentOrders = orders.slice(0, 2);

  const S = {
    page: { background: "#0f0d08", minHeight: "100vh", color: "#fff", fontFamily: "'Bebas Neue', sans-serif" },
    inner: { maxWidth: "960px", margin: "0 auto", padding: isMobile ? "24px 16px" : "40px 32px" },
    topRow: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: "20px",
      marginBottom: "20px",
    },
    heroCard: {
      background: "#1a1208", border: "1px solid #2a2010", borderRadius: "14px",
      padding: "24px", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap",
    },
    avatarCircle: {
      width: "72px", height: "72px", borderRadius: "50%",
      background: "#2a2010", border: "3px solid #f97316",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "28px", flexShrink: 0, overflow: "hidden",
      boxShadow: "0 0 24px rgba(249,115,22,0.3)",
    },
    nameTag: { fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? "28px" : "38px", letterSpacing: "2px", lineHeight: 1, margin: 0 },
    idText: { fontFamily: "sans-serif", fontSize: "11px", color: "#666", marginTop: "4px", letterSpacing: "1px" },
    vibeBadge: {
      display: "inline-block", background: "#22c55e", color: "#fff",
      fontFamily: "'Bebas Neue', sans-serif", fontSize: "12px", letterSpacing: "1px",
      padding: "3px 12px", borderRadius: "999px", marginTop: "8px",
    },
    greaseCard: { background: "#1a1208", border: "1px solid #2a2010", borderRadius: "14px", padding: "24px" },
    greaseLabel: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px" },
    greasePct: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "40px", color: "#f97316" },
    greaseBar: { height: "12px", background: "#2a2010", borderRadius: "999px", overflow: "hidden" },
    greaseFill: {
      height: "100%", borderRadius: "999px",
      background: "linear-gradient(90deg, #22c55e, #f97316, #ef4444)",
      transition: "width 1s ease",
    },
    greaseSub: { fontFamily: "sans-serif", fontSize: "11px", color: "#666", marginTop: "8px" },
    midGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: "20px",
      marginBottom: "20px",
    },
    sectionCard: { background: "#1a1208", border: "1px solid #2a2010", borderRadius: "14px", padding: "24px" },
    sectionTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", letterSpacing: "1.5px", margin: "0 0 16px", color: "#fff" },
    sectionTitleRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
    viewAll: { fontFamily: "sans-serif", fontSize: "11px", color: "#f97316", cursor: "pointer", letterSpacing: "1px" },
    historyItem: { background: "#12100a", border: "1px solid #2a2010", borderRadius: "10px", padding: "12px", marginBottom: "10px" },
    historyTop: { display: "flex", justifyContent: "space-between", marginBottom: "8px" },
    historyDate: { fontFamily: "sans-serif", fontSize: "10px", color: "#555", textTransform: "uppercase", letterSpacing: "1px" },
    historyAmt: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", color: "#fff" },
    historyTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "16px", letterSpacing: "1px", margin: "0 0 2px" },
    historySub: { fontFamily: "sans-serif", fontSize: "11px", color: "#666" },
    reorderBtn: {
      width: "100%", marginTop: "10px", background: "#2a2010", border: "1px solid #3a3020",
      borderRadius: "8px", color: "#f97316", fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "14px", letterSpacing: "1px", padding: "9px", cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
    },
    hqRow: { display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "14px" },
    hqIcon: { width: "32px", height: "32px", borderRadius: "8px", background: "#2a2010", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 },
    hqLabel: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "13px", color: "#22c55e", margin: "0 0 2px" },
    hqAddr: { fontFamily: "sans-serif", fontSize: "11px", color: "#666" },
    chipCard: { background: "linear-gradient(135deg, #2a1a08 0%, #1a1208 100%)", border: "1px solid #3a2010", borderRadius: "12px", padding: "20px" },
    chipLabel: { fontFamily: "sans-serif", fontSize: "10px", color: "#666", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px" },
    chipNum: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "26px", letterSpacing: "4px", color: "#fff" },
    chipExp: { fontFamily: "sans-serif", fontSize: "11px", color: "#555", marginTop: "4px" },
    actionRow: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
      gap: "12px",
    },
    actionBtn: (bg) => ({
      background: bg, border: "none", borderRadius: "12px", color: "#fff",
      fontFamily: "'Bebas Neue', sans-serif", fontSize: "16px", letterSpacing: "1.5px",
      padding: "18px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between",
      alignItems: "center", transition: "opacity 0.2s",
    }),
    actionSub: { fontFamily: "sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.5px", marginTop: "2px" },
    editInput: {
      width: "100%", background: "#2a2010", border: "1px solid #3a3020", borderRadius: "8px",
      padding: "10px 12px", color: "#fff", fontFamily: "sans-serif", fontSize: "13px",
      outline: "none", boxSizing: "border-box", marginBottom: "10px",
    },
    editLabel: { fontFamily: "sans-serif", fontSize: "10px", color: "#666", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: "4px" },
  };

  if (!session) return null;

  return (
    <div style={S.page}>
      <div style={S.inner}>
        {/* Top row */}
        <div style={S.topRow}>
          <div style={S.heroCard}>
            <div style={S.avatarCircle}>
              {session.avatar
                ? <img src={session.avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "28px" }}>{initials}</span>
              }
            </div>
            <div>
              <h1 style={S.nameTag}>THE <span style={{ color: "#f97316" }}>{form.name.split(" ")[0] || "BOSS"}</span></h1>
              <p style={S.idText}>ID: #BB-{session.email?.slice(0, 5).toUpperCase() || "99210"}-CRISPY</p>
              <div style={S.vibeBadge}>VIBE CHECKED</div>
            </div>
          </div>

          <div style={S.greaseCard}>
            <div style={S.greaseLabel}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "16px", letterSpacing: "2px", color: "#aaa" }}>GREASE LEVEL</span>
              <span style={S.greasePct}>{grease}%</span>
            </div>
            <div style={S.greaseBar}>
              <div style={{ ...S.greaseFill, width: `${grease}%` }} />
            </div>
            <p style={S.greaseSub}>{Math.max(0, 10 - orders.length)} ORDERS UNTIL YOUR NEXT GLAZED DELUXE</p>
          </div>
        </div>

        {/* Mid grid */}
        <div style={S.midGrid}>
          <div style={S.sectionCard}>
            <div style={S.sectionTitleRow}>
              <h3 style={{ ...S.sectionTitle, margin: 0 }}>HISTORY</h3>
              <span style={S.viewAll} onClick={() => navigate("/orders")}>VIEW ALL →</span>
            </div>
            {recentOrders.length === 0 ? (
              <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#555" }}>No orders yet. Go get greasy!</p>
            ) : (
              recentOrders.map(order => (
                <div key={order.id} style={S.historyItem}>
                  <div style={S.historyTop}>
                    <span style={S.historyDate}>{new Date(order.placedAt).toLocaleDateString()}</span>
                    <span style={S.historyAmt}>${(order.total || 0).toFixed(2)}</span>
                  </div>
                  <p style={S.historyTitle}>{order.items?.[0]?.title || "ORDER"}</p>
                  <p style={S.historySub}>{order.items?.length > 1 ? `+${order.items.length - 1} more items` : ""}</p>
                  <button style={S.reorderBtn} onClick={() => { order.items?.forEach(i => addToCart(i)); navigate("/cart"); }}>
                    ↺ REORDER
                  </button>
                </div>
              ))
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={S.sectionCard}>
              <h3 style={S.sectionTitle}>📍 HQS</h3>
              <div style={S.hqRow}>
                <div style={S.hqIcon}>🏠</div>
                <div>
                  <p style={S.hqLabel}>THE CRIB (HOME)</p>
                  <p style={S.hqAddr}>{form.home}</p>
                </div>
              </div>
              <div style={S.hqRow}>
                <div style={S.hqIcon}>🏢</div>
                <div>
                  <p style={S.hqLabel}>THE LAB (WORK)</p>
                  <p style={S.hqAddr}>{form.work}</p>
                </div>
              </div>
            </div>

            <div style={S.sectionCard}>
              <h3 style={S.sectionTitle}>💳 BAG</h3>
              <div style={S.chipCard}>
                <p style={S.chipLabel}>PRIMARY CHIP</p>
                <p style={S.chipNum}>•••• 8820</p>
                <p style={S.chipExp}>EXP 12/26</p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit profile */}
        {editMode && (
          <div style={{ ...S.sectionCard, marginBottom: "20px" }}>
            <h3 style={S.sectionTitle}>EDIT PROFILE</h3>
            {saved && <div style={{ background: "#16532d", color: "#86efac", padding: "8px 12px", borderRadius: "8px", fontFamily: "sans-serif", fontSize: "12px", marginBottom: "12px" }}>✓ Saved!</div>}
            <label style={S.editLabel}>Display Name</label>
            <input style={S.editInput} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <label style={S.editLabel}>Email</label>
            <input style={S.editInput} value={form.email} disabled />
            <label style={S.editLabel}>Phone</label>
            <input style={S.editInput} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 000 000 0000" />
            <label style={S.editLabel}>Home Address</label>
            <input style={S.editInput} value={form.home} onChange={e => setForm(f => ({ ...f, home: e.target.value }))} />
            <label style={S.editLabel}>Work Address</label>
            <input style={S.editInput} value={form.work} onChange={e => setForm(f => ({ ...f, work: e.target.value }))} />
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button onClick={handleSave} style={{ flex: 1, minWidth: "120px", background: "#f97316", border: "none", borderRadius: "8px", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "16px", letterSpacing: "1.5px", padding: "12px", cursor: "pointer" }}>SAVE CHANGES</button>
              <button onClick={() => setEditMode(false)} style={{ flex: 1, minWidth: "120px", background: "#2a2010", border: "1px solid #3a3020", borderRadius: "8px", color: "#888", fontFamily: "'Bebas Neue', sans-serif", fontSize: "16px", letterSpacing: "1.5px", padding: "12px", cursor: "pointer" }}>CANCEL</button>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div style={S.actionRow}>
          <button style={S.actionBtn("#22c55e")} onClick={() => setEditMode(v => !v)}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            <div><div>BOX PROFILE</div><div style={S.actionSub}>ADJUST YOUR STATS</div></div>
            <span>→</span>
          </button>
          <button style={S.actionBtn("#84cc16")}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            <div><div>REFILL WALLET</div><div style={S.actionSub}>ADD MORE FUNDS</div></div>
            <span>+</span>
          </button>
          <button style={S.actionBtn("#ef4444")} onClick={handleLogout}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            <div><div>SIGN OUT</div><div style={S.actionSub}>LOCK THE VAULT</div></div>
            <span>🔑</span>
          </button>
        </div>
      </div>
    </div>
  );
}
