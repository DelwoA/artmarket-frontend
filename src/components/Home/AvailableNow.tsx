import { Link } from "react-router";
import { useMemo, useState } from "react";
import AvailableNowCard from "@/components/Home/AvailableNowCard";
import { ARTS } from "@/lib/data/arts";
import AvailableNowFilter from "@/components/Home/AvailableNowFilter";

const AvailableNow = () => {
  const ITEMS = useMemo(
    () =>
      ARTS.slice(0, 8).map((art) => ({
        id: art.id,
        title: art.title,
        artistName: art.artistName,
        priceUsd: art.priceUsd,
        likes: art.likes,
        views: art.views,
        imageUrl: art.imageUrl,
        artworkUrl: art.artworkUrl,
        artistUrl: art.artistUrl,
      })),
    []
  );

  type SortKey = "Newest" | "Price" | "Popularity";
  const [activeSort, setActiveSort] = useState<SortKey>("Newest");

  const sorted = useMemo(() => {
    const base = [...ITEMS];
    switch (activeSort) {
      case "Price":
        return base.sort((a, b) => b.priceUsd - a.priceUsd);
      case "Popularity":
        // Popularity proxy: likes then views
        return base.sort((a, b) => b.likes - a.likes || b.views - a.views);
      case "Newest":
      default:
        // No createdAt, emulate "newest" by higher id first
        return base.sort((a, b) => b.id - a.id);
    }
  }, [ITEMS, activeSort]);

  return (
    <section className="w-full py-12 md:py-16 bg-background">
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sorted.map((item) => (
            <AvailableNowCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvailableNow;
