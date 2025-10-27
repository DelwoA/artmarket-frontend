import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type Props = {
  show: boolean;
};

const CompletionBanner = ({ show }: Props) => {
  if (!show) return null;
  return (
    <Alert className="border-amber-400 text-amber-900 bg-amber-50">
      <AlertTitle>Incomplete Profile</AlertTitle>
      <AlertDescription className="whitespace-normal break-words">
        Please complete your profile to unlock publishing features.
      </AlertDescription>
    </Alert>
  );
};

export default CompletionBanner;
