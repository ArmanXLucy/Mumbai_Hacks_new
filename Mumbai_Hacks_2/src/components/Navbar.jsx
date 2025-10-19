import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "../images/Logo.png"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-gray-200 px-6 py-4 flex justify-between items-center relative shadow-xl z-40">
     
      <style jsx="true">{`
        .services-btn {
          /* Gold/Orange Gradient */
          background: linear-gradient(90deg, #facc15 0%, #d97706 100%);
          color: #1f2937; /* Dark text for contrast */
          transition: all 0.3s ease-in-out;
          border: none;
        }
        .services-btn:hover {
          /* Gold Glow effect */
          box-shadow: 0 0 15px rgba(250, 204, 21, 0.8), 0 0 5px rgba(250, 204, 21, 0.5); 
          transform: translateY(-1px);
        }
        
        /* Dropdown transition styles (FIXED: Removed display: none)
         * We now rely on opacity and pointer-events for smooth, reliable visibility.
         */
        .dropdown {
            opacity: 0;
            pointer-events: none; /* Prevents interaction when hidden */
            transform: translateY(-10px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .services:hover .dropdown {
            /* display: block is no longer needed */
            opacity: 1;
            pointer-events: auto; /* Allows interaction when visible */
            transform: translateY(0);
        }
      `}</style>

     
<div>
  <Link to="/home" onClick={closeMenu}>
    
    <img 
      src={Logo} 
      alt="MyWebsite Logo" 
      className="h-12 w-auto ml-5" 
    />
  </Link>
</div>

     
      <ul className="hidden md:flex space-x-8 items-center text-lg">
        <li><Link to="/home" className="hover:text-amber-400 transition-colors">Home</Link></li>

        <li className="relative services">
         
          <button className="services-btn px-4 py-2 rounded-lg font-semibold flex items-center shadow-lg">
            Services <ChevronDown size={18} className="ml-1" />
          </button>
          
        
          <ul className="absolute bg-gray-800 rounded-lg shadow-2xl w-56 z-30 border border-amber-400/30 dropdown">
            <li><Link to="/ai" className="block px-4 py-3 text-gray-200 hover:bg-gray-700 hover:text-amber-400 transition-colors rounded-t-lg">AI Assistant</Link></li>
            <li><Link to="/currency-exchange" className="block px-4 py-3 text-gray-200 hover:bg-gray-700 hover:text-amber-400 transition-colors">Currency Exchange</Link></li>
            <li><Link to="/tax-calculator" className="block px-4 py-3 text-gray-200 hover:bg-gray-700 hover:text-amber-400 transition-colors">Tax Calculator</Link></li>
            <li><Link to="/fd-calculator" className="block px-4 py-3 text-gray-200 hover:bg-gray-700 hover:text-amber-400 transition-colors">FD Calculator</Link></li>
            <li><Link to="/retirement-planner" className="block px-4 py-3 text-gray-200 hover:bg-gray-700 hover:text-amber-400 transition-colors rounded-b-lg">Retirement Planner</Link></li>
          </ul>
        </li>

        <li><Link to="/about" className="hover:text-amber-400 transition-colors">About</Link></li>
        <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact</Link></li>
        <li>
          <Link
            to="/"
            className="bg-gray-700 text-amber-400 border border-amber-400/50 px-5 py-2 rounded-lg hover:bg-amber-400 hover:text-gray-900 transition-all font-semibold shadow-md"
          >
            Login
          </Link>
        </li>
      </ul>

      
      <button
        className="text-3xl font-bold md:hidden cursor-pointer p-1 text-amber-400 hover:text-amber-300"
        onClick={toggleMenu}
        aria-label="Open Menu"
      >
        <Menu size={30} />
      </button>

      
      <div
        id="mobileMenu"
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-gray-900/95 backdrop-blur-md text-gray-200 flex flex-col gap-8 p-8 z-50 md:hidden shadow-2xl 
                   transition-transform duration-500 ease-in-out transform 
                   ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button
          id="closeIcon"
          className="absolute top-6 right-6 text-gray-200 hover:text-amber-400 rounded-full text-xl p-2 cursor-pointer transition-colors"
          onClick={toggleMenu}
          aria-label="Close Menu"
        >
          <X size={30} />
        </button>
        
        <ul className="flex flex-col gap-6 mt-16">
            <li><Link to="/" className="text-3xl font-semibold hover:text-amber-400 list-none transition-colors" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/about" className="text-3xl font-semibold hover:text-amber-400 list-none transition-colors" onClick={closeMenu}>About</Link></li>
            
            <li className="text-3xl font-semibold text-gray-400 mt-4 mb-2">Services</li>
            <ul className="flex flex-col gap-2 pl-4 text-xl">
              <li><Link to="/ai" className="hover:text-amber-400 transition-colors" onClick={closeMenu}>AI Assistant</Link></li>
              <li><Link to="/currency-exchange" className="hover:text-amber-400 transition-colors" onClick={closeMenu}>Currency Exchange</Link></li>
              <li><Link to="/tax-calculator" className="hover:text-amber-400 transition-colors" onClick={closeMenu}>Tax Calculator</Link></li>
              <li><Link to="/fd-calculator" className="hover:text-amber-400 transition-colors" onClick={closeMenu}>FD Calculator</Link></li>
              <li><Link to="/retirement-planner" className="hover:text-amber-400 transition-colors" onClick={closeMenu}>Retirement Planner</Link></li>
            </ul>

            <li className="text-3xl font-semibold hover:text-amber-400 list-none mt-4"><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
            <li>
                <Link to="/login" onClick={closeMenu}
                    className="mt-6 inline-block bg-amber-400 text-gray-900 px-6 py-3 rounded-xl font-bold text-2xl text-center shadow-lg hover:bg-amber-300 transition-colors">
                    Login
                </Link>
            </li>
        </ul>
      </div>
    </nav>
  );
}
