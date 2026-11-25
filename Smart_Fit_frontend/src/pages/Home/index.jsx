import React from "react";
import CoachingSection from "./components/CoachingSection";
import SmartFeatures from "./components/SmartFeatures";
import SmartTracking from "./components/SmartTracking";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { pagesRoutes } from "../../lib/routes/page-routes";
import FAQsSection from "../../components/FAQs/FAQsSection";

const { exerciseLibrary } = pagesRoutes;

const traineeFeatures = [
  {
    title: "Powerful training tools",
    icon: "/assets/icons/king-icon.svg",
    desc: "Access smart features built to track your progress and keep you motivated.",
  },
  {
    title: "Early access discounts",
    icon: "/assets/icons/percent-circle.svg",
    desc: "Get started with exclusive savings as one of our first members.",
  },
  {
    title: "Fitness community",
    icon: "/assets/icons/globle-icon.svg",
    desc: "Join a growing network of individuals pushing toward their fitness goals.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-8 relative  md:mt-[70px] bg-white">
      <div className="m-auto z-10 relative">
        <div className="md:mb-14 max-w-[343px] md:max-w-[663px] m-auto text-black text-center">
          <h1 className="text-[50px] md:text-[70px] tracking-[-2px] md:tracking-[-2.8px] font-semibold leading-[100%] text-black mb-2.5">
            Find Your Coach. Train Anywhere.{" "}
          </h1>
          <h5 className="md:text-[18px] text-lg font-medium text-black">
            Personalized training with top fitness pros—anytime, anywhere.{" "}
          </h5>
          <div className="mt-5 md:mt-6">
            <Button>Join Now</Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/assets/images/exercisemobile.svg"
            className="sm:h-auto h-[450px] w-[1273px] object-cover overflow-hidden"
            alt="exercise library"
            width={1300}
            height={100}
          />
        </div>
        <div className="my-14 mx-4">
          <div className="max-w-[1100px] mx-auto gap-5">
            <CoachingSection
              features={traineeFeatures}
              heading1="Training isn’t just about working out —"
              heading2="it’s about becoming the strongest version of yourself."
              heading3=" Level up your journey with expert guidance, smart tools, and a community that moves with you."
            />
          </div>
        </div>
        <div className="pt-30 bg-black">
          <div className="max-w-[1100px] pb-7.5 mx-auto">
            <h3 className="text-[26px] md:text-[42px] tracking-[-1.04px] md:tracking-[-1.68px] font-semibold leading-normal text-white flex mx-4 sm:mb-0 mb-6 justify-center items-center">
              Enhance workout with smart features{" "}
            </h3>
            <SmartFeatures />
            <div className="md:mt-30 max-w-[343px] md:max-w-[663px] m-auto text-black text-center">
              <h2 className="text-[43px] md:text-[60px] tracking-[-1.72px] md:tracking-[-3px] font-medium leading-[100%] text-white mb-3.5">
                Master Every Movement. Elevate Your Training.{" "}
              </h2>{" "}
              <h6 className="text-[16px] md:text-[20px] font-medium text-[#FFFFFFBF]">
                Explore a comprehensive library of exercises across different
                training styles.
              </h6>
              <div className="mt-5 md:mt-6">
                <Button
                  className="bg-white !text-black hover:bg-white/90 h-[50px] px-6"
                  onClick={() => navigate(exerciseLibrary)}
                >
                  Explore the Excercise Library
                </Button>
              </div>
            </div>
          </div>
          <img
            src="/assets/images/exercise-library.svg"
            alt="exercise library"
            className="w-full"
            width={1400}
            height={100}
          />
        </div>
        <div className="mx-4">
          <div className="max-w-[1100px] mx-auto pt-30">
            <h3 className="text-[26px] md:text-[42px] tracking-[-1.04px] md:tracking-[-1.68px] font-semibold leading-normal text-black sm:mb-0 mb-6">
              Optimize your training with smart tracking
            </h3>
            <div className="mt-9">
              <SmartTracking />
            </div>
          </div>
        </div>
      </div>
      <FAQsSection />
    </div>
  );
};

export default Home;
