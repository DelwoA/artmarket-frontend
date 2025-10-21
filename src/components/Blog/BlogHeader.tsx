import { Calendar, Eye } from "lucide-react";

type Props = {
  title: string;
  subtitle?: string;
  author: string;
  views: number;
  dateLabel?: string;
  authorAvatarUrl?: string;
};

const BlogHeader = ({
  title,
  subtitle,
  author,
  views,
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
          {authorAvatarUrl ? (
            <img
              src={authorAvatarUrl}
              alt={author}
              className="h-6 w-6 rounded-full object-cover"
            />
          ) : (
            <div className="h-6 w-6 rounded-full bg-muted/40" />
          )}
          <span>{author}</span>
        </div>
        {dateLabel ? (
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> {dateLabel}
          </div>
        ) : null}
        <div className="flex items-center gap-1.5">
          <Eye className="h-4 w-4" /> {views} views
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
