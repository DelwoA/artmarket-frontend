import { Link } from "react-router";
import { useEffect, useMemo, useState } from "react";
import AvailableNowCard from "@/components/Home/AvailableNowCard";
import AvailableNowFilter from "@/components/Home/AvailableNowFilter";
import { getArts } from "@/lib/arts";

const AvailableNow = () => {
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
        const arts = await getArts();
        if (!isMounted) return;
        const mapped = (Array.isArray(arts) ? arts : [])
          .slice(0, 8)
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
        setItems(mapped);
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

  type SortKey = "Newest" | "Price" | "Popularity";
  const [activeSort, setActiveSort] = useState<SortKey>("Newest");

  const sorted = useMemo(() => {
    const base = [...items];
    switch (activeSort) {
      case "Price":
        return base.sort((a, b) => b.price - a.price);
      case "Popularity":
        // Popularity proxy: likes then views
        return base.sort((a, b) => b.likes - a.likes || b.views - a.views);
      case "Newest":
      default:
        // No createdAt, emulate "newest" by higher id first
        return base.sort((a, b) => Number(b.id) - Number(a.id));
    }
  }, [items, activeSort]);

  return (
    <section className="w-full my-14 md:my-23 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-4 md:mb-6 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Available Now
          </h2>
          <Link
            to="/art"
            className="text-sm font-medium hover:underline hover:text-foreground"
          >
            Browse all for-sale art →
          </Link>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs md:text-sm">
          <AvailableNowFilter
            label="Newest"
            active={activeSort === "Newest"}
            onClick={() => setActiveSort("Newest")}
          />
          <AvailableNowFilter
            label="Price"
            active={activeSort === "Price"}
            onClick={() => setActiveSort("Price")}
          />
          <AvailableNowFilter
            label="Popularity"
            active={activeSort === "Popularity"}
            onClick={() => setActiveSort("Popularity")}
          />
        </div>

        {error ? (
          <div className="text-sm text-destructive">{error}</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(loading ? [] : sorted).map((item) => (
              <AvailableNowCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AvailableNow;
