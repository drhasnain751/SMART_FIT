import { pagesRoutes } from "../../../lib/routes/page-routes";
import { Link } from "react-router-dom";
import React from "react";

const DifficultySection = ({ difficultyLevels: difficultyLevelsArr }) => {
  const { movements } = pagesRoutes;
  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-[20px] md:text-[28px] font-medium leading-normal text-black tracking-[-0.8px] md:tracking-[-1.12px]">
        Browse by Difficulty
      </h4>
      <div className="flex gap-3 w-full flex-wrap">
        {difficultyLevelsArr.map((level, index) => {
          const { difficultyLevel, icon } = level;

          return (
            <Link
              key={index}
              to={{
                pathname: movements,
                search: `?difficulty-level=${difficultyLevel.toLowerCase()}`,
              }}
            >
              <div className="flex flex-col items-center p-5 md:px-[100px] md:py-5 rounded-xl border border-light-gray bg-white flex-1">
                <p className="text-base text-black tracking-[-0.08px] md:tracking-[-0.1px] leading-[20px] md:leading-[24px] font-medium">
                  {difficultyLevel}
                </p>
                <div className="w-[138px] h-[100px] sm:h-[138px]">
                  <img
                    width={138}
                    height={138}
                    src={icon}
                    alt={difficultyLevel}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DifficultySection;
