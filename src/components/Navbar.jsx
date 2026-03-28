import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import './Navbar.css';

export default function Navbar() {
  const [session, setSession] = useState(null);
  const [dropOpen, setDropOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropRef = useRef(null);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  useEffect(() => {
    function readSession() {
      try {
        const raw = localStorage.getItem('bb_session');
        setSession(raw ? JSON.parse(raw) : null);
      } catch { setSession(null); }
    }
    readSession();
    window.addEventListener('storage', readSession);
    const t = setTimeout(readSession, 300);
    return () => { window.removeEventListener('storage', readSession); clearTimeout(t); };
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLogout() {
    localStorage.removeItem('bb_session');
    setSession(null);
    setDropOpen(false);
    setMenuOpen(false);
    navigate('/');
  }

  const initials = session?.name
    ? session.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const dropItemStyle = {
    display: 'block', width: '100%', background: 'none', border: 'none',
    color: '#ddd', padding: '10px 16px', textAlign: 'left',
    cursor: 'pointer', fontSize: '13px', fontFamily: 'sans-serif',
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="/">BURGER<span style={{ color: '#f97316' }}>BOX</span></Link>
        </div>

        {/* Desktop nav links */}
        <div className="navbar-component">
          <ul>
            <li><a href="#Home">Home</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#Offers">Offers</a></li>
          </ul>
        </div>

        {/* Desktop right buttons */}
        <div className="navbar-component-2">
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button className="cart" onClick={() => navigate('/cart')}>Cart</button>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: '-6px', right: '-6px',
                background: '#f97316', color: '#fff', borderRadius: '50%',
                width: '18px', height: '18px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '10px', fontFamily: 'sans-serif',
                fontWeight: 700, pointerEvents: 'none',
              }}>
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </div>

          {session ? (
            <div ref={dropRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setDropOpen(v => !v)}
                title={session.name || session.email}
                style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: '#f97316', border: '2px solid #f97316', color: '#fff',
                  fontWeight: '700', fontSize: '14px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1px',
                  boxShadow: '0 2px 10px rgba(249,115,22,0.4)', overflow: 'hidden',
                }}
              >
                {session.avatar
                  ? <img src={session.avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : initials}
              </button>

              {dropOpen && (
                <div style={{
                  position: 'absolute', top: '48px', right: 0,
                  background: '#1e1408', border: '1px solid #3a3020',
                  borderRadius: '10px', padding: '8px 0', minWidth: '180px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.6)', zIndex: 1000,
                }}>
                  <div style={{ padding: '10px 16px', borderBottom: '1px solid #2a2010', fontSize: '13px', fontFamily: 'sans-serif', color: '#aaa' }}>
                    <div style={{ color: '#fff', fontWeight: 700, marginBottom: '2px' }}>{session.name || 'Burger Fan'}</div>
                    <div style={{ fontSize: '11px' }}>{session.email}</div>
                  </div>
                  <button onClick={() => { setDropOpen(false); navigate('/profile'); }} style={dropItemStyle}>👤 My Profile</button>
                  <button onClick={() => { setDropOpen(false); navigate('/cart'); }} style={dropItemStyle}>🛍️ My Bag {cartCount > 0 && `(${cartCount})`}</button>
                  <button onClick={handleLogout} style={{ ...dropItemStyle, color: '#f87171' }}>🚪 Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login"><button className="login">Login</button></Link>
          )}
        </div>

        {/* Hamburger button — mobile only */}
        <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a href="#Home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#menu" onClick={() => setMenuOpen(false)}>Menu</a>
        <a href="#Offers" onClick={() => setMenuOpen(false)}>Offers</a>

        <div className="mobile-btns">
          <button
            onClick={() => { setMenuOpen(false); navigate('/cart'); }}
            style={{ background: 'transparent', border: '1px solid #FF6B00', color: '#fff', position: 'relative' }}
          >
            Cart {cartCount > 0 && `(${cartCount})`}
          </button>

          {session ? (
            <button
              onClick={() => { setMenuOpen(false); navigate('/profile'); }}
              style={{ background: '#f97316', color: '#fff' }}
            >
              Profile
            </button>
          ) : (
            <button
              onClick={() => { setMenuOpen(false); navigate('/login'); }}
              style={{ background: '#FF6B00', color: '#000' }}
            >
              Login
            </button>
          )}
        </div>

        {session && (
          <button
            onClick={handleLogout}
            style={{
              background: 'none', border: '1px solid #f87171', color: '#f87171',
              padding: '10px', borderRadius: '8px', cursor: 'pointer', width: '100%',
              fontSize: '14px', fontWeight: 'bold',
            }}
          >
            🚪 Sign Out
          </button>
        )}
      </div>
    </>
  );
}
