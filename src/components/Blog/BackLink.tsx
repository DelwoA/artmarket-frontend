import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";

type Props = {
  to?: string;
};

const BackLink = ({ to = "/blogs" }: Props) => {
  return (
    <div className="mb-4 md:mb-6">
      <Link
        to={to}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Back to Blog
      </Link>
    </div>
  );
};

export default BackLink;
