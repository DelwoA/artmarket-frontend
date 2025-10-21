import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BackLink from "@/components/Art/BackLink";
import ArtHeader from "@/components/Art/ArtHeader";
import ImageGallery from "@/components/Art/ImageGallery";
import ArtBody from "@/components/Art/ArtBody";
import { getArts } from "@/lib/arts";
import { slugify } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ArtPage = () => {
  const params = useParams();
  const slug = params[":slug"] || params.slug;

  const [art, setArt] = useState<{
    id: string | number;
    title: string;
    artistName: string;
    description: string;
    price: number;
    likes: number;
    views: number;
    images: string[];
    availability: "For Sale" | "Not for Sale" | "Sold";
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const arts = await getArts();
        if (!isMounted) return;
        const found = (Array.isArray(arts) ? arts : []).find(
          (a: any) => slugify(a.title) === slug
        );
        if (found) {
          setArt({
            id: found._id,
            title: found.title,
            artistName: found.artistName,
            description: found.description,
            price: Number(found.price ?? 0),
            likes: Number(found.likes ?? 0),
            views: Number(found.views ?? 0),
            images: Array.isArray(found.images) ? found.images : [],
            availability: found.availability as
              | "For Sale"
              | "Not for Sale"
              | "Sold",
          });
          setError(null);
        } else {
          setError("Artwork not found");
        }
      } catch (e) {
        setError("Failed to load artwork");
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
        ) : art ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="order-2 md:order-1">
              <div className="mb-2">
                <Badge
                  variant="outline"
                  className={
                    art.availability === "For Sale"
                      ? "border-green-500 text-green-500"
                      : art.availability === "Sold"
                      ? "border-red-500 text-red-500"
                      : "border-yellow-500 text-yellow-500"
                  }
                >
                  {art.availability}
                </Badge>
              </div>
              <ArtHeader
                title={art.title}
                artistName={art.artistName}
                price={art.price}
                likes={art.likes}
                views={art.views}
                availability={art.availability}
              />
              {art.availability === "For Sale" ? (
                <Button size="lg" className="mb-4">
                  Buy now •{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(art.price)}
                </Button>
              ) : null}
              <ArtBody description={art.description} />
            </div>
            <div className="order-1 md:order-2">
              <ImageGallery images={art.images} />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default ArtPage;
