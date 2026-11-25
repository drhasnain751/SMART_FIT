import React from "react";

function InputField({
  className = "",
  type = "text",
  label = "",
  leftAdornment = null,
  rightAdornment = null,
  onRightAdornmentClick = () => {}, // Destructure the prop here and provide a default empty function
  helperText = "",
  ...props
}) {
  const inputId =
    props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const hasError = !!helperText; // Ensure hasError is a boolean

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className={`block mb-1 text-sm font-medium ${
            hasError ? "text-darkRed" : "text-black"
          }`}
        >
          {label}
        </label>
      )}

      <div className="flex flex-col gap-1">
        <div className="relative flex items-center">
          {leftAdornment && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {leftAdornment}
            </div>
          )}

          {/* The <input> element no longer receives the unknown onRightAdornmentClick prop */}
          <input
            id={inputId}
            type={type}
            className={`
              block w-full h-10 px-3 py-2 text-sm rounded-lg border
              ${hasError ? "border-darkRed" : "border-light-gray"}
              focus:border-transparent focus:outline-none focus:ring-1 ${
                hasError ? "focus:ring-darkRed" : "focus:ring-darkCharcoal"
              } transition-colors ${leftAdornment ? "pl-10" : ""} ${
              rightAdornment ? "pr-10" : ""
            } disabled:opacity-50 disabled:cursor-not-allowed ${className}
            `}
            {...props}
          />

          {rightAdornment && (
            // The onClick now directly calls the function passed in props
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={onRightAdornmentClick}
            >
              {rightAdornment}
            </button>
          )}
        </div>
        {hasError && <p className="text-xs text-darkRed">{helperText}</p>}
      </div>
    </div>
  );
}

export default InputField;