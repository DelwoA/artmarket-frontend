import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import BlogCard from "@/components/Blog.tsx/BlogCard";
import { BLOGS, type BlogPost } from "@/lib/data/blogs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const BlogPage = () => {
  const [query, setQuery] = useState("");
  const [author, setAuthor] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const authors = useMemo(() => {
    const set = new Set<string>(["all"]);
    BLOGS.forEach((b) => set.add(b.author));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    const base = BLOGS.filter((b) =>
      b.title.toLowerCase().includes(query.toLowerCase().trim())
    ).filter((b) => (author === "all" ? true : b.author === author));
    const sorted = [...base].sort((a, b) => {
      if (sort === "newest")
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      if (sort === "views-desc") return b.views - a.views;
      if (sort === "title-asc") return a.title.localeCompare(b.title);
      return 0;
    });
    return sorted;
  }, [query, author, sort]);

  const pageSize = 9;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const visible: BlogPost[] = filtered.slice(startIndex, startIndex + pageSize);

  useEffect(() => setPage(1), [query, author, sort]);

  return (
    <main className="w-full bg-background">
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-14">
        <header className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold">Blog</h1>
          <p className="mt-1 text-sm md:text-base text-muted-foreground">
            Insights, stories, and perspectives from the art world
          </p>
        </header>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3 items-center">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blog posts..."
              className="w-full rounded-md border border-border bg-card/60 px-10 py-2 text-sm outline-none focus:border-ring"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          <Select value={author} onValueChange={setAuthor}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select author" />
            </SelectTrigger>
            <SelectContent>
              {authors.map((a) => (
                <SelectItem key={a} value={a}>
                  {a === "all" ? "Select author" : a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="views-desc">Popularity</SelectItem>
              <SelectItem value="title-asc">Title (A–Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {visible.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </section>

        <div className="mt-6 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button
              key={p}
              variant={p === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(p)}
            >
              {p}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
