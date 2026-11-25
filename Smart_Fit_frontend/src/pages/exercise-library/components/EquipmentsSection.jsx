import React from "react";
import { Link } from "react-router-dom";
import { pagesRoutes } from "../../../lib/routes/page-routes";

const EquipmentsSection = ({ equipments: movementEquipmentsArr }) => {
  const { movements } = pagesRoutes;
  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-[20px] md:text-[28px] font-medium leading-normal text-black tracking-[-0.8px] md:tracking-[-1.12px]">
        Browse by Equipment
      </h4>
      <div className="flex flex-wrap gap-x-4 md:gap-x-5 gap-y-7 md:gap-y-9">
        {movementEquipmentsArr.map((equipment, index) => {
          const { equipmentName, equipmentIconPath } = equipment;
          const formattedNameForSearch = equipmentName
            .toLowerCase()
            .replace(/\s+/g, "-");

          return (
            <Link
              key={index}
              to={{
                pathname: movements,
                search: `?equipment=${formattedNameForSearch}`,
              }}
              className="p-4 md:p-5 rounded-xl bg-white border border-light-gray sm:max-w-[256px] max-sm:w-[200px] w-full"
            >
              <div key={index} className="flex flex-col gap-4 md:gap-6">
                <div
                  className={`rounded-[10px] border-[0.75px] border-light-gray w-[60px] h-[60px] max-md:!h-12 max-md:!w-12`}
                >
                  <img
                    src={equipmentIconPath}
                    alt={equipmentName}
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                </div>

                <div className="flex flex-col gap-0.5 md:gap-1.5">
                  <h4 className="text-[20px] font-medium text-black tracking-[-0.1px] leading-[24px] whitespace-nowrap">
                    {equipmentName}
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

export default EquipmentsSection;
