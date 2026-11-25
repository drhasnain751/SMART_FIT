const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-sm font-semibold transition-all outline-none rounded-full bg-black text-white shadow-xs hover:bg-black/90 h-10 px-4 py-3 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
