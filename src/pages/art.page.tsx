import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import ArtCard from "@/components/Art/ArtCard";
import { ARTS, type ArtItem } from "@/lib/data/arts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const ArtPage = () => {
  const [query, setQuery] = useState("");
  const [artist, setArtist] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const artists = useMemo(() => {
    const set = new Set<string>(["all"]);
    ARTS.forEach((a) => set.add(a.artistName));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    const base = ARTS.filter((a) =>
      `${a.title} ${a.artistName}`
        .toLowerCase()
        .includes(query.toLowerCase().trim())
    ).filter((a) => (artist === "all" ? true : a.artistName === artist));

    const sorted = [...base].sort((a, b) => {
      if (sort === "newest") return b.id - a.id; // proxy for recency
      if (sort === "price-asc") return a.priceUsd - b.priceUsd;
      if (sort === "price-desc") return b.priceUsd - a.priceUsd;
      if (sort === "popularity") return b.views - a.views;
      return 0;
    });
    return sorted;
  }, [query, artist, sort]);

  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const visible: ArtItem[] = filtered.slice(startIndex, startIndex + pageSize);

  useEffect(() => setPage(1), [query, artist, sort]);

  return (
    <main className="w-full bg-background">
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-14">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">Art Collection</h1>
          <p className="mt-1 text-sm md:text-base text-muted-foreground">
            Explore our curated collection of original artworks from talented
            artists
          </p>
        </header>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3 items-center">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search art..."
              className="w-full rounded-md border border-border bg-card/60 px-10 py-2 text-sm outline-none focus:border-ring"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          <Select value={artist} onValueChange={setArtist}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select artist" />
            </SelectTrigger>
            <SelectContent>
              {artists.map((a) => (
                <SelectItem key={a} value={a}>
                  {a === "all" ? "Select artist" : a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full md:w-[160px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price (Low → High)</SelectItem>
              <SelectItem value="price-desc">Price (High → Low)</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {visible.map((item) => (
            <ArtCard key={item.id} item={item} />
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

export default ArtPage;
