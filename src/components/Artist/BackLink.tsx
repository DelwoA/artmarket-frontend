import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";

const BackLink = () => (
  <div className="mb-4 md:mb-6">
    <Link
      to="/artists"
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
    >
      <ChevronLeft className="h-4 w-4" /> Back to Artists
    </Link>
  </div>
);

export default BackLink;
