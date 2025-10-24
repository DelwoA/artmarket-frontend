import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

const ProtectedLayout = () => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
