import { useState, useEffect } from "react";
import Footer from "../components/Footer";


const customStyles = `
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .animate-spin-slow {
    animation: spin-slow 60s linear infinite; /* 60 seconds for a full rotation */
  }

  @keyframes pulse-subtle {
    0%, 100% {
      transform: scale(1);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.45;
    }
  }
  .animate-pulse-subtle {
    animation: pulse-subtle 10s ease-in-out infinite;
  }
`;


const StyleInjector = () => {
    useEffect(() => {
        if (typeof document !== 'undefined' && !document.getElementById('custom-animations')) {
            const style = document.createElement('style');
            style.id = 'custom-animations';
            style.innerHTML = customStyles;
            document.head.appendChild(style);
        }
    }, []);
    return null;
};



const GlassShape = ({ className, children }) => (
  <div
    className={`absolute rounded-full opacity-20 transition duration-1000 ${className}`}
    style={{
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(255, 215, 0, 0.1)',
      border: '1px solid rgba(255, 215, 0, 0.2)',
      zIndex: 0,
    }}
  >
    {children}
  </div>
);


const RupeeShape = ({ className }) => (
  <div
    className={`absolute flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full text-5xl font-bold text-yellow-500/50 animate-pulse-subtle transition duration-1000 ${className}`}
    style={{
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      border: '2px solid rgba(255, 215, 0, 0.5)',
      zIndex: 0,
    }}
  >
    ₹
  </div>
);

const BitcoinShape = ({ className }) => (
  <div
    className={`absolute flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full text-4xl font-bold text-yellow-500/50 animate-pulse-subtle transition duration-1000 ${className}`}
    style={{
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      border: '2px solid rgba(255, 215, 0, 0.5)',
      zIndex: 0,
    }}
  >
    ₿
  </div>
);


const GraphShape = ({ className }) => (
    <div
        className={`absolute w-32 h-20 md:w-48 md:h-32 transition duration-1000 opacity-20`}
        style={{
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)', 
            border: '2px solid rgba(255, 215, 0, 0.2)',
            borderRadius: '5px',
            clipPath: 'polygon(0 100%, 25% 60%, 50% 80%, 75% 40%, 100% 50%, 100% 100%)', 
            transform: 'rotate(-5deg)',
            zIndex: 0,
        }}
    />
);


