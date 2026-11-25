import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { ExerciseLibraryData } from "./components/ExerciseLibraryData";
import Search from "../../components/Search";
import { pagesRoutes } from "../../lib/routes/page-routes";

const ExerciseLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { movements } = pagesRoutes;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    const currentParams = new URLSearchParams(location.search);
    currentParams.set("search", searchTerm);
    navigate(`${movements}?${currentParams.toString()}`);
  };

  return (
    <>
      <div className="pt-[58px] max-sm:pb-[42px] bg-[linear-gradient(180deg,_#000_67.56%,_#383838_100%)]">
        <div
          className="bg-no-repeat bg-center bg-contain lg:bg-cover"
          style={{
            backgroundImage: `url(/assets/images/Bg_lib.avif)`,
          }}
        >
          <div className="mx-4">
            <div className="pt-2.5 sm:pb-20 max-w-[1100px] m-auto text-center text-white">
              <h1 className="text-[50px] md:text-[70px] tracking-[-2px] md:tracking-[-2.8px] font-semibold leading-[100%] mb-2.5 text-white">
                Master Every Movement.
              </h1>
              <p className="text-[18px] md:text-[24px] tracking-[-0.18px] md:tracking-[-0.24px] leading-[24px] md:leading-[30px] font-normal text-white">
                Explore a comprehensive library of exercises across different
                training styles.
              </p>

              
            </div>
          </div>
        </div>

        <div className="mx-4 sm:hidden">
          <div className="mt-8 w-full max-w-[500px] mx-auto">
            <InputField
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Find an exercise..."
              className="bg-faint-white text-base tracking-[-0.08px] leading-[20px] h-[50px] pl-5 border-pale-silver text-white shadow-light"
            />
          </div>
          <div className="mt-4 w-full max-w-[500px] mx-auto">
            <Button
              type="button"
              onClick={handleSearchClick}
              className="bg-ocean-glow hover:bg-ocean-glow/80 tracking-[-0.07px] leading-[18px] font-semibold py-4 !pl-5 !pr-6 flex items-center gap-1.5 h-auto w-full"
            >
              <img src="/assets/icons/search-icon.svg" alt="search" />
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-4">
        <ExerciseLibraryData />
      </div>
    </>
  );
};

export default ExerciseLibrary;
