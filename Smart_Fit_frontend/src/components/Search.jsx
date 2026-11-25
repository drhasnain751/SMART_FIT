import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InputWithEnterAction from "./input-with-enter-action";
import Button from "./Button";

const Search = ({
  initialSearchTerm = "",
  redirectPath,
  className = "bg-white text-base tracking-[-0.08px] leading-[20px] h-[66px] pl-5 border-light-gray rounded-xl shadow-light",
  buttonClassName = "tracking-[-0.07px] leading-[18px] font-semibold py-4 !pl-5 !pr-6 flex items-center gap-1.5 h-auto",
  placeholder = "Find an exercise...",
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    const currentParams = new URLSearchParams(location.search);
    currentParams.set("search", searchTerm);

    const targetPath = redirectPath || location.pathname;
    navigate(`${targetPath}?${currentParams.toString()}`);
  };

  const handleEnterPress = () => {
    handleSearchClick();
  };

  return (
    <div className="w-full max-sm:hidden">
      <InputWithEnterAction
        value={searchTerm}
        onChange={handleSearchChange}
        onEnter={handleEnterPress}
        placeholder={placeholder}
        className={className}
        rightAdornment={
          <Button
            onClick={handleSearchClick}
            type="button"
            className={buttonClassName}
          >
            <img src="/assets/icons/search-icon.svg" alt="search" />
            Search
          </Button>
        }
      />
    </div>
  );
};

export default Search;
