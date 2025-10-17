import { Alert } from "@/components/ui/alert";

type Props = {
  show: boolean;
};

const CompletionBanner = ({ show }: Props) => {
  if (!show) return null;
  return (
    <Alert className="border-amber-400 text-amber-900 bg-amber-50">
      Please complete your profile to unlock publishing features.
    </Alert>
  );
};

export default CompletionBanner;
