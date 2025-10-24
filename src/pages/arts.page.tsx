import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { Search } from "lucide-react";
import ArtCard from "@/components/Arts/ArtCard";
import { getArts } from "@/lib/arts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/data/categories";

const ArtsPage = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [artist, setArtist] = useState("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<
    Array<{
      id: string | number;
      title: string;
      artistName: string;
      category?: string;
      price: number;
      likes: number;
      views: number;
      imageUrl?: string;
    }>
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const arts = await getArts({ category });
        if (!isMounted) return;
        const mapped = (Array.isArray(arts) ? arts : []).map(
          (art: any, idx: number) => ({
            id: art._id ?? idx,
            title: art.title,
            artistName: art.artistName,
            category: art.category,
            price: Number(art.price ?? 0),
            likes: Number(art.likes ?? 0),
            views: Number(art.views ?? 0),
            imageUrl:
              Array.isArray(art.images) && art.images.length > 0
                ? art.images[0]
                : undefined,
          })
        );
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
  }, [category]);

  const artists = useMemo(() => {
    const set = new Set<string>(["all"]);
    items.forEach((a) => set.add(a.artistName));
    return Array.from(set);
  }, [items]);

  const filtered = useMemo(() => {
    const base = items
      .filter((a) =>
        `${a.title} ${a.artistName}`
          .toLowerCase()
          .includes(query.toLowerCase().trim())
      )
      .filter((a) => (category === "all" ? true : a.category === category))
      .filter((a) => (artist === "all" ? true : a.artistName === artist));

    const sorted = [...base].sort((a, b) => {
      if (sort === "newest") return Number(b.id) - Number(a.id); // proxy for recency
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "popularity") return b.views - a.views;
      return 0;
    });
    return sorted;
  }, [items, query, artist, sort]);

  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const visible = filtered.slice(startIndex, startIndex + pageSize);

  useEffect(() => setPage(1), [query, category, artist, sort]);

  // Initialize artist filter from query string (?artist=Name)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const artistParam = params.get("artist");
    if (artistParam) {
      setArtist(artistParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        <div className="mb-6 grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-3 items-center">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search art..."
              className="w-full rounded-md border border-border bg-card/60 px-10 py-2 text-sm outline-none focus:border-ring"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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

        {error ? (
          <div className="text-sm text-destructive">{error}</div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {(loading ? [] : visible).map((item) => (
              <ArtCard key={item.id} item={item} />
            ))}
          </section>
        )}

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

export default ArtsPage;
