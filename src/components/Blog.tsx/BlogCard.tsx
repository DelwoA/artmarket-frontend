import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Link } from "react-router";
import type { BlogPost } from "@/lib/data/blogs";

type Props = {
  post: BlogPost;
};

const BlogCard = ({ post }: Props) => {
  return (
    <article className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
      <Link to={`/blogs/${post.id}`} className="block">
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

      <div className="p-4 md:p-5">
        <h3 className="text-sm md:text-base font-semibold leading-tight">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-xs md:text-sm text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-3 flex items-center justify-between text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-muted/40" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="h-4 w-4" /> {post.views}
          </div>
        </div>

        <Button asChild variant="outline" className="mt-4 w-full">
          <Link to={`/blogs/${post.id}`}>Read</Link>
        </Button>
      </div>
    </article>
  );
};

export default BlogCard;
