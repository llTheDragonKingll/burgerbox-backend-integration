import { useState } from "react";
import { motion as Motion } from "framer-motion";

const S = {
  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    background: "#1a1208",
    fontFamily: "'Bebas Neue', 'Impact', sans-serif",
    color: "#fff",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 32px",
    borderBottom: "1px solid #2a2010",
  },
  logo: {
    fontSize: "22px",
    letterSpacing: "2px",
    color: "#fff",
    fontFamily: "'Bebas Neue', sans-serif",
  },
  logoSpan: { color: "#f97316" },
  backBtn: {
    background: "none",
    border: "none",
    color: "#aaa",
    cursor: "pointer",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: "sans-serif",
    letterSpacing: "0.5px",
  },
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 60px",
    maxWidth: "520px",
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box",
  },
  formSide: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  heading: {
    fontSize: "52px",
    lineHeight: "1.05",
    margin: "0 0 6px 0",
    letterSpacing: "1px",
    fontFamily: "'Bebas Neue', sans-serif",
    textTransform: "uppercase",
  },
  headingSpan: { color: "#f97316" },
  subtext: {
    color: "#888",
    fontSize: "13px",
    marginBottom: "28px",
    fontFamily: "sans-serif",
    fontWeight: 400,
    letterSpacing: "0.3px",
  },
  label: {
    fontSize: "11px",
    letterSpacing: "1.5px",
    color: "#888",
    marginBottom: "6px",
    fontFamily: "sans-serif",
    textTransform: "uppercase",
    display: "block",
  },
  inputWrap: {
    position: "relative",
    marginBottom: "16px",
  },
  input: {
    width: "100%",
    background: "#2a2010",
    border: "1px solid #3a3020",
    borderRadius: "8px",
    padding: "12px 40px 12px 14px",
    color: "#fff",
    fontSize: "14px",
    fontFamily: "sans-serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  inputIcon: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#555",
    fontSize: "16px",
    pointerEvents: "none",
  },
  error: {
    color: "#f87171",
    fontSize: "11px",
    fontFamily: "sans-serif",
    marginTop: "-10px",
    marginBottom: "10px",
    display: "block",
  },
  mainBtn: {
    width: "100%",
    background: "#f97316",
    color: "#fff",
    border: "none",
    borderRadius: "999px",
    padding: "15px",
    fontSize: "16px",
    fontFamily: "'Bebas Neue', sans-serif",
    letterSpacing: "2px",
    cursor: "pointer",
    marginTop: "6px",
    transition: "background 0.2s",
    boxShadow: "0 6px 20px rgba(249,115,22,0.35)",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "20px 0",
  },
  divLine: { flex: 1, height: "1px", background: "#2a2010" },
  divText: {
    color: "#555",
    fontSize: "11px",
    fontFamily: "sans-serif",
    letterSpacing: "1px",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  socialBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    background: "#2a2010",
    border: "1px solid #3a3020",
    borderRadius: "8px",
    padding: "11px",
    color: "#ccc",
    cursor: "pointer",
    fontSize: "13px",
    fontFamily: "sans-serif",
    marginBottom: "20px",
    transition: "border-color 0.2s, background 0.2s",
  },
  bottomText: {
    textAlign: "center",
    fontSize: "13px",
    color: "#666",
    fontFamily: "sans-serif",
  },
  switchLink: {
    color: "#22c55e",
    fontWeight: "700",
    cursor: "pointer",
    marginLeft: "4px",
    letterSpacing: "0.5px",
  },
  successBox: {
    background: "#16532d",
    color: "#86efac",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    fontFamily: "sans-serif",
    marginBottom: "16px",
  },
};

const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const validatePassword = (v) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);

const GOOGLE_CLIENT_ID = import.meta.env?.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";

function launchGoogleOAuth() {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: window.location.origin + "/auth/google/callback",
    response_type: "token",
    scope: "openid email profile",
    prompt: "select_account",
  });
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

