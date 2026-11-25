import React, { useState } from "react";

const tabData = [
  {
    id: "1",
    title: "Find vetted 1-1 trainers",
    desc: "Get matched with top fitness professionals who align with your goals and preferences.",
    image: "/assets/images/smartfeature-1.svg",
  },
  {
    id: "2",
    title: "Attend group classes",
    desc: "Interactive live session controls, and manage real-time exercises.",
    image: "/assets/images/smartfeature-2.svg",
  },
  {
    id: "3",
    title: "Optimize your training regime",
    desc: "Monitor your training time, and calories burned, and keeping your session schedule organized.",
    image: "/assets/images/smartfeature-3.svg",
  },
];

const SmartFeatures = () => {
  const [selectedTab, setSelectedTab] = useState("1");

  return (
    <div className="flex mx-4 gap-10 mt-8 flex-row-reverse">
      <div className="md:flex hidden">
        {selectedTab === "1" && (
          <div>
            {" "}
            <img
              src="/assets/images/smartfeature-1.svg"
              className="h-[530px]"
              width={1400}
              height={6}
              alt="Build & launch your coaching services"
            />
          </div>
        )}
        {selectedTab === "2" && (
          <div>
            {" "}
            <img
              src="/assets/images/smartfeature-2.svg"
              className="h-[530px]"
              width={1400}
              height={1000}
              alt="Build & launch your coaching services"
            />
          </div>
        )}
        {selectedTab === "3" && (
          <div>
            <img
              src="/assets/images/smartfeature-3.svg"
              className="h-[530px]"
              width={1400}
              height={1000}
              alt="Build & launch your coaching services"
            />
          </div>
        )}
      </div>

      {/* Tabs Section */}
      <div className="flex flex-col items-baseline">
        {tabData.map((tab) => (
          <div
            key={tab.id}
            className={`w-full cursor-pointer py-5 px-4 border-l-2 transition-all duration-300 ${
              selectedTab === tab.id
                ? "border-orange-red bg-[#FFFFFF29]"
                : "border-[#FFFFFF52]"
            }`}
            onClick={() => setSelectedTab(tab.id)}
          >
            <div className="flex sm:flex-row flex-col items-baseline gap-4">
              <div>
                <span
                  className={`rounded-full w-8 h-8 text-white flex items-center justify-center font-semibold ${
                    selectedTab === tab.id
                      ? " bg-orange-red"
                      : " bg-[#FFFFFF33]"
                  }`}
                >
                  {tab.id}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h6 className="text-[20px] text-white font-semibold">
                  {tab.title}
                </h6>
                <p className="text-base tracking-[-0.16px] font-normal text-[#FFFFFFB2]">
                  {tab.desc}
                </p>
              </div>
            </div>

            {selectedTab === tab.id && (
              <div className="md:hidden flex items-center justify-center mt-4">
                <img
                  src={tab.image}
                  className="w-[530px]"
                  width={1400}
                  height={1000}
                  alt="Training feature"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartFeatures;
