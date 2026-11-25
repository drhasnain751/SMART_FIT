import React from "react";
import InputField from "./InputField";

const InputWithEnterAction = ({ onEnter, onKeyDown, ...props }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onEnter?.();
    }
    onKeyDown?.(e);
  };

  return <InputField {...props} onKeyDown={handleKeyDown} />;
};

export default InputWithEnterAction;
