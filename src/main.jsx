import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { CartProvider } from "./CartContext.jsx";
import './index.css';

import App from './App.jsx';
import Navbar from './components/Navbar.jsx';
import Login from "./login.jsx";
import Cart from "./Cart.jsx";
import Order from "./Order.jsx";
import Profile from "./Profile.jsx";

// Pages that show the Navbar
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Pages WITH Navbar */}
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Pages WITHOUT Navbar */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
