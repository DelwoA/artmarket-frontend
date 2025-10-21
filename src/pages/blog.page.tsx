import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import BackLink from "@/components/Blog/BackLink";
import BlogHeader from "@/components/Blog/BlogHeader";
import CoverImage from "@/components/Blog/CoverImage";
import BodyContent from "@/components/Blog/BodyContent";
import { getBlogs } from "@/lib/blogs";
import { slugify } from "@/lib/utils";

const BlogPage = () => {
  const params = useParams();
  const slug = params[":slug"] || params.slug; // router v6 matches 'slug'

  const [blog, setBlog] = useState<{
    id: string | number;
    title: string;
    artistName: string;
    description: string;
    image?: string;
    views: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const blogs = await getBlogs();
        if (!isMounted) return;
        const arr = Array.isArray(blogs) ? blogs : [];
        const found = arr.find((b: any) => slugify(b.title) === slug);
        if (found) {
          setBlog({
            id: found._id,
            title: found.title,
            artistName: found.artistName,
            description: found.description,
            image: found.image,
            views: Number(found.views ?? 0),
          });
          setError(null);
        } else {
          setError("Blog not found");
        }
      } catch (e) {
        setError("Failed to load blog");
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const headerSubtitle = useMemo(
    () =>
      "How to start and grow a meaningful art collection without breaking the bank",
    []
  );

  return (
    <main className="w-full bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-10">
        <BackLink />
        {error ? (
          <div className="text-sm text-destructive">{error}</div>
        ) : blog ? (
          <div className="space-y-6 md:space-y-8">
            <BlogHeader
              title={blog.title}
              subtitle={headerSubtitle}
              author={blog.artistName}
              views={blog.views}
              dateLabel={undefined}
              authorAvatarUrl={undefined}
            />
            <CoverImage src={blog.image} alt={blog.title} />
            <BodyContent description={blog.description} />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default BlogPage;
