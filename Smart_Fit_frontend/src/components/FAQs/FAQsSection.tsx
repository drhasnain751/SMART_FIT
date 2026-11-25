import React from "react";
import FAQItem from "./FAQItem";

const faqsArr = [
  {
    question: "How do I start training on SmartFit?",
    answer:
      "Simply sign up, choose your goals, and get matched with the right tools and programs to begin your fitness journey.",
    id: "1",
  },
  {
    question: "Can I track my progress on the platform?",
    answer:
      "Yes, SmartFit lets you monitor your workouts, progress, and achievements all in one place.",
    id: "2",
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "Yes, you can access your training plans and track progress from anywhere using the SmartFit mobile app.",
    id: "3",
  },
  {
    question: "Do I need equipment to train?",
    answer:
      "Not necessarily! Many programs are designed for bodyweight training, but you can also use equipment if available.",
    id: "4",
  },
];

const FAQsSection = () => {
  return (
    <div className="mx-4 mt-[66px] md:mt-[120px] max-sm:mb-[66px]">
      <div className="max-w-[1100px] mx-auto">
        <div>
          <h3 className="text-[26px] md:text-[42px] tracking-[-1.04px] md:tracking-[-1.68px] font-semibold leading-normal text-black text-center">
            Got questions? we’ve got answers
          </h3>

          <div className="flex flex-col gap-4 mt-8 md:mt-9">
            {faqsArr.map((faq) => (
              <div key={faq.id}>
                <FAQItem faq={faq} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQsSection;
