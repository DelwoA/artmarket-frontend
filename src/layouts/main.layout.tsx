import { Outlet } from "react-router";
import Navigation from "@/components/navigation";
import Footer from "@/components/Home/Footer";

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
