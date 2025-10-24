import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";

const RootLayout = () => {
  return (
    <div>
      <Toaster position="bottom-right" />
      <Outlet />
    </div>
  );
};

export default RootLayout;
