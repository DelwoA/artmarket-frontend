import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import ArtistCard, {
  type ArtistListItem,
} from "@/components/Artist/ArtistCard";
import { ARTISTS as ARTISTS_DATA } from "@/lib/data/artists";
import COUNTRIES from "@/lib/data/countries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const ArtistPage = () => {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("all");
  const [sort, setSort] = useState("name-asc");

  const ARTISTS = useMemo<ArtistListItem[]>(
    () =>
      ARTISTS_DATA.map((a) => ({
        id: a.id,
        name: a.name,
        location: a.location,
        likes: a.likes,
        views: a.views,
        avatarUrl: a.avatarUrl,
        profileUrl: a.profileUrl,
        artworksUrl: a.artworksUrl,
      })),
    []
  );

  const filtered = ARTISTS.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase().trim())
  )
    .filter((a) =>
      country === "all" ? true : a.location.toLowerCase().includes(country)
    )
    .sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      if (sort === "likes-desc") return b.likes - a.likes;
      if (sort === "views-desc") return b.views - a.views;
      return 0;
    });

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const visible = filtered.slice(startIndex, startIndex + pageSize);

  useEffect(() => {
    setPage(1);
  }, [query, country, sort]);

  return (
    <main className="w-full bg-background">
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-14">
        <header className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold">Artists</h1>
          <p className="mt-1 text-sm md:text-base text-muted-foreground">
            Discover talented artists from around the world
          </p>
        </header>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3 items-center">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search artists by name..."
              className="w-full rounded-md border border-border bg-card/60 px-10 py-2 text-sm outline-none focus:border-ring"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All countries</SelectItem>
              {COUNTRIES.map((c) => (
                <SelectItem key={c.code} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full md:w-[170px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A–Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z–A)</SelectItem>
              <SelectItem value="likes-desc">Likes (High → Low)</SelectItem>
              <SelectItem value="views-desc">Views (High → Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {visible.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </section>

        <div className="mt-6 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button
              key={p}
              variant={p === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(p)}
            >
              {p}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ArtistPage;
