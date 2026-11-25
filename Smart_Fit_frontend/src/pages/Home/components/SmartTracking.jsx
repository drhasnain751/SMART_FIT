import React from "react";
import Button from "../../../components/Button";

const trainingCards = [
  {
    step: "STEP 1",
    title: "Train Smarter with Wearables",
    description:
      "Wearable devices like smartwatches help track your heart rate, calorie burn.",
    imgPath: "/assets/images/tracking-1.svg",
    features: [
      {
        title: "Real-Time Monitoring",
        description: "Stay aware of your effort throughout your workout.",
        icon: "/assets/icons/zigzag-icon.svg",
      },
      {
        title: "Data-Driven Progress",
        description: "Track your fitness improvements over time.",
        icon: "/assets/icons/stairs-icon.svg",
      },
      {
        title: "Motivation Boost",
        description: "See your stats in action and stay motivated.",
        icon: "/assets/icons/flame-icon.svg",
      },
    ],
    button: {
      text: "Sync Your Smartwatch",
      action: "#",
    },
  },
  {
    step: "STEP 2",
    title: "SmartFit Integration",
    description:
      "Connect your smartwatch to SmartFit and see your heart rate, calorie burn during sessions.",
    imgPath: "/assets/images/tracking-2.svg",
    features: [
      {
        title: "Personalized Coaching",
        description: "Coaches adapt sessions based on real-time stats.",
        icon: "/assets/icons/request-verified.svg",
      },
      {
        title: "Enhanced Engagement",
        description: "Stay focused with useful performance feedback.",
        icon: "/assets/icons/upload-icon.svg",
      },
      {
        title: "Smarter Workouts",
        description: "Train efficiently with data-driven insights.",
        icon: "/assets/icons/brain-icon.svg",
      },
    ],
  },
];

const SmartTracking = () => {
  return (
    <div className="flex sm:flex-row flex-col gap-6">
      {trainingCards.map((card, index) => (
        <div key={index} className="rounded-lg bg-pale-azure">
          <img
            src={card.imgPath}
            alt="imgPath tracking"
            className="rounded-t-lg"
            width={1000}
            height={1000}
          />
          <div className="p-8">
            <h5 className="text-lg font-medium text-semi-transparent-black">
              {card.step}
            </h5>
            <h4 className="text-[20px] md:text-[28px] tracking-[-0.4px] md:tracking-[-0.56px] font-medium leading-normal text-black mt-5 mb-2.5">
              {card.title}
            </h4>
            <p className="md:text-[24px] tracking-[-0.18px] md:tracking-[-0.24px] md:leading-[30px] font-normal text-slate-gray text-[22px]">
              {card.description}
            </p>
            <div className="my-10 flex flex-col gap-4">
              {card.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="sm:w-8 sm:h-8 w-5 h-6">
                    <img
                      src={feature.icon}
                      alt="feature icon"
                      className="sm:w-8 sm:h-8 w-5 h-6"
                    />
                  </div>

                  <span className="flex items-baseline flex-col gap-1">
                    <h6 className="text-[16px] md:text-[20px] text-black font-semibold">
                      {feature.title}
                    </h6>
                    <span className="text-[12px] md:text-base tracking-[-0.12px] md:tracking-[-0.16px] text-slate-gray text-left">
                      {feature.description}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Button className="h-[50px] px-6">Join Now</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SmartTracking;
