import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="logo">BURGERBOX</div>

        <ul className="footer-links">
          <li>PRIVACY</li>
          <li>TERMS</li>
          <li>NUTRITIONAL INFO</li>
          <li>CONTACT</li>
        </ul>

        <div className="copyright">
          © 2024 BURGER BOX. STAY GREASY.
        </div>
      </div>
    </footer>
  );
}