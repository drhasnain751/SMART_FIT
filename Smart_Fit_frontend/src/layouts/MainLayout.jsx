import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer.jsx";
import Header from "../components/header/Header.jsx";

const MainLayout = () => {
  return (
    <div className="flex">
      <div className="flex-1 flex flex-col">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
