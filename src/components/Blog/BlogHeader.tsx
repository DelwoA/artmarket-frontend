import { Calendar } from "lucide-react";

type Props = {
  title: string;
  subtitle?: string;
  author: string;
  dateLabel?: string;
  authorAvatarUrl?: string;
};

const BlogHeader = ({
  title,
  subtitle,
  author,
  dateLabel,
  authorAvatarUrl,
}: Props) => {
  return (
    <header className="mb-4 md:mb-6">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-2 text-sm md:text-base text-muted-foreground">
          {subtitle}
        </p>
      ) : null}

      <div className="mt-4 flex items-center gap-3 text-xs md:text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>by {author}</span>
        </div>
        {dateLabel ? (
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> {dateLabel}
          </div>
        ) : null}
        {null}
      </div>
    </header>
  );
};

export default BlogHeader;
