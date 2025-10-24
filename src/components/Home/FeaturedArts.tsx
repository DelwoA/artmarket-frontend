import { Link } from "react-router";
import { useEffect, useState } from "react";
import FeaturedArtCard from "@/components/Home/FeaturedArtCard";
import { getArts } from "@/lib/arts";
import { getHomepageConfig } from "@/lib/homepage";

const FeaturedArts = () => {
  const [items, setItems] = useState<
    Array<{
      id: string | number;
      title: string;
      artistName: string;
      price: number;
      likes: number;
      views: number;
      imageUrl?: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const [config, arts] = await Promise.all([
          getHomepageConfig(),
          getArts(),
        ]);
        if (!isMounted) return;
        const list: any[] = Array.isArray(arts) ? arts : [];
        const byId = Object.fromEntries(
          list.map((art: any, idx: number) => [String(art._id ?? idx), art])
        );
        const selectedIds = Array.isArray(config.featuredArtIds)
          ? config.featuredArtIds
          : [];
        const selected = selectedIds
          .map((id) => byId[id])
          .filter(Boolean)
          .map((art: any, idx: number) => ({
            id: art._id ?? idx,
            title: art.title,
            artistName: art.artistName,
            price: Number(art.price ?? 0),
            likes: Number(art.likes ?? 0),
            views: Number(art.views ?? 0),
            imageUrl:
              Array.isArray(art.images) && art.images.length > 0
                ? art.images[0]
                : undefined,
          }));
        setItems(selected);
        setError(null);
      } catch (e) {
        setError("Failed to load arts");
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
            Featured Arts
          </h2>
          <Link
            to="/arts"
            className="text-sm font-medium hover:underline hover:text-foreground"
          >
            Browse all art →
          </Link>
        </div>

        {null}

        {error ? (
          <div className="text-sm text-destructive">{error}</div>
        ) : items.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No featured arts yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(loading ? [] : items).map((item) => (
              <FeaturedArtCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedArts;