export default function Login() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const isLogin = mode === "login";

  function validate() {
    const e = {};
    if (!isLogin && !name.trim()) e.name = "Name is required.";
    if (!validateEmail(email)) e.email = "Enter a valid email.";
    if (!validatePassword(password))
      e.password = "Min 8 chars, uppercase, lowercase, number & special char required.";
    if (!isLogin && password !== confirmPwd) e.confirmPwd = "Passwords do not match.";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    if (!isLogin) {
      const users = JSON.parse(localStorage.getItem("bb_users") || "[]");
      if (users.find((u) => u.email === email)) {
        setErrors({ email: "Account already exists. Please log in." });
        return;
      }
      users.push({ name, email, password });
      localStorage.setItem("bb_users", JSON.stringify(users));
      localStorage.setItem("bb_session", JSON.stringify({ name, email, avatar: null }));
      setSuccess("Account created! Redirecting…");
      setTimeout(() => (window.location.href = "/"), 1200);
    } else {
      const users = JSON.parse(localStorage.getItem("bb_users") || "[]");
      const match = users.find((u) => u.email === email && u.password === password);
      if (!match) {
        setErrors({ password: "Invalid email or password." });
        return;
      }
      localStorage.setItem("bb_session", JSON.stringify({ name: match.name, email: match.email, avatar: null }));
      setSuccess("Welcome back! Redirecting…");
      setTimeout(() => (window.location.href = "/"), 1000);
    }
  }

  function switchMode() {
    setMode(isLogin ? "signup" : "login");
    setErrors({});
    setSuccess("");
    setEmail("");
    setPassword("");
    setConfirmPwd("");
    setName("");
  }

  return (
    <div style={S.page}>
      <div style={S.topBar}>
        <div style={S.logo}>BURGER<span style={S.logoSpan}>BOX</span></div>
        <button style={S.backBtn} onClick={() => (window.location.href = "/")}>
          ← Back to Menu
        </button>
      </div>

      <div style={S.container}>
        <Motion.div 
        initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, amount: 0.3 }}
        style={S.formSide}>
          <h1 style={S.heading}>
            {isLogin
              ? <>WASSUP <span style={S.headingSpan}>AGAIN?</span></>
              : <>JOIN THE <span style={S.headingSpan}>SQUAD.</span></>}
          </h1>
          <p style={S.subtext}>
            {isLogin
              ? "Ready for another round of grease and glory?"
              : "Create your account and start eating well."}
          </p>

          {success && <div style={S.successBox}>{success}</div>}

          {!isLogin && (
            <>
              <label style={S.label}>Full Name</label>
              <div style={S.inputWrap}>
                <input style={S.input} type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                <span style={S.inputIcon}>👤</span>
              </div>
              {errors.name && <span style={S.error}>{errors.name}</span>}
            </>
          )}

          <label style={S.label}>Email / Username</label>
          <div style={S.inputWrap}>
            <input style={S.input} type="text" placeholder="hungry_human_01" value={email} onChange={(e) => setEmail(e.target.value)} />
            <span style={S.inputIcon}>👤</span>
          </div>
          {errors.email && <span style={S.error}>{errors.email}</span>}

          <label style={S.label}>Password</label>
          <div style={S.inputWrap}>
            <input
              style={S.input}
              type={showPwd ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              style={{ ...S.inputIcon, cursor: "pointer", pointerEvents: "all" }}
              onClick={() => setShowPwd((v) => !v)}
            >
              {showPwd ? "🙈" : "🔒"}
            </span>
          </div>
          {errors.password && <span style={S.error}>{errors.password}</span>}

          {!isLogin && (
            <>
              <label style={S.label}>Confirm Password</label>
              <div style={S.inputWrap}>
                <input style={S.input} type="password" placeholder="••••••••" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
                <span style={S.inputIcon}>🔒</span>
              </div>
              {errors.confirmPwd && <span style={S.error}>{errors.confirmPwd}</span>}
            </>
          )}

          <button
            style={S.mainBtn}
            onClick={handleSubmit}
            onMouseEnter={(e) => (e.target.style.background = "#ea6c0a")}
            onMouseLeave={(e) => (e.target.style.background = "#f97316")}
          >
            {isLogin ? "LET'S EAT" : "CREATE ACCOUNT"}
          </button>

          <div style={S.divider}>
            <div style={S.divLine} />
            <span style={S.divText}>OR CONNECT VIA</span>
            <div style={S.divLine} />
          </div>

          <button
            style={S.socialBtn}
            onClick={launchGoogleOAuth}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#4285f4"; e.currentTarget.style.background = "#312510"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#3a3020"; e.currentTarget.style.background = "#2a2010"; }}
          >
            <svg width="16" height="16" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.5 1.2 8.9 3.2l6.6-6.6C35.2 2.5 30 0 24 0 14.6 0 6.7 5.8 3 14.1l7.7 6C12.5 13.5 17.8 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.5 2.9-2.2 5.4-4.7 7l7.4 5.8C43.5 37.3 46.5 31.4 46.5 24.5z"/>
              <path fill="#FBBC05" d="M10.7 28.5A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.1.8-4.5L2.6 13.5A23.9 23.9 0 0 0 0 24c0 3.8.9 7.4 2.6 10.5l8.1-6z"/>
              <path fill="#34A853" d="M24 48c6 0 11-2 14.7-5.4l-7.4-5.8c-2 1.4-4.6 2.2-7.3 2.2-6.2 0-11.5-4-13.3-9.5l-8.1 6C6.7 42.2 14.6 48 24 48z"/>
            </svg>
            GOOGLE
          </button>

          <p style={S.bottomText}>
            {isLogin ? "NEW HERE?" : "ALREADY HAVE AN ACCOUNT?"}
            <span style={S.switchLink} onClick={switchMode}>
              {isLogin ? " CREATE ACCOUNT" : " SIGN IN"}
            </span>
          </p>
        </Motion.div>
      </div>
    </div>
  );
}
