import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoginModal, RegisterModal } from './AuthModals';

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <img src="/logo.png" alt="Market Me Logo" className="h-16 w-auto object-contain hover:scale-105 transition-transform duration-300" />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <Link to="/agencies" className="text-gray-300 hover:text-white px-4 py-3 rounded-md text-base font-medium tracking-wide hover:bg-gray-800 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-105">Agencies</Link>
                <Link to="/about" className="text-gray-300 hover:text-white px-4 py-3 rounded-md text-base font-medium tracking-wide hover:bg-gray-800 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-105">About</Link>
                <Link to="/guidelines" className="text-gray-300 hover:text-white px-4 py-3 rounded-md text-base font-medium tracking-wide hover:bg-gray-800 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-105">Guidelines and Rules</Link>
              </div>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-gray-300 text-base font-semibold tracking-wide">Welcome, {user.username}</span>
                  <button
                    onClick={logout}
                    className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-5 py-2.5 rounded-md text-base font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:scale-105"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md text-base font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:scale-105"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setShowRegister(true)}
                    className="ml-4 bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-5 py-2.5 rounded-md text-base font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:scale-105"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} border-t border-gray-800`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
          >
            Home
          </Link>
          <Link
            to="/agencies"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
          >
            Agencies
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
          >
            About
          </Link>
          <Link
            to="/guidelines"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
          >
            Guidelines and Rules
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-800">
          <div className="px-2 space-y-1">
            {user ? (
              <>
                <div className="px-3 py-2 text-gray-300 text-base font-semibold">
                  Welcome, {user.username}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setShowRegister(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
    </nav>
  );
};

export default Navbar;