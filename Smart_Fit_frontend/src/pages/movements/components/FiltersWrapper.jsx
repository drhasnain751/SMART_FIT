import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LibraryCard from "./LibraryCard";
import { MovementsGridSkeleton } from "./MovementsGridSkeleton";
// import { mockMovementsData } from "./mockData/mockData";

const FiltersWrapper = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") || "";
  const trainingStyle = searchParams.get("training-style") || "";
  const primaryMuscleFocus = searchParams.get("primary-muscle") || "";
  const secondaryMuscleFocus = searchParams.get("secondary-muscle") || "";
  const equipment = searchParams.get("equipment") || "";
  const difficultyLevel = searchParams.get("difficulty-level") || "";

  const [filteredMovements, setFilteredMovements] = useState([]);
  const [isLoadingMovements, setIsLoadingMovements] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFilteredMovements(mockMovementsData);
      setIsLoadingMovements(false);
    }, 3000);
  }, []);

  return (
    <div>
      {isLoadingMovements ? (
        <MovementsGridSkeleton />
      ) : (
        <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:max-lg:grid-cols-2 gap-4 md:gap-3 h-fit">
          {filteredMovements.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              <h2 className="text-xl font-semibold text-charcoal-gray mb-4">
                Oops! No movements found
              </h2>
              <p className="text-sm md:text-base">
                It seems like there are no movements available at the moment.
                Please check back later or explore other categories to discover
                great resources.
              </p>
            </div>
          ) : (
            filteredMovements.map((movement, index) => (
              <LibraryCard key={index} {...{ movement }} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FiltersWrapper;
