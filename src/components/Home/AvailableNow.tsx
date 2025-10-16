import { Link } from "react-router";
import { useMemo } from "react";
import AvailableNowCard, {
  type ArtItem,
} from "@/components/Home/AvailableNowCard";
import AvailableNowFilter from "@/components/Home/AvailableNowFilter";

const AvailableNow = () => {
  const ITEMS = useMemo<ArtItem[]>(
    () => [
      {
        id: 1,
        title: "Serenity in Blue",
        artistName: "Elena Rodriguez",
        priceUsd: 1200,
        likes: 143,
        views: 1892,
        imageUrl:
          "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1600&auto=format&fit=crop",
        artworkUrl: "/art/serenity-in-blue",
        artistUrl: "/artists/elena-rodriguez",
      },
      {
        id: 2,
        title: "Mountain Sunrise",
        artistName: "David Chen",
        priceUsd: 850,
        likes: 98,
        views: 1245,
        imageUrl:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
        artworkUrl: "/art/mountain-sunrise",
        artistUrl: "/artists/david-chen",
      },
      {
        id: 3,
        title: "Urban Jungle",
        artistName: "James Wilson",
        priceUsd: 1500,
        likes: 215,
        views: 2780,
        imageUrl:
          "https://images.unsplash.com/photo-1541959833400-049d37f98ccd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
        artworkUrl: "/art/urban-jungle",
        artistUrl: "/artists/james-wilson",
      },
      {
        id: 4,
        title: "Vibrant Patterns",
        artistName: "Aisha Patel",
        priceUsd: 950,
        likes: 167,
        views: 1932,
        imageUrl:
          "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1600&auto=format&fit=crop",
        artworkUrl: "/art/vibrant-patterns",
        artistUrl: "/artists/aisha-patel",
      },
      {
        id: 5,
        title: "Abstract Emotions",
        artistName: "Elena Rodriguez",
        priceUsd: 1800,
        likes: 189,
        views: 2341,
        imageUrl:
          "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1600&auto=format&fit=crop",
        artworkUrl: "/art/abstract-emotions",
        artistUrl: "/artists/elena-rodriguez",
      },
      {
        id: 6,
        title: "Coastal Dreams",
        artistName: "David Chen",
        priceUsd: 1100,
        likes: 132,
        views: 1567,
        imageUrl:
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop",
        artworkUrl: "/art/coastal-dreams",
        artistUrl: "/artists/david-chen",
      },
      {
        id: 7,
        title: "City Lights",
        artistName: "James Wilson",
        priceUsd: 1350,
        likes: 176,
        views: 2089,
        imageUrl:
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop",
        artworkUrl: "/art/city-lights",
        artistUrl: "/artists/james-wilson",
      },
      {
        id: 8,
        title: "Heritage Threads",
        artistName: "Aisha Patel",
        priceUsd: 780,
        likes: 121,
        views: 1432,
        imageUrl:
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
        artworkUrl: "/art/heritage-threads",
        artistUrl: "/artists/aisha-patel",
      },
    ],
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
