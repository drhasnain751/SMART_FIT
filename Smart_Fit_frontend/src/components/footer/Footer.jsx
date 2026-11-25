import React from "react";
import { Link } from "react-router-dom";
import SmartFitLogo from "../SmartFitLogo";

const Footer = () => {
  const socialLinks = [
    { icon: "/assets/icons/social-icons/instagram.svg", link: "#" },
    { icon: "/assets/icons/social-icons/facebook.svg", link: "#" },
    { icon: "/assets/icons/social-icons/youtube.svg", link: "#" },
    { icon: "/assets/icons/social-icons/X.svg", link: "#" },
    { icon: "/assets/icons/social-icons/tiktok.svg", link: "#" },
  ];

  return (
    <footer className="mx-4 py-[60px]">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between border-b border-shadow-mist pb-6 md:pb-5 gap-6">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <Link to="/">
              <SmartFitLogo darkLogo />
            </Link>
            <span className="text-base font-normal tracking-[-0.16px] leading-[132%] text-slate-gray text-center">
              Grow your your fitness with SmartFit
            </span>
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon, link }, idx) => (
              <a
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-cloud-gray border border-dove-gray text-black flex justify-center items-center"
              >
                <img src={icon} alt="icon" width={20} height={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6 md:pt-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="order-2 md:order-none text-sm font-normal text-[15px] leading-[16px] tracking-[-0.5%] text-slate-gray">
            © {new Date().getFullYear()} — SmartFit
          </div>

          <div className="order-3 md:order-none flex items-center gap-5">
            <Link to="/">
              <span className="text-slate-gray font-medium text-[15px] leading-[16px] tracking-[-0.5%] underline underline-offset-3">
                Privacy Policy
              </span>
            </Link>
            <Link to="/">
              <span className="text-slate-gray font-medium text-[15px] leading-[16px] tracking-[-0.5%] underline underline-offset-3">
                Terms & Conditions
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
