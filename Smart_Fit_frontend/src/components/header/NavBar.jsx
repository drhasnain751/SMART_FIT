// src/components/header/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";

const NavBar = ({
  menuItems,
  isDarkBg,
  pathname,
  menuOpen,
  setMenuOpen,
  showLoginButton,
  handleLogout,
}) => {
  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`${
          showLoginButton ? "max-lg:hidden" : "max-md:hidden"
        } flex items-center gap-6`}
      >
        {menuItems.map((item) => {
          const isActive = pathname === item.link;
          
          // Special styling for AI Planner
          if (item.isSpecial) {
            return (
              <Link
              key={item.label}
              to={item.link}
              aria-current={isActive ? 'page' : undefined}
              className={`
                // Outer Link (The Gradient Stroke)
                relative inline-flex items-center gap-2 rounded-full p-px text-sm font-medium 
                transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400

                ${isActive
                  ? 'bg-slate-900 border-none' 
                  // Inactive: Gradient applied to outer element to show through as the stroke
                  : 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:opacity-90' 
                }
              `}
            >
              {/* The inner div (The main button area) */}
              <div className={`
                inline-flex items-center gap-2 rounded-full px-4 py-2 
                font-medium transition-all duration-200 h-full w-full
                
                ${isActive
                  // Active State: Text is white, inner background doesn't matter much
                  ? 'bg-transparent text-white' 
                  // 🚨 INACTIVE STATE FIX: Set the background to WHITE (or your page's BG color) 
                  // to cover the center of the gradient and reveal only the stroke.
                  : 'bg-white text-slate-800 hover:bg-slate-50' 
                }
              `}>
                <span className={`text-base ${isActive ? 'text-white' : 'text-slate-500'}`}>🧠</span>
                <span>{item.label}</span>
              </div>
            </Link>
            );
          }

          // Regular menu items
          return (
            <Link
              key={item.label}
              to={item.link}
              className={`font-semibold transition-all duration-200 hover:scale-105 ${
                isActive
                  ? isDarkBg
                    ? "text-white border-b-2 border-white"
                    : "text-black border-b-2 border-black"
                  : isDarkBg
                  ? "text-white/80 hover:text-white"
                  : "text-black/80 hover:text-black"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Navigation */}
      <nav
        className={`${
          showLoginButton ? "lg:hidden" : "md:hidden"
        } fixed top-20 right-0 bg-white w-64 h-[calc(100vh-5rem)] shadow-2xl transition-all duration-500 ${
          menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        } flex flex-col p-6`}
      >
        <div className="flex flex-col gap-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.link;
            
            // Special styling for AI Planner in mobile
            if (item.isSpecial) {
              return (
                <Link
                  key={item.label}
                  to={item.link}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  // 1. OUTER LINK (Desktop's styling applied): Acts as the gradient stroke container
                  className={`
                    relative inline-flex items-center gap-2 rounded-full p-px // Changed to rounded-full and p-px
                    font-medium transition-all duration-200 w-full // Added w-full for mobile menu layout
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400

                    ${isActive
                      ? 'bg-slate-900 border-none'
                      // Inactive: Gradient applied to outer element to show through as the stroke
                      : 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:opacity-90' 
                    }
                  `}
                >
                  {/* 2. INNER DIV (Mobile UX adjustments applied): The main button area/mask */}
                  <div className={`
                    inline-flex items-center rounded-full px-6 py-3 // Larger padding (px-6 py-3) and rounded-full for mobile
                    font-medium transition-all duration-200 h-full w-full
                    text-lg justify-start gap-3 // Larger text and left alignment for mobile menus

                    ${isActive
                      // Active State: Text is white, inner background is transparent
                      ? 'bg-transparent text-white' 
                      // Inactive State: Background must match the page BG (using bg-white as placeholder) 
                      // to cover the gradient and show only the stroke.
                      : 'bg-white text-slate-800 hover:bg-slate-50' 
                    }
                  `}>
                    {/* Icon sizing and color adjustments */}
                    <span className={`text-xl ${isActive ? 'text-white' : 'text-slate-500'}`}>🧠</span>
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            }

            // Regular menu items in mobile
            return (
              <Link
                key={item.label}
                to={item.link}
                onClick={() => setMenuOpen(false)}
                className={`font-semibold py-3 px-4 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gray-100 text-black border-l-4 border-black"
                    : "text-gray-700 hover:bg-gray-50 hover:text-black"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        
        <div className="mt-auto pt-4 border-t">
          <Button
            onClick={handleLogout}
            className="w-full bg-darkRed hover:bg-darkRed/90"
          >
            Logout
          </Button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;