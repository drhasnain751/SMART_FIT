// src/layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";
import { Typography } from "../components/Typography";
import SmartFitLogo from "../components/SmartFitLogo";

const AuthLayout = () => {
  return (
    <div className="flex flex-1 min-h-screen">
      <div className="flex-1 lg:flex-[64] h-screen flex justify-center items-center">
        <div className="flex-[58] px-4 sm:px-[10%] flex justify-center items-center">
          <div className="w-full sm:max-w-xl flex justify-center">
            <Outlet />
          </div>
        </div>
      </div>
      <div
        className="hidden lg:flex flex-[36] bg-black p-4 bg-cover bg-center"
        style={{
          backgroundImage: "url(/assets/images/auth-layout-img.png)",
        }}
      >
        <div className="flex-1 flex flex-col gap-2 items-center justify-center p-2">
          <SmartFitLogo />
          <Typography
            className="max-w-[540px] text-center"
            as="h2"
            color="light"
          >
            Your SmartFit Journey Starts Here
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;