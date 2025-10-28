import { Outlet } from "react-router";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
