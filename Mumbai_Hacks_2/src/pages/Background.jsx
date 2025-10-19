import React, { useEffect } from "react";


const customStyles = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 60s linear infinite;
  }

  @keyframes pulse-subtle {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.05); opacity: 0.45; }
  }
  .animate-pulse-subtle {
    animation: pulse-subtle 10s ease-in-out infinite;
  }

  .bg-dashboard-gradient {
    background: linear-gradient(135deg, #000000, #1f2937, #000000);
  }
`;


const StyleInjector = () => {
  useEffect(() => {
    if (typeof document !== "undefined" && !document.getElementById("custom-animations")) {
      const style = document.createElement("style");
      style.id = "custom-animations";
      style.innerHTML = customStyles;
      document.head.appendChild(style);
    }
  }, []);
  return null;
};


const GlassShape = ({ className, style = {} }) => (
  <div
    className={`absolute opacity-20 transition duration-1000 ${className}`}
    style={{
      ...style,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      backgroundColor: "rgba(255, 215, 0, 0.08)",
      border: "1px solid rgba(255, 215, 0, 0.2)",
      zIndex: 0,
      borderRadius: style.borderRadius ?? "50%",
    }}
  />
);


const SymbolShape = ({ symbol, className }) => (
  <div
    className={`absolute flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full text-5xl font-bold text-yellow-500/40 animate-pulse-subtle ${className}`}
    style={{
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      border: "2px solid rgba(255, 215, 0, 0.4)",
      zIndex: 0,
    }}
  >
    {symbol}
  </div>
);

const GraphShape = ({ className }) => (
  <div
    className={`absolute w-32 h-20 md:w-48 md:h-32 opacity-20 ${className}`}
    style={{
      backdropFilter: "blur(15px)",
      WebkitBackdropFilter: "blur(15px)",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "2px solid rgba(255, 215, 0, 0.2)",
      borderRadius: "5px",
      clipPath: "polygon(0 100%, 25% 60%, 50% 80%, 75% 40%, 100% 50%, 100% 100%)",
      transform: "rotate(-5deg)",
      zIndex: 0,
    }}
  />
);


const GlassmorphismBackground = ({ children }) => (
  <div className="min-h-screen bg-dashboard-gradient text-white relative overflow-hidden">
    <StyleInjector />

    <div className="absolute inset-0">

      <GlassShape className="w-96 h-96 bottom-0 left-0 -translate-x-1/4 translate-y-1/4 animate-spin-slow" />
      <GlassShape className="w-80 h-80 top-0 right-0 translate-x-1/4 -translate-y-1/4 animate-spin-slow" style={{ animationDirection: "reverse" }} />


      <GlassShape className="w-64 h-64 top-20 left-1/4" style={{ borderRadius: 0, clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", transform: "rotate(-45deg)" }} />
      <GlassShape className="w-56 h-56 bottom-40 right-10" style={{ borderRadius: 0, clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", transform: "rotate(135deg)" }} />


      <SymbolShape symbol="₹" className="top-1/3 left-10 hidden lg:flex" />
      <SymbolShape symbol="₿" className="bottom-1/4 right-5 hidden lg:flex" />


      <GraphShape className="top-10 left-1/2 -translate-x-1/2 hidden md:block" />
    </div>

    <div className="relative z-10">{children}</div>
  </div>
);

export default GlassmorphismBackground;
