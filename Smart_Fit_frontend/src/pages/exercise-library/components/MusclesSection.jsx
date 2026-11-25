import React from "react";
import { pagesRoutes } from "../../../lib/routes/page-routes";
import { Link } from "react-router-dom";

const MusclesSection = ({ muscles: muscleArr }) => {
  const { movements } = pagesRoutes;

  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-[20px] md:text-[28px] font-medium leading-normal text-black tracking-[-0.8px] md:tracking-[-1.12px]">
        Browse by Muscle
      </h4>
      <div className="flex flex-wrap gap-x-4 md:gap-x-5 gap-y-7 md:gap-y-9">
        {muscleArr.map((muscle, idx) => {
          const { muscleName, muscleIconPath, muscleLabelColor } = muscle;
          const formattedNameForSearch = muscleName
            .toLowerCase()
            .replace(/\s+/g, "-");
          return (
            <Link
              key={idx}
              to={{
                pathname: movements,
                search: `?muscle=${formattedNameForSearch}`,
              }}
            >
              <div className="flex gap-3.5 items-center w-[163px] md:w-[245px]">
                <div
                  style={{ backgroundColor: muscleLabelColor }}
                  className={`w-12 h-12 md:w-[55px] md:h-[55px] p-1.5 md:p-2.5 rounded-full flex items-center justify-center shrink-0`}
                >
                  <img
                    width="35px"
                    height="35px"
                    src={muscleIconPath}
                    alt={muscleName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-1.5">
                  <h4 className="text-[20px] font-medium text-black tracking-[-0.1px] leading-[24px]">
                    {muscleName}
                  </h4>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MusclesSection;
