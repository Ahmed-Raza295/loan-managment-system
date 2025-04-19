import { Link } from "react-router-dom";
import React from "react";
const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or Brand */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">Loan Management</Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-blue-200 transition duration-300">Home</Link>
          <Link to="/login" className="text-white hover:text-blue-200 transition duration-300">Login</Link>
          <Link to="/signup" className="text-white hover:text-blue-200 transition duration-300">Sign Up</Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center space-x-4">
          <button className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

  
