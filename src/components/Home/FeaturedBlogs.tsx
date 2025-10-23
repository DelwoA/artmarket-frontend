import { Link } from "react-router";
import { useEffect, useMemo, useState } from "react";
import FilterPill from "@/components/Home/FilterPill";
import BlogCard from "@/components/Blogs/BlogCard";
import { getBlogs } from "@/lib/blogs";

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
        const blogs = await getBlogs();
        if (!isMounted) return;
        const mapped: BlogItem[] = (Array.isArray(blogs) ? blogs : [])
          .slice(0, 6)
          .map((b: any, idx: number) => ({
            id: b._id ?? idx,
            title: b.title,
            excerpt: b.subtitle,
            author: b.artistName,
            coverUrl: b.image,
            views: Number(b.views ?? 0),
          }));
        setItems(mapped);
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

  type SortKey = "Newest" | "Popularity" | "Title";
  const [activeSort, setActiveSort] = useState<SortKey>("Newest");

  const sorted = useMemo(() => {
    const base = [...items];
    switch (activeSort) {
      case "Popularity":
        return base.sort((a, b) => b.views - a.views);
      case "Title":
        return base.sort((a, b) => a.title.localeCompare(b.title));
      case "Newest":
      default:
        return base.sort((a, b) => Number(b.id) - Number(a.id));
    }
  }, [items, activeSort]);

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

        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs md:text-sm">
          <FilterPill
            label="Newest"
            active={activeSort === "Newest"}
            onClick={() => setActiveSort("Newest")}
          />
          <FilterPill
            label="Popularity"
            active={activeSort === "Popularity"}
            onClick={() => setActiveSort("Popularity")}
          />
          <FilterPill
            label="Title (A–Z)"
            active={activeSort === "Title"}
            onClick={() => setActiveSort("Title")}
          />
        </div>

        {error ? (
          <div className="text-sm text-destructive">{error}</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(loading ? [] : sorted).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedBlogs;
