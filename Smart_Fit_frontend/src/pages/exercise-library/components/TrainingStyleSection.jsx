import React from "react";
import { Link } from "react-router-dom";
import { pagesRoutes } from "../../../lib/routes/page-routes";

const TrainingStyleSection = ({ trainingStyles: trainingStylesArr }) => {
  const { movements } = pagesRoutes;

  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-[20px] md:text-[28px] font-medium leading-normal text-black tracking-[-0.8px] md:tracking-[-1.12px]">
        Browse by Training Style
      </h4>
      <div className="flex flex-wrap gap-3">
        {trainingStylesArr.map((train, index) => {
          const { trainingStyleName } = train;
          const formattedNameForSearch = trainingStyleName
            .toLowerCase()
            .replace(/\s+/g, "-");

          return (
            <Link
              key={index}
              to={{
                pathname: movements,
                search: `?training-style=${formattedNameForSearch}`,
              }}
            >
              <div className="flex gap-3.5 items-center px-4 py-3 md:px-5 md:py-4 rounded-full border border-ash-gray bg-white shadow-[0px_1px_2px_0px_rgba(0, 0, 0, 0.05)] max-sm:h-8">
                <p className="text-base text-black tracking-[-0.08px] md:tracking-[-0.1px] leading-[20px] md:leading-[24px] font-normal md:font-medium">
                  {trainingStyleName}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TrainingStyleSection;
