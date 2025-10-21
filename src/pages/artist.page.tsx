import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BackLink from "@/components/Artist/BackLink";
import ProfileTop from "@/components/Artist/ProfileTop";
import Stats from "@/components/Artist/Stats";
import About from "@/components/Artist/About";
import ArtistTabs from "@/components/Artist/Tabs";
import { getArtists } from "@/lib/artists";
import { getArts } from "@/lib/arts";
import { getBlogs } from "@/lib/blogs";
import { slugify } from "@/lib/utils";

const ArtistPage = () => {
  const params = useParams();
  const slug = params[":slug"] || params.slug;

  const [artist, setArtist] = useState<{
    name: string;
    city: string;
    country: string;
    bio: string;
    totalLikes: number;
    totalViews: number;
  } | null>(null);
  const [artworks, setArtworks] = useState<
    Array<{
      title: string;
      artistName: string;
      price: number;
      likes: number;
      views: number;
      imageUrl?: string;
      availability: "For Sale" | "Not for Sale" | "Sold";
    }>
  >([]);
  const [posts, setPosts] = useState<
    Array<{
      title: string;
      subtitle: string;
      author: string;
      coverUrl?: string;
      views: number;
    }>
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const [artists, arts, blogs] = await Promise.all([
          getArtists(),
          getArts(),
          getBlogs(),
        ]);

        const a = (Array.isArray(artists) ? artists : []).find(
          (x: any) => slugify(x.name) === slug
        );
        if (!a) {
          setError("Artist not found");
          return;
        }
        if (!isMounted) return;
        setArtist({
          name: a.name,
          city: a.city,
          country: a.country,
          bio: a.bio,
          totalLikes: Number(a.totalLikes ?? 0),
          totalViews: Number(a.totalViews ?? 0),
        });

        const filteredArts = (Array.isArray(arts) ? arts : [])
          .filter((art: any) => art.artistName === a.name)
          .map((art: any) => ({
            title: art.title,
            artistName: art.artistName,
            price: Number(art.price ?? 0),
            likes: Number(art.likes ?? 0),
            views: Number(art.views ?? 0),
            imageUrl:
              Array.isArray(art.images) && art.images.length > 0
                ? art.images[0]
                : undefined,
            availability: art.availability as
              | "For Sale"
              | "Not for Sale"
              | "Sold",
          }));
        setArtworks(filteredArts);

        const filteredBlogs = (Array.isArray(blogs) ? blogs : [])
          .filter((b: any) => b.artistName === a.name)
          .map((b: any) => ({
            title: b.title,
            subtitle: b.subtitle,
            author: b.artistName,
            coverUrl: b.image,
            views: Number(b.views ?? 0),
          }));
        setPosts(filteredBlogs);
        setError(null);
      } catch (e) {
        setError("Failed to load artist");
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
        ) : artist ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <ProfileTop
                name={artist.name}
                city={artist.city}
                country={artist.country}
              />
              <About bio={artist.bio} />
              <div className="mt-6">
                <Stats
                  totalLikes={artist.totalLikes}
                  totalViews={artist.totalViews}
                />
              </div>
            </div>
            <div className="lg:col-span-2">
              <ArtistTabs
                artworksCount={artworks.length}
                blogPostsCount={posts.length}
                artworks={artworks}
                blogPosts={posts}
              />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default ArtistPage;
