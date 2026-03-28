import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext.jsx";

export default function Cart() {
  const { cartItems, updateQty, removeFromCart, cartTotal, placeOrder } = useCart();
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const navigate = useNavigate();

  // 🔒 Redirect to login if not logged in
  useEffect(() => {
    const session = localStorage.getItem("bb_session");
    if (!session) {
      navigate("/login");
    }
  }, []);

  const VALID_PROMOS = { GREASE10: 0.1, BURGER20: 0.2 };
  const discount = promoApplied ? cartTotal * (VALID_PROMOS[promo.toUpperCase()] || 0) : 0;
  const shipping = cartTotal > 0 ? 5.00 : 0;
  const tax = (cartTotal - discount) * 0.08;
  const total = cartTotal - discount + shipping + tax;

  function handlePromo() {
    if (VALID_PROMOS[promo.toUpperCase()]) {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code.");
      setPromoApplied(false);
    }
  }

  function handleCheckout() {
    if (cartItems.length === 0) return;
    const orderId = placeOrder({ discount, shipping, tax, total });
    navigate(`/order/${orderId}`);
  }

  const S = {
    page: { background: "#0f0d08", minHeight: "100vh", color: "#fff", fontFamily: "'Bebas Neue', sans-serif" },
    inner: { maxWidth: "1100px", margin: "0 auto", padding: "40px 32px" },
    heading: { fontSize: "56px", margin: "0 0 4px", letterSpacing: "2px" },
    subHeading: { color: "#666", fontFamily: "sans-serif", fontSize: "13px", margin: "0 0 32px", fontWeight: 400 },
    layout: { display: "grid", gridTemplateColumns: "1fr 360px", gap: "32px", alignItems: "start" },
    itemsCol: { display: "flex", flexDirection: "column", gap: "16px" },
    card: {
      background: "#1a1208", border: "1px solid #2a2010", borderRadius: "14px",
      padding: "20px", display: "flex", alignItems: "center", gap: "16px",
    },
    imgBox: {
      width: "80px", height: "80px", borderRadius: "10px",
      background: "#2a2010", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "36px", overflow: "hidden",
    },
    itemTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", letterSpacing: "1px", margin: "0 0 4px" },
    itemSub: { color: "#666", fontFamily: "sans-serif", fontSize: "11px", margin: "0 0 10px" },
    qtyRow: { display: "flex", alignItems: "center", gap: "12px" },
    qtyBtn: {
      width: "28px", height: "28px", borderRadius: "6px", border: "1px solid #3a3020",
      background: "#2a2010", color: "#fff", cursor: "pointer", fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center",
    },
    qtyNum: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", minWidth: "20px", textAlign: "center" },
    removeBtn: {
      marginLeft: "auto", background: "none", border: "none", color: "#555",
      cursor: "pointer", fontFamily: "sans-serif", fontSize: "18px", padding: "4px",
    },
    itemPrice: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", color: "#f97316", marginLeft: "auto", whiteSpace: "nowrap" },
    summaryCard: { background: "#1a1208", border: "1px solid #2a2010", borderRadius: "14px", padding: "24px", position: "sticky", top: "100px" },
    summaryTitle: { fontSize: "28px", letterSpacing: "2px", margin: "0 0 20px" },
    promoRow: { display: "flex", gap: "8px", marginBottom: "20px" },
    promoInput: {
      flex: 1, background: "#2a2010", border: "1px solid #3a3020", borderRadius: "8px",
      padding: "10px 12px", color: "#fff", fontFamily: "sans-serif", fontSize: "13px", outline: "none",
    },
    promoBtn: {
      background: "#2a2010", border: "1px solid #3a3020", borderRadius: "8px",
      color: "#f97316", fontFamily: "'Bebas Neue', sans-serif", fontSize: "15px",
      letterSpacing: "1px", padding: "10px 16px", cursor: "pointer",
    },
    lineRow: { display: "flex", justifyContent: "space-between", marginBottom: "10px", fontFamily: "sans-serif", fontSize: "13px", color: "#888" },
    totalRow: {
      display: "flex", justifyContent: "space-between", borderTop: "1px solid #2a2010",
      paddingTop: "14px", marginTop: "4px",
    },
    totalLabel: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", color: "#fff" },
    totalAmt: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", color: "#f97316" },
    checkoutBtn: {
      width: "100%", marginTop: "20px", background: "#f97316", border: "none",
      borderRadius: "999px", color: "#fff", fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "18px", letterSpacing: "2px", padding: "16px", cursor: "pointer",
      boxShadow: "0 6px 20px rgba(249,115,22,0.35)", transition: "background 0.2s",
    },
    secure: { textAlign: "center", color: "#444", fontFamily: "sans-serif", fontSize: "10px", marginTop: "10px", letterSpacing: "1px" },
    upsellCard: {
      background: "#1a2a10", border: "1px solid #22c55e44", borderRadius: "12px",
      padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
    },
    upsellText: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", color: "#22c55e", margin: "0 0 2px" },
    upsellSub: { fontFamily: "sans-serif", fontSize: "12px", color: "#666", margin: 0 },
    upsellBtn: {
      background: "#22c55e", border: "none", borderRadius: "8px", color: "#fff",
      fontFamily: "'Bebas Neue', sans-serif", fontSize: "14px", letterSpacing: "1px",
      padding: "10px 16px", cursor: "pointer", whiteSpace: "nowrap",
    },
    emptyState: { textAlign: "center", padding: "80px 20px", gridColumn: "1 / -1" },
  };

  return (
    <div style={S.page}>
      <div style={S.inner}>
        <h1 style={S.heading}>YOUR <span style={{ color: "#f97316" }}>BAG</span></h1>
        <p style={S.subHeading}>{cartItems.length} ITEM{cartItems.length !== 1 ? "S" : ""} READY FOR THE SQUEEZE</p>

        {cartItems.length === 0 ? (
          <div style={S.emptyState}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🛍️</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "32px", color: "#444" }}>YOUR BAG IS EMPTY</h2>
            <p style={{ fontFamily: "sans-serif", color: "#555", fontSize: "14px" }}>Go grab something greasy.</p>
            <button onClick={() => navigate("/")} style={{
              marginTop: "20px", background: "#f97316", border: "none", borderRadius: "999px",
              color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "16px",
              letterSpacing: "2px", padding: "14px 32px", cursor: "pointer",
            }}>
              BACK TO MENU
            </button>
          </div>
        ) : (
          <div style={S.layout}>
            <div style={S.itemsCol}>
              {cartItems.map(item => (
                <div key={`${item.id}-${item.category}`} style={S.card}>
                  <div style={S.imgBox}>
                    {item.img
                      ? <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
                      : <span>{item.category === "drinks" ? "🥤" : item.category === "sides" ? "🍟" : item.category === "desserts" ? "🍫" : "🍔"}</span>
                    }
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={S.itemTitle}>{item.title}</p>
                    <p style={S.itemSub}>{item.category?.toUpperCase()}</p>
                    <div style={S.qtyRow}>
                      <button style={S.qtyBtn} onClick={() => updateQty(item.id, item.category, item.qty - 1)}>−</button>
                      <span style={S.qtyNum}>{String(item.qty).padStart(2, "0")}</span>
                      <button style={S.qtyBtn} onClick={() => updateQty(item.id, item.category, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                    <span style={S.itemPrice}>${(item.price * item.qty).toFixed(2)}</span>
                    <button style={S.removeBtn} onClick={() => removeFromCart(item.id, item.category)} title="Remove">✕</button>
                  </div>
                </div>
              ))}

              <div style={S.upsellCard}>
                <div>
                  <p style={S.upsellText}>FEELING EXTRA?</p>
                  <p style={S.upsellSub}>Drown your burgers in our signature neon cheese sauce.</p>
                </div>
                <button style={S.upsellBtn}>ADD MELT +$2.50</button>
              </div>
            </div>

            <div style={S.summaryCard}>
              <h2 style={S.summaryTitle}>SUMMARY</h2>
              <div style={S.promoRow}>
                <input
                  style={S.promoInput}
                  placeholder="PROMO CODE"
                  value={promo}
                  onChange={e => { setPromo(e.target.value); setPromoError(""); setPromoApplied(false); }}
                />
                <button style={S.promoBtn} onClick={handlePromo}>APPLY</button>
              </div>
              {promoError && <p style={{ color: "#f87171", fontFamily: "sans-serif", fontSize: "11px", marginTop: "-12px", marginBottom: "12px" }}>{promoError}</p>}
              {promoApplied && <p style={{ color: "#22c55e", fontFamily: "sans-serif", fontSize: "11px", marginTop: "-12px", marginBottom: "12px" }}>✓ Promo applied!</p>}

              <div style={S.lineRow}><span>Subtotal</span><span style={{ color: "#fff" }}>${cartTotal.toFixed(2)}</span></div>
              {promoApplied && <div style={S.lineRow}><span style={{ color: "#22c55e" }}>Discount</span><span style={{ color: "#22c55e" }}>−${discount.toFixed(2)}</span></div>}
              <div style={S.lineRow}><span>Shipping</span><span style={{ color: "#fff" }}>${shipping.toFixed(2)}</span></div>
              <div style={S.lineRow}><span>Estimated Taxes</span><span style={{ color: "#fff" }}>${tax.toFixed(2)}</span></div>

              <div style={S.totalRow}>
                <span style={S.totalLabel}>TOTAL</span>
                <span style={S.totalAmt}>${total.toFixed(2)}</span>
              </div>

              <button
                style={S.checkoutBtn}
                onClick={handleCheckout}
                onMouseEnter={e => e.target.style.background = "#ea6c0a"}
                onMouseLeave={e => e.target.style.background = "#f97316"}
              >
                PROCEED TO CHECKOUT
              </button>
              <p style={S.secure}>🔒 SECURE CHECKOUT</p>

              <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "12px" }}>
                {["💳", "🏦", "📱"].map(ic => (
                  <div key={ic} style={{ width: "36px", height: "24px", background: "#2a2010", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>{ic}</div>
                ))}
              </div>

              {/* ✅ Continue shopping goes back to home */}
              <button
                onClick={() => navigate("/")}
                style={{
                  width: "100%", marginTop: "12px", background: "none", border: "1px solid #3a3020",
                  borderRadius: "999px", color: "#666", fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "14px", letterSpacing: "1.5px", padding: "12px", cursor: "pointer",
                }}
              >
                ← CONTINUE SHOPPING
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
