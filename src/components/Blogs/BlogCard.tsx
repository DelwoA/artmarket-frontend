import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { slugify } from "@/lib/utils";

type Props = {
  post: {
    id: string | number;
    title: string;
    excerpt: string;
    author: string;
    coverUrl?: string;
  };
};

const BlogCard = ({ post }: Props) => {
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

      <div className="p-4 md:p-5">
        <h3 className="text-sm md:text-base font-semibold leading-tight">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-xs md:text-sm text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-3 flex items-center justify-between text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>by {post.author}</span>
          </div>
          {null}
        </div>

        <Button asChild variant="outline" className="mt-4 w-full">
          <Link to={`/blogs/${slug}`}>Read</Link>
        </Button>
      </div>
    </article>
  );
};

export default BlogCard;
