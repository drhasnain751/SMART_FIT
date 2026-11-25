import React from "react";

const SmartFitLogo = ({ darkLogo = false }) => {
  return (
    <div className="flex items-center">
      <img src="/assets/icons/logo.svg" alt="SmartFitLogo" />
      <h1
        className={`text-2xl font-bold font-montserrat ${
          darkLogo ? "text-black" : "text-white"
        }`}
      >
        Smart<span className="font-light">Fit</span>
      </h1>
    </div>
  );
};

export default SmartFitLogo;
