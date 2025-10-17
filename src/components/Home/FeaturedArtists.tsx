import { Link } from "react-router";
import { useMemo } from "react";
import FeaturedArtistCard, { type Artist } from "./FeaturedArtistCard";
import { ARTISTS as ARTISTS_DATA } from "@/lib/data/artists";

const FeaturedArtists = () => {
  const ARTISTS = useMemo<Artist[]>(
    () =>
      ARTISTS_DATA.slice(0, 4).map((artist) => ({
        id: artist.id,
        name: artist.name,
        location: artist.location,
        bio: artist.bio ?? "",
        likes: String(artist.likes),
        views: String(artist.views),
        avatarUrl: artist.avatarUrl,
        profileUrl: artist.profileUrl,
      })),
    []
  );

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

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          {ARTISTS.map((artist) => (
            <FeaturedArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
