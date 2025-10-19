import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AI from "./pages/AI";
import CurrencyExchange from "./pages/CurrencyExchange";
import TaxCalculator from "./pages/TaxCalculator";
import FDCalculator from "./pages/FDCalculator";;
import RetirementPlanner from "./pages/RetirementPlanner";
import Chatbot from "./components/Chatbot";
import { Calculator } from "lucide-react";


function ProtectedRoute({ element: Component, isAuthenticated }) {
  return isAuthenticated ? <Component /> : <Navigate to="/" replace />;
}

function App() {
  const location = useLocation();
  
 
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

 
  return (
    <>
      
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        
        <Route path="/home" element={<ProtectedRoute element={Home} isAuthenticated={isAuthenticated} />} />
        <Route path="/about" element={<ProtectedRoute element={About} isAuthenticated={isAuthenticated} />} />
        <Route path="/contact" element={<ProtectedRoute element={Contact} isAuthenticated={isAuthenticated} />} />
        <Route path="/ai" element={<ProtectedRoute element={AI} isAuthenticated={isAuthenticated} />} />
        <Route path="/currency-exchange" element={<ProtectedRoute element={CurrencyExchange} isAuthenticated={isAuthenticated} />} />
        <Route path="/tax-calculator" element={<ProtectedRoute element={TaxCalculator} isAuthenticated={isAuthenticated} />} />
        <Route path="/fd-calculator" element={<ProtectedRoute element={FDCalculator} isAuthenticated={isAuthenticated} />} />
        <Route path="/retirement-planner" element={<ProtectedRoute element={RetirementPlanner} isAuthenticated={isAuthenticated} />} />
      </Routes>

      <Calculator />
      <Chatbot />
    </>
  );
}

export default App;
