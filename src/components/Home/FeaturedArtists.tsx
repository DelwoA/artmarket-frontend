import { Link } from "react-router";
import { useMemo } from "react";
import FeaturedArtistCard, { type Artist } from "./FeaturedArtistCard";

const FeaturedArtists = () => {
  const ARTISTS = useMemo<Artist[]>(
    () => [
      {
        id: 1,
        name: "Elena Rodriguez",
        location: "Madrid, Spain",
        bio: "Contemporary abstract painter exploring emotion through color",
        likes: "2,456",
        views: "18,903",
        avatarUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
        profileUrl: "/artists/elena-rodriguez",
      },
      {
        id: 2,
        name: "David Chen",
        location: "Vancouver, Canada",
        bio: "Nature photographer capturing landscapes across North America",
        likes: "1,872",
        views: "15,420",
        avatarUrl:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=256&auto=format&fit=crop",
        profileUrl: "/artists/david-chen",
      },
      {
        id: 3,
        name: "James Wilson",
        location: "London, UK",
        bio: "Urban artist blending traditional techniques with digital elements",
        likes: "3,214",
        views: "22,567",
        avatarUrl:
          "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=256&auto=format&fit=crop",
        profileUrl: "/artists/james-wilson",
      },
      {
        id: 4,
        name: "Aisha Patel",
        location: "Mumbai, India",
        bio: "Textile artist creating vibrant patterns inspired by cultural heritage",
        likes: "1,945",
        views: "16,732",
        avatarUrl:
          "https://images.unsplash.com/photo-1622038094167-a2e40e21df17?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035",
        profileUrl: "/artists/aisha-patel",
      },
    ],
    []
  );

  return (
    <section className="w-full py-12 md:py-16 bg-background">
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
            to="/artists"
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
