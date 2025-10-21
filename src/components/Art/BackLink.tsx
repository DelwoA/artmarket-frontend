import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";

const BackLink = () => {
  return (
    <div className="mb-4 md:mb-6">
      <Link
        to="/arts"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Back to Arts
      </Link>
    </div>
  );
};

export default BackLink;
