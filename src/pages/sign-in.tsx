import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center min-h-[92vh]">
      <SignIn />
    </div>
  );
};

export default SignInPage;
