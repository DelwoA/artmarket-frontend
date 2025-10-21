import { Link } from "react-router";
import { useEffect, useState } from "react";
import FeaturedArtistCard, { type Artist } from "./FeaturedArtistCard";
import { getArtists } from "@/lib/artists";

const FeaturedArtists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await getArtists();
        if (!isMounted) return;
        const mapped: Artist[] = (Array.isArray(data) ? data : [])
          .slice(0, 4)
          .map((a: any, idx: number) => ({
            id: a._id ?? idx,
            name: a.name,
            location: `${a.city}, ${a.country}`,
            bio: a.bio ?? "",
            likes: String(a.totalLikes ?? 0),
            views: String(a.totalViews ?? 0),
            avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              a.name
            )}&background=E5E7EB&color=111827&size=64`,
            profileUrl: "#",
          }));
        setArtists(mapped);
        setError(null);
      } catch (e) {
        setError("Failed to load artists");
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full my-14 md:my-23 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-6 md:mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Featured Artists
            </h2>
            <p className="mt-1 text-sm md:text-base text-muted-foreground">
              Discover exceptional talent from around the world
            </p>
          </div>
          <Link
            to="/artist"
            className="text-sm font-medium hover:underline hover:text-foreground"
          >
            View all →
          </Link>
        </div>

        {error ? (
          <div className="text-sm text-destructive">{error}</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
            {artists.map((artist) => (
              <FeaturedArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedArtists;
