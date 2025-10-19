import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";


export default function Signup() {
    const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const shouldReduceMotion = useReducedMotion();


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const url = isSignup
      ? "http://localhost:4000/signup"
      : "http://localhost:4000/login";

    const body = isSignup
      ? { name: formData.name, email: formData.email, password: formData.password }
      : { email: formData.email, password: formData.password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setMessage(data.message || "");

      if (res.ok && !isSignup) {

        window.location.href = "http://localhost:5173/home";
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Server error. Please try again later.");
    }
  };


  const shapes = [
    { id: "r1", type: "ring", size: 160, top: "6%", left: "8%", delay: 0 },
    { id: "r2", type: "ring", size: 220, top: "14%", left: "72%", delay: 1.2 },
    { id: "c1", type: "coin", size: 56, top: "20%", left: "28%", delay: 0.6 },
    { id: "c2", type: "coin", size: 44, top: "62%", left: "12%", delay: 1.8 },
    { id: "c3", type: "coin", size: 48, top: "46%", left: "88%", delay: 2.2 },
    { id: "b1", type: "bars", size: 80, top: "30%", left: "45%", delay: 0.3 },
    { id: "b2", type: "bars", size: 60, top: "58%", left: "55%", delay: 1.6 },
    { id: "b3", type: "bars", size: 44, top: "8%", left: "50%", delay: 2.0 },
    { id: "t1", type: "tri", size: 72, top: "82%", left: "20%", delay: 2.8 },
    { id: "t2", type: "tri", size: 56, top: "34%", left: "6%", delay: 0.9 },
    { id: "n1", type: "node", size: 10, top: "12%", left: "40%", delay: 0.4 },
    { id: "n2", type: "node", size: 10, top: "42%", left: "26%", delay: 1.1 },
    { id: "n3", type: "node", size: 10, top: "68%", left: "62%", delay: 1.9 },
    { id: "n4", type: "node", size: 10, top: "16%", left: "82%", delay: 2.4 },
    { id: "l1", type: "line", w: 160, top: "52%", left: "6%", delay: 0.5 },
    { id: "l2", type: "line", w: 220, top: "74%", left: "46%", delay: 1.7 },
    { id: "ar1", type: "arrow", size: 72, top: "4%", left: "54%", delay: 2.1 },
    { id: "p1", type: "pulse", size: 140, top: "46%", left: "86%", delay: 0.8 },
    { id: "p2", type: "pulse", size: 100, top: "58%", left: "32%", delay: 1.3 },
    { id: "g1", type: "gridtile", size: 60, top: "26%", left: "62%", delay: 2.5 },

    { id: "c4", type: "coin", size: 36, top: "75%", left: "78%", delay: 0.5 },
    { id: "r3", type: "ring", size: 120, top: "28%", left: "52%", delay: 1.1 },
    { id: "t3", type: "tri", size: 64, top: "52%", left: "12%", delay: 2.0 },
    { id: "n5", type: "node", size: 12, top: "88%", left: "42%", delay: 0.7 },
    { id: "b4", type: "bars", size: 50, top: "16%", left: "30%", delay: 1.5 },
  ];


  const floatAnim = shouldReduceMotion
    ? {}
    : { y: [0, -18, 0], rotate: [0, 20, 0], scale: [1, 1.03, 1] };

  const floatLong = shouldReduceMotion
    ? {}
    : { y: [0, 30, 0], rotate: [0, 360, 0], scale: [1, 1.05, 1] };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#070707] to-black relative overflow-hidden">

      {shapes.map((s) => {
        const baseStyle = { top: s.top, left: s.left };
        switch (s.type) {
          case "ring":
            return (
              <motion.div
                key={s.id}
                style={baseStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0.12], rotate: [0, 90, 180] }}
                transition={{ duration: 28, repeat: Infinity, delay: s.delay, ease: "linear" }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <div
                  style={{ width: s.size, height: s.size }}
                  className="rounded-full border border-yellow-400/50 shadow-[0_0_40px_rgba(255,215,0,0.4)]"
                />
              </motion.div>
            );

          case "coin":
            return (
              <motion.div
                key={s.id}
                style={baseStyle}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={floatAnim}
                transition={{ duration: 6 + s.delay, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <svg width={s.size} height={s.size} viewBox="0 0 64 64">
                  <circle
                    cx="32" cy="32" r="30"
                    fill="url(#coinGrad)"
                    stroke="#FFD700"
                    strokeWidth="2"
                    className="drop-shadow-[0_0_16px_rgba(255,215,0,0.7)]"
                  />
                  <text x="32" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#111">₿</text>
                  <defs>
                    <radialGradient id="coinGrad">
                      <stop offset="0%" stopColor="#FFF1B5" stopOpacity="1"/>
                      <stop offset="100%" stopColor="#B8860B" stopOpacity="0.9"/>
                    </radialGradient>
                  </defs>
                </svg>
              </motion.div>
            );

          case "bars":
            return (
              <motion.div
                key={s.id}
                style={baseStyle}
                initial={{ opacity: 0.06 }}
                animate={{ y: [0, -10, 0], opacity: [0.06, 0.26, 0.06] }}
                transition={{ duration: 8 + s.delay, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <svg width={s.size} height={s.size * 0.6} viewBox="0 0 80 48" fill="none">
                  <rect x="6" y="18" width="10" height="24" rx="3" fill="url(#barGrad)" />
                  <rect x="26" y="10" width="10" height="32" rx="3" fill="url(#barGradAlt)" />
                  <rect x="46" y="4" width="10" height="38" rx="3" fill="url(#barGrad)" />
                  <rect x="66" y="16" width="10" height="26" rx="3" fill="url(#barGradAlt)" />
                  <defs>
                    <linearGradient id="barGrad" x1="0" x2="1">
                      <stop offset="0%" stopColor="#F7C948" stopOpacity="1"/>
                      <stop offset="100%" stopColor="#C28A11" stopOpacity="0.9"/>
                    </linearGradient>
                    <linearGradient id="barGradAlt" x1="0" x2="1">
                      <stop offset="0%" stopColor="#FFD977" stopOpacity="0.95"/>
                      <stop offset="100%" stopColor="#AD7A08" stopOpacity="0.8"/>
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            );

          case "tri":
            return (
              <motion.div
                key={s.id}
                style={baseStyle}
                initial={{ opacity: 0.06 }}
                animate={{ rotate: [0, 360, 0], y: [0, -12, 0] }}
                transition={{ duration: 22, repeat: Infinity, delay: s.delay, ease: "linear" }}
                className="absolute -translate-x-1/2 -translate-y-1/2 opacity-30"
              >
                <svg width={s.size} height={s.size} viewBox="0 0 48 48" fill="none">
                  <polygon points="24,4 44,42 4,42" fill="transparent" stroke="#F7C948" strokeWidth="1.5" className="drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
                  <polygon points="24,10 38,38 10,38" fill="rgba(247,201,72,0.06)" />
                </svg>
              </motion.div>
            );

          case "node":
            return (
              <motion.div
                key={s.id}
                style={baseStyle}
                initial={{ opacity: 0.06 }}
                animate={{ scale: [1, 1.6, 1], opacity: [0.06, 0.26, 0.06] }}
                transition={{ duration: 6 + s.delay, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <div style={{ width: s.size, height: s.size }} className="rounded-full bg-gradient-to-br from-yellow-300/90 to-yellow-600/70 shadow-[0_0_20px_rgba(255,215,0,0.7)]"/>
              </motion.div>
            );


          default:
            return null;
        }
      })}


      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative z-20 w-[92%] max-w-md rounded-2xl bg-white/5 backdrop-blur-2xl border border-yellow-400/12 p-8 shadow-[0_20px_60px_rgba(3,3,3,0.6)]"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-extrabold text-yellow-400 tracking-tight">FinEdge</h1>
            <p className="text-xs text-gray-300/80">Secure dashboard access</p>
          </div>
          <div className="text-sm text-gray-300/80">v0.0</div>
        </div>

        <h2 className="text-2xl font-semibold text-white mb-4">
          {isSignup ? "Create your account" : "Sign in to your account"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup && (
            <input
              name="name" type="text" placeholder="Full name" value={formData.name} onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/30 border border-yellow-400/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/30"
            />
          )}
          <input
            name="email" type="email" placeholder="Email" required value={formData.email} onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black/30 border border-yellow-400/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/30"
          />
          <input
            name="password" type="password" placeholder="Password" required value={formData.password} onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black/30 border border-yellow-400/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/30"
          />

          <motion.button whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold shadow-lg">
            {isSignup ? "Create account" : "Sign in"}
          </motion.button>
        </form>

        {message && <p className="mt-4 text-center text-sm text-yellow-400">{message}</p>}

        <div className="text-center text-sm text-gray-300/80 mt-4">
          {isSignup ? (
            <>Already have an account? <button onClick={() => setIsSignup(false)} className="text-yellow-400 hover:underline">Sign in</button></>
          ) : (
            <>Don’t have an account? <button onClick={() => setIsSignup(true)} className="text-yellow-400 hover:underline">Sign Up for free</button></>
          )}
        </div>
      </motion.div>
    </div>
  );
}
