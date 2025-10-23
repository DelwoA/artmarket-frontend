import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import BackLink from "@/components/Art/BackLink";
import ArtHeader from "@/components/Art/ArtHeader";
import ImageGallery from "@/components/Art/ImageGallery";
import ArtBody from "@/components/Art/ArtBody";
import { getArts, toggleArtLike, incrementArtView } from "@/lib/arts";
import { slugify } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import Comments from "@/components/Art/Comments";

const ArtPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
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
    liked?: boolean;
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
            liked: Array.isArray(found.likedBy)
              ? found.likedBy.includes(user?.id)
              : false,
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
  }, [slug, user?.id]);

  // Increment view on art load or when art id changes
  useEffect(() => {
    (async () => {
      if (!art?.id) return;
      try {
        const res = await incrementArtView(String(art.id));
        setArt((cur) => (cur ? { ...cur, views: res.views } : cur));
      } catch (e) {
        // non-blocking; ignore errors
      }
    })();
  }, [art?.id]);

  const handleToggleLike = async () => {
    if (!art) return;
    if (!isSignedIn) {
      toast.info("Please sign in to like this art.");
      navigate("/signin");
      return;
    }

    const previous = { likes: art.likes, liked: art.liked ?? false };
    const optimistic = {
      liked: !previous.liked,
      likes: previous.likes + (!previous.liked ? 1 : -1),
    };
    setArt({ ...art, ...optimistic });

    try {
      const token = await getToken();
      const result = await toggleArtLike(String(art.id), token || "");
      setArt((cur) =>
        cur ? { ...cur, likes: result.likes, liked: result.liked } : cur
      );
    } catch (e) {
      // revert on error
      setArt((cur) =>
        cur ? { ...cur, likes: previous.likes, liked: previous.liked } : cur
      );
      toast.error("Failed to update like. Please try again.");
    }
  };

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
                liked={!!art.liked}
                onToggleLike={handleToggleLike}
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
              <Comments artId={String(art.id)} />
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
