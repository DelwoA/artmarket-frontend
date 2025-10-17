import { Outlet } from "react-router";

const ProtectedLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
