import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

const FEATURES = [
  { icon: "🧱", label: "Nested Blocks", desc: "Break goals into infinite sub-blocks" },
  { icon: "💰", label: "Cost Tracking", desc: "Auto-sum costs across your vision" },
  { icon: "✨", label: "Motivation Mode", desc: "See what you're truly working for" },
  { icon: "🔄", label: "Real-time Sync", desc: "Access from any device, instantly" },
];

const Login = () => {
  const { login, loading } = useAuth();
  const [signingIn, setSigningIn] = useState(false);

  const handleLogin = async () => {
    setSigningIn(true);
    try {
      await login();
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background Orbs */}
      <div className="login-bg-orbs">
        <div className="login-orb login-orb-1" />
        <div className="login-orb login-orb-2" />
      </div>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <motion.div
          className="login-logo"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Pending
        </motion.div>

        <motion.p
          className="login-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Your dreams, organized.<br />
          No deadlines. No pressure. Only vision.
        </motion.p>

        {/* Google Sign In */}
        <motion.button
          className="google-btn"
          onClick={handleLogin}
          disabled={signingIn || loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <svg className="google-btn-icon" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {signingIn ? "Signing in…" : "Continue with Google"}
        </motion.button>

        {/* Features Grid */}
        <motion.div
          className="login-features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          {FEATURES.map((f) => (
            <div key={f.label} className="login-feature">
              <div className="login-feature-icon">{f.icon}</div>
              <div className="login-feature-label">{f.label}</div>
              <div className="login-feature-desc">{f.desc}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
