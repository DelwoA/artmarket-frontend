import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Link } from "react-router";
import { slugify } from "@/lib/utils";

type Props = {
  post: {
    title: string;
    subtitle: string;
    author: string;
    coverUrl?: string;
    views: number;
  };
};

const BlogCardMini = ({ post }: Props) => {
  const slug = slugify(post.title);
  return (
    <article className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
      <Link to={`/blogs/${slug}`} className="block">
        <div className="aspect-[4/3] w-full bg-muted/20">
          {post.coverUrl ? (
            <img
              src={post.coverUrl}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-sm font-semibold leading-tight">{post.title}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
          {post.subtitle}
        </p>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{post.author}</span>
          <span className="flex items-center gap-1.5">
            <Eye className="h-4 w-4" /> {post.views}
          </span>
        </div>
        <Button asChild variant="outline" className="mt-3 w-full">
          <Link to={`/blogs/${slug}`}>Read</Link>
        </Button>
      </div>
    </article>
  );
};

export default BlogCardMini;
