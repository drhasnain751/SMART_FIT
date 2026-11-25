// src/components/header/Header.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { determineBgColor } from "../../lib/utils/headerUtils";
import { pagesRoutes } from "../../lib/routes/page-routes";
import SmartFitLogo from "../SmartFitLogo";
import NavBar from "./NavBar";
import MenuIcon from "../../assets/icons/menu-icon.svg?react";
import CancelIcon from "../../assets/icons/cancel-icon.svg?react";
import Button from "../Button";
import { useAuth } from "../../providers/AuthProvider";

const { exerciseLibrary, movements, aiPlanner } = pagesRoutes;

const sectionIdsToHide = [];

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const { logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [shadowOpacity, setShadowOpacity] = useState(0);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDarkBg, setIsDarkBg] = useState(false);

  const headerBgColor = determineBgColor(pathname);

  // ✅ Detect if the current page is Exercise Library
  const isExerciseLibrary = pathname === exerciseLibrary;

  const menuItems = [
    { label: "AI Planner", link: aiPlanner, isSpecial: true },
    { label: "Exercise Library", link: exerciseLibrary },
    { label: "Movements", link: movements },
  ];

  const showLoginButton = pathname === exerciseLibrary;

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleResize = () => {
    if (window.innerWidth >= 640) setMenuOpen(false);
  };

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const isHide = currentScrollY > lastScrollY && currentScrollY > 100;
    setHideHeader(isHide);
    setLastScrollY(currentScrollY);
    setShadowOpacity(Math.min(currentScrollY / 2000, 0.6));
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!sectionIdsToHide.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        setHideHeader(isVisible);
      },
      { threshold: 0.8 }
    );
    sectionIdsToHide.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    setIsDarkBg(headerBgColor === "bg-black");
  }, [headerBgColor]);

  const handleLogout = () => {
    logout();
  };

  return (
    <header
      style={{ boxShadow: `0 8px 16px rgba(0, 0, 0, ${shadowOpacity})` }}
      className={`sticky top-0 z-[99] transition-all duration-500 ${
        hideHeader ? "-translate-y-full" : "translate-y-0"
      } ${headerBgColor}`}
    >
      <div className="mx-4">
        {/* Conditionally change max width if on Exercise Library page */}
        <div
          className={`mx-auto ${
            isExerciseLibrary ? "max-w-[1400px]" : "max-w-[1100px]"
          } flex justify-between items-center ${
            isExerciseLibrary ? "h-[10px]" : "py-4"
          } md:text-base text-sm`}
        >
          {/* Logo */}
          <div className={`flex items-center gap-3 ${isExerciseLibrary ? "mt-6 md:mt-14" : ""}`}>
          <Link to="/">
            <SmartFitLogo darkLogo={!isDarkBg} />
          </Link>
        </div>

          {/* Overlay for mobile menu */}
          <div
            className={`fixed top-20 inset-0 bg-black bg-opacity-50 transition-all duration-500 ${
              menuOpen
                ? "opacity-100 scale-100 visible"
                : "opacity-0 scale-95 invisible"
            }`}
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Nav and buttons */}
          <div className={`flex items-center gap-6 ${isExerciseLibrary ? "mt-2 md:mt-13" : ""}`}>
            <NavBar
              {...{
                menuItems,
                isDarkBg,
                pathname,
                menuOpen,
                setMenuOpen,
                showLoginButton,
                handleLogout,
              }}
            />
            <div className="max-sm:hidden flex gap-2">
              <Button
                onClick={handleLogout}
                className="bg-darkRed hover:bg-darkRed/90"
              >
                Logout
              </Button>
            </div>

            {/* Hamburger menu */}
            <button
              className={`flex cursor-pointer w-6 h-6 relative ${
                isDarkBg ? "text-white" : "text-black"
              } ${showLoginButton ? "lg:hidden" : "md:hidden"}`}
              onClick={toggleMenu}
            >
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                } ${isDarkBg ? "text-white" : "text-black"}`}
              >
                <CancelIcon height={24} width={24} />
              </div>
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                } ${isDarkBg ? "text-white" : "text-black"}`}
              >
                <MenuIcon width={24} height={24} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
