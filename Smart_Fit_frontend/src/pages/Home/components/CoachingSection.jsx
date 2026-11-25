import React from "react";

const CoachingSection = ({ features, heading1, heading2, heading3 }) => {
  return (
    <div className="my-16 md:my-[120px]">
      <h3 className="text-[26px] md:text-[42px] tracking-[-1.04px] md:tracking-[-1.68px] font-semibold leading-normal text-black">
        {heading1}{" "}
        <span className="text-semi-transparent-black">{heading2}</span>{" "}
        {heading3}
      </h3>

      <div className="mt-9 flex gap-5 flex-wrap">
        {features.map((feature, idx) => {
          const { title, icon, desc } = feature;
          return (
            <div
              key={title + idx}
              className="flex-1 min-w-[335px] h-[176px] md:h-[252px] p-4.5 md:p-6 flex flex-col justify-between rounded-3xl bg-white border border-light-gray"
            >
              <div className="w-8 h-8 sm:w-[42px] sm:h-[42px]">
                <img src={icon} alt="icon" />
              </div>

              <div className="flex flex-col gap-1 md:gap-2">
                <h4 className="text-[20px] md:text-[28px] tracking-[-0.4px] md:tracking-[-0.56px] leading-normal text-black font-semibold">
                  {title}
                </h4>

                <p className="text-base md:text-[20px] tracking-[-0.16px] md:tracking-[-0.18px] leading-[132%] font-normal text-black">
                  {desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoachingSection;
