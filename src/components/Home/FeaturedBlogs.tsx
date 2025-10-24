import { Link } from "react-router";
import { useEffect, useState } from "react";
import BlogCard from "@/components/Blogs/BlogCard";
import { getBlogs } from "@/lib/blogs";
import { getHomepageConfig } from "@/lib/homepage";

type BlogItem = {
  id: string | number;
  title: string;
  excerpt: string;
  author: string;
  coverUrl?: string;
  views: number;
};

const FeaturedBlogs = () => {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const [config, blogs] = await Promise.all([
          getHomepageConfig(),
          getBlogs(),
        ]);
        if (!isMounted) return;
        const list: any[] = Array.isArray(blogs) ? blogs : [];
        const byId = Object.fromEntries(
          list.map((b: any, idx: number) => [String(b._id ?? idx), b])
        );
        const selectedIds = Array.isArray(config.featuredBlogIds)
          ? config.featuredBlogIds
          : [];
        const selected: BlogItem[] = selectedIds
          .map((id) => byId[id])
          .filter(Boolean)
          .map((b: any, idx: number) => ({
            id: b._id ?? idx,
            title: b.title,
            excerpt: b.subtitle,
            author: b.artistName,
            coverUrl: b.image,
            views: Number(b.views ?? 0),
          }));
        setItems(selected);
        setError(null);
      } catch (e) {
        setError("Failed to load blogs");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full my-14 md:my-23 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-4 md:mb-6 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Featured Blogs
          </h2>
          <Link
            to="/blogs"
            className="text-sm font-medium hover:underline hover:text-foreground"
          >
            View all →
          </Link>
        </div>

        {null}

        {error ? (
          <div className="text-sm text-destructive">{error}</div>
        ) : items.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No featured blogs yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(loading ? [] : items).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedBlogs;
