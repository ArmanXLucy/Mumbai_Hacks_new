import React from 'react'
import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <div>

      <footer className="bg-[#0a0a0a] py-16 px-6 border-t border-yellow-600">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">

          <div>
            <h2 className="text-3xl font-bold text-yellow-500 mb-3">Finedge</h2>
            <p className="text-gray-400 text-sm">
              Building confidence through transparent and dependable financial services.
            </p>
            <div className="flex items-center justify-center space-x-2 mt-4">
              <MapPin className="w-4 h-4 text-yellow-500" />
              <p className="text-sm">Kolkata, India</p>
            </div>
          </div>

          <div>
            <h3 className="text-yellow-500 font-semibold mb-3">Navigation</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/contact" className=" hover:text-white/80 ">Contact Us</Link></li>
              <li><Link to="/about" className=" hover:text-white/80 ">About</Link></li>
            </ul>
          </div>


          <div>
            <h3 className="text-yellow-500 font-semibold mb-3">Quick Link</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white/80 ">Home</Link></li>
              <li><Link to="/contact" className=" hover:text-white/80 ">Contact Us</Link></li>
              <li><Link to="/about" className=" hover:text-white/80 ">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-yellow-500 font-semibold mb-3">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/ai" className=" hover:text-white/80 ">AI</Link></li>
              <li><Link to="/currency-exchange" className=" hover:text-white/80 ">Currency Exchange</Link></li>
              <li><Link to="/tax-calculator" className=" hover:text-white/80 ">Tax Calculator</Link></li>
              <li><Link to="/fd-calculator" className=" hover:text-white/80 ">FD Calculator</Link></li>
              <li><Link to="/retirement-planner" className=" hover:text-white/80">Retirement Planner</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
          © 2025 Finedge. All Rights Reserved.
        </div>
      </footer>
    </div>
  )
}

export default Footer