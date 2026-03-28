import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("bb_cart") || "[]"); } catch { return []; }
  });
  const [orders, setOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem("bb_orders") || "[]"); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem("bb_cart", JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => { localStorage.setItem("bb_orders", JSON.stringify(orders)); }, [orders]);

  function addToCart(item) {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.category === item.category);
      if (existing) return prev.map(i => i.id === item.id && i.category === item.category ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function removeFromCart(id, category) {
    setCartItems(prev => prev.filter(i => !(i.id === id && i.category === category)));
  }

  function updateQty(id, category, qty) {
    if (qty < 1) { removeFromCart(id, category); return; }
    setCartItems(prev => prev.map(i => i.id === id && i.category === category ? { ...i, qty } : i));
  }

  function clearCart() { setCartItems([]); }

  function placeOrder(orderData) {
    const newOrder = {
      id: `BB-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      items: [...cartItems],
      ...orderData,
      status: "kitchen",
      placedAt: new Date().toISOString(),
      eta: new Date(Date.now() + 25 * 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder.id;
  }

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, orders, addToCart, removeFromCart, updateQty, clearCart, placeOrder, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() { return useContext(CartContext); }
