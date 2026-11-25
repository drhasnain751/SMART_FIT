export const determineBgColor = (pathname) => {
  if (pathname === "/exercise-library") {
    return "bg-black";
  }
  return "bg-white";
};
