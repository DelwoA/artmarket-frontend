import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BackLink from "@/components/Blog/BackLink";
import BlogHeader from "@/components/Blog/BlogHeader";
import CoverImage from "@/components/Blog/CoverImage";
import BodyContent from "@/components/Blog/BodyContent";
import { getBlogs } from "@/lib/blogs";
import { slugify } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Facebook } from "lucide-react";
import WhatsAppIcon from "@/components/Blog/WhatsAppIcon";

const BlogPage = () => {
  const params = useParams();
  const slug = params[":slug"] || params.slug; // router v6 matches 'slug'

  const [blog, setBlog] = useState<{
    id: string | number;
    title: string;
    subtitle: string;
    artistName: string;
    description: string;
    image: string;
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
            subtitle: found.subtitle,
            artistName: found.artistName,
            description: found.description,
            image: found.image,
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
              subtitle={blog.subtitle}
              author={blog.artistName}
              dateLabel={undefined}
            />
            <CoverImage src={blog.image} alt={blog.title} />
            <BodyContent description={blog.description} />
            <div className="pt-4 border-t border-border">
              <div className="text-sm font-medium mb-2">Share this:</div>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      `${window.location.origin}/blogs/${slugify(blog.title)}`
                    )}`}
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                  >
                    <Facebook className="h-4 w-4 mr-2" /> Facebook
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `${window.location.origin}/blogs/${slugify(blog.title)}`
                    )}`}
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                  >
                    <WhatsAppIcon className="h-4 w-4 mr-2" /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default BlogPage;
