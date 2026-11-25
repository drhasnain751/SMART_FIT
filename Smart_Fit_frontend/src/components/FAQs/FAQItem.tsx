import React from "react";
import { useState } from "react";

const FAQItem = (props) => {
  const { faq, isBlogPage = false } = props;
  const { question, answer } = faq;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="p-4 md:p-6 rounded-[14px] bg-pale-azure cursor-pointer"
    >
      <div className="flex justify-between items-center gap-8">
        <span className="max-md:text-base md:text-[22px] tracking-[-0.16px] md:tracking-[-0.44px] font-medium leading-normal text-black">
          {question}
        </span>

        <div className="w-6 h-6 relative">
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src="/assets/icons/minus-circular.svg"
              height={24}
              width={24}
            />
          </div>
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <img src="/assets/icons/plus-circular.svg" height={24} width={24} />
          </div>
        </div>
      </div>
      <div
        className={`max-w-[544px] overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 mt-2.5" : "max-h-0 mt-0"
        }`}
      >
        <span className="text-[14px] md:text-[16px] font-normal tracking-[-0.16px] leading-[132%] text-slate-gray">
          {answer}
        </span>
      </div>
    </div>
  );
};

export default FAQItem;