function Dashboard() {
  const [formData, setFormData] = useState({
    monthly_income: "",
    house_rent: "",
    emi: "",
    electricity_Bill: "",
    mobile_Reacharge_Bill: "",
    internet_Bill: "",
    card_bill: "",
    others_bill: "",
    taxes: "",
    groceries_expenses: "",
    health_expenses: "",
    public_transportation_cost: "",
    private_transportation_cost: "",
    other_expenses: "",
  });

  const [modelOutput, setModelOutput] = useState(null);
  const [aiOutput, setAiOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(formData).map(([k, v]) => [k, parseFloat(v) || 0])
          )
        ),
      });

      const data = await response.json();

      if (data.model_suggestion) {
        setModelOutput({
          income: formData.monthly_income,
          expenses: data.total_expenses,
          predicted_savings: data.recommended_savings,
          savings_rate: data.model_suggestion.savings_rate,
          level: data.model_suggestion.level,
          message: data.model_suggestion.message,
          plan: data.model_suggestion.plan,
          allocation: data.model_suggestion.investment_allocation,
        });
      }
      setAiOutput(data.ai_suggestion);
    } catch (err) {
      console.error("Error fetching prediction:", err);
    }
    setLoading(false);
  };


  if (showIntro) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-center">
        <div className="p-10 bg-black/70 shadow-2xl rounded-xl border border-yellow-700/50 z-10">
          <h1 className="text-4xl font-light text-white tracking-wider">
             Welcome to the <span className="font-bold text-yellow-500">Financial Intelligence</span> Platform
          </h1>
          <p className="mt-4 text-gray-400 text-lg font-light">
            Providing sophisticated financial predictions and guidance.
          </p>
        </div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        <StyleInjector />
      

      <GlassShape className="w-96 h-96 bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4 animate-spin-slow" />

      <GlassShape className="w-80 h-80 top-0 right-0 transform translate-x-1/4 -translate-y-1/4 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
  
      <GlassShape 
        className="w-64 h-64 top-20 left-1/4 !rounded-none" 
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'rotate(-45deg)' }} 
      />

      <GlassShape 
        className="w-56 h-56 bottom-40 right-10 !rounded-none" 
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'rotate(135deg)' }} 
      />



      <RupeeShape className="top-1/3 left-10 hidden lg:flex" />

      <BitcoinShape className="bottom-1/4 right-5 hidden lg:flex" />

      <GraphShape className="top-10 left-1/2 transform -translate-x-1/2 hidden md:block" />

      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl sm:text-5xl font-extralight text-center text-yellow-500 mb-12 border-b border-yellow-700/50 pb-4">
          Wealth Management Dashboard
        </h1>


        <div className=" text-center text-lg mb-3">**The form must be filled as per monthly data and in INR**</div>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800/80 backdrop-blur-md border border-yellow-700/30 p-6 sm:p-10 rounded-xl shadow-2xl grid md:grid-cols-3 gap-6"
        >
          
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label
                htmlFor={key}
                className="text-sm font-light text-gray-300 mb-1 capitalize tracking-wider"
              >
                {key.replaceAll("_", " ")}
              </label>
              <input
                id={key}
                name={key}
                type="number"
                placeholder={`Enter ${key.replaceAll("_", " ")}`}
                value={formData[key]}
                onChange={handleChange}
                className="border border-gray-600 bg-gray-900 text-white p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500 transition duration-200"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-3 mt-8 bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-bold py-4 rounded-xl transition duration-300 shadow-lg disabled:opacity-50"
          >
            {loading ? "Analyzing Financial Data..." : "Generate Personalized Plan"}
          </button>
        </form>


        {modelOutput && (
          <div className="mt-12 bg-gray-800/80 backdrop-blur-md p-8 shadow-2xl rounded-xl border border-yellow-700/30">
            <h2 className="text-3xl font-light mb-6 text-yellow-500 border-b border-yellow-700/50 pb-3">
              🎯 Financial Model Summary
            </h2>


            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-200 mb-8">
              <StatBox title="Monthly Income" value={`₹${modelOutput.income}`} />
              <StatBox title="Total Expenses" value={`₹${modelOutput.expenses}`} />
              <StatBox title="Target Savings" value={`₹${modelOutput.predicted_savings}`} />
              <StatBox title="Savings Rate" value={`${modelOutput.savings_rate}%`} highlight={modelOutput.savings_rate > 20 ? 'text-green-400' : 'text-yellow-400'} />
            </div>

            <p className="mt-4 text-yellow-400 italic font-light text-lg border-l-4 border-yellow-600 pl-4">{modelOutput.message}</p>

            <div className="mt-8 grid md:grid-cols-2 gap-8">

              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-yellow-500 text-xl mb-3">
                  💵 Recommended Savings Plan
                </h3>
                <ul className="list-none space-y-3">
                  {Object.entries(modelOutput.plan).map(([k, v]) => (
                    <li key={k} className="flex justify-between items-center text-gray-300 border-b border-gray-700/50 pb-2">
                      <span className="capitalize font-light">{k.replaceAll("_", " ")}:</span>
                      <span className="font-medium text-white">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>


              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-yellow-500 text-xl mb-3">
                  💰 Investment Allocation Strategy
                </h3>
                <ul className="list-none space-y-3">
                  {Object.entries(modelOutput.allocation).map(([k, v]) => (
                    <li key={k} className="flex justify-between items-center text-gray-300 border-b border-gray-700/50 pb-2">
                      <span className="capitalize font-light">{k.replaceAll("_", " ")}:</span>
                      <span className="font-medium text-white">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}


        {aiOutput && (
          <div className="mt-12 p-8 bg-gray-900/70 border-l-4 border-yellow-600 shadow-2xl rounded-xl">
            <h2 className="text-3xl font-light mb-4 text-yellow-500">
              💡 Executive Financial Commentary
            </h2>
            <p className="whitespace-pre-line text-gray-300 leading-relaxed font-light">
              {aiOutput}
            </p>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}


const StatBox = ({ title, value, highlight = 'text-yellow-500' }) => (
  <div className="p-4 bg-gray-900/60 rounded-lg shadow-inner border border-yellow-700/20">
    <p className="text-sm font-light text-gray-400 uppercase tracking-wider">{title}</p>
    <p className={`text-2xl font-bold mt-1 ${highlight}`}>{value}</p>
  </div>

);

export default Dashboard;