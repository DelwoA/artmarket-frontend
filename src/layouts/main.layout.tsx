import { Outlet } from "react-router";
import Navigation from "@/components/navigation";

const MainLayout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default MainLayout;
