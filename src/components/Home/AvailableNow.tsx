import { Link } from "react-router";
import { useMemo } from "react";
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
          <AvailableNowFilter label="Newest" active />
          <AvailableNowFilter label="Price" />
          <AvailableNowFilter label="Price" />
          <AvailableNowFilter label="Popularity" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <AvailableNowCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvailableNow;
