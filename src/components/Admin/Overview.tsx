import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import KpiCard from "@/components/Admin/KpiCard";

type Props = {
  counts: {
    pendingArtists: number;
    pendingBlogs: number;
    bannedArtworks: number;
    totalArtists: number;
    totalArtworks: number;
  };
  onQuickNav: (to: "artists" | "blogs" | "artworks" | "homepage") => void;
  recent: Array<{
    id: number;
    type: "artist" | "blog";
    title: string;
    at: string;
  }>;
  loading?: boolean;
};

const Overview = ({ counts, onQuickNav, recent, loading }: Props) => {
  return (
    <div className="space-y-6 min-h-[81vh]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Pending Artists"
          value={counts.pendingArtists}
          loading={loading}
        />
        <KpiCard
          title="Pending Blogs"
          value={counts.pendingBlogs}
          loading={loading}
        />
        <KpiCard
          title="Banned Artworks"
          value={counts.bannedArtworks}
          loading={loading}
        />
        <KpiCard
          title="Total Artists"
          value={counts.totalArtists}
          loading={loading}
        />
        <KpiCard
          title="Total Artworks"
          value={counts.totalArtworks}
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-sm font-semibold">Quick links</h3>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => onQuickNav("artists")}>
              Review Artists
            </Button>
            <Button variant="outline" onClick={() => onQuickNav("blogs")}>
              Review Blogs
            </Button>
            <Button variant="outline" onClick={() => onQuickNav("artworks")}>
              Moderate Artworks
            </Button>
            <Button variant="outline" onClick={() => onQuickNav("homepage")}>
              Edit Homepage
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-semibold">Recent activity</h3>
          <Separator className="my-3" />
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 rounded-md bg-muted/50" />
              ))}
            </div>
          ) : recent.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent activity</p>
          ) : (
            <ul className="space-y-3">
              {recent.map((r) => (
                <li key={r.id} className="text-sm">
                  <span className="font-medium capitalize">{r.type}</span>:{" "}
                  {r.title}
                  <span className="text-muted-foreground"> · {r.at}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Overview;
