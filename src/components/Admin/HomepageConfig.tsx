import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ARTISTS } from "@/lib/data/artists";
import { toast } from "sonner";

type Slide = {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
};

const seedSlides: Slide[] = [
  {
    id: "s1",
    title: "Discover Unique Art",
    subtitle: "Curated works from emerging artists worldwide",
    image:
      "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "s2",
    title: "Support Creators",
    subtitle: "Own originals and limited editions",
  },
];

const HomepageConfig = () => {
  // Hero slides state
  const [slides, setSlides] = useState<Slide[]>(seedSlides);
  const [editing, setEditing] = useState<Slide | null>(null);
  const [draft, setDraft] = useState<Slide | null>(null);

  // Featured artists state
  const [featuredIds, setFeaturedIds] = useState<number[]>([1, 3, 7]);
  const approvedArtists = ARTISTS;
  const maxFeatured = 4;

  const featured = useMemo(
    () => approvedArtists.filter((a) => featuredIds.includes(a.id)),
    [approvedArtists, featuredIds]
  );
  const available = useMemo(
    () => approvedArtists.filter((a) => !featuredIds.includes(a.id)),
    [approvedArtists, featuredIds]
  );

  const startNewSlide = () => {
    const s: Slide = { id: `s${Date.now()}`, title: "", subtitle: "" };
    setEditing(s);
    setDraft(s);
  };
  const startEditSlide = (s: Slide) => {
    setEditing(s);
    setDraft({ ...s });
  };
  const saveSlide = () => {
    if (!draft) return;
    setSlides((cur) => {
      const idx = cur.findIndex((s) => s.id === draft.id);
      if (idx === -1) return [...cur, draft];
      const next = cur.slice();
      next[idx] = draft;
      return next;
    });
    setEditing(null);
    setDraft(null);
    toast.success("Hero slides saved");
  };
  const deleteSlide = (id: string) => {
    setSlides((cur) => cur.filter((s) => s.id !== id));
    if (editing?.id === id) {
      setEditing(null);
      setDraft(null);
    }
    toast.warning("Slide deleted");
  };
  const moveSlide = (id: string, dir: -1 | 1) => {
    setSlides((cur) => {
      const idx = cur.findIndex((s) => s.id === id);
      const j = idx + dir;
      if (idx < 0 || j < 0 || j >= cur.length) return cur;
      const next = cur.slice();
      const [sp] = next.splice(idx, 1);
      next.splice(j, 0, sp);
      return next;
    });
  };

  const addFeatured = (id: number) => {
    if (featuredIds.length >= maxFeatured) {
      toast.info(`You can feature up to ${maxFeatured} artists`);
      return;
    }
    setFeaturedIds((cur) => [...cur, id]);
  };
  const removeFeatured = (id: number) => {
    setFeaturedIds((cur) => cur.filter((x) => x !== id));
  };
  const moveFeatured = (id: number, dir: -1 | 1) => {
    setFeaturedIds((cur) => {
      const idx = cur.indexOf(id);
      const j = idx + dir;
      if (idx < 0 || j < 0 || j >= cur.length) return cur;
      const next = cur.slice();
      const [sp] = next.splice(idx, 1);
      next.splice(j, 0, sp);
      return next;
    });
  };
  const saveHomepage = () => {
    toast.success("Homepage configuration saved");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hero Slides */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Hero Slides</h3>
            <Button size="sm" onClick={startNewSlide}>
              New Slide
            </Button>
          </div>
          <Separator className="my-3" />
          <div className="space-y-3">
            {slides.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {s.image ? (
                  <img
                    src={s.image}
                    alt="bg"
                    className="size-12 rounded object-cover"
                  />
                ) : (
                  <div className="size-12 rounded bg-muted" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">
                    {s.title || "(Untitled)"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {s.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveSlide(s.id, -1)}
                    disabled={i === 0}
                  >
                    Up
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveSlide(s.id, 1)}
                    disabled={i === slides.length - 1}
                  >
                    Down
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEditSlide(s)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteSlide(s.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
            {slides.length === 0 && (
              <p className="text-sm text-muted-foreground">No slides yet.</p>
            )}
          </div>
          {draft && (
            <div className="mt-4 rounded-md border p-4 space-y-3">
              <h4 className="text-sm font-semibold">
                {editing ? "Edit Slide" : "New Slide"}
              </h4>
              <Input
                placeholder="Title"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
              <Textarea
                placeholder="Subtitle"
                value={draft.subtitle}
                onChange={(e) =>
                  setDraft({ ...draft, subtitle: e.target.value })
                }
              />
              <Input
                placeholder="Background image URL (optional)"
                value={draft.image ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, image: e.target.value || undefined })
                }
              />
              <div className="flex items-center gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditing(null);
                    setDraft(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={saveSlide}>Save Slide</Button>
              </div>
            </div>
          )}
        </Card>

        {/* Featured Artists */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Featured Artists</h3>
            <Badge variant="secondary">
              {featuredIds.length}/{maxFeatured}
            </Badge>
          </div>
          <Separator className="my-3" />
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Selected (draggable via Up/Down)
            </p>
            {featured.map((a, i) => (
              <div key={a.id} className="flex items-center gap-3">
                <Avatar className="size-9">
                  <AvatarImage src={a.avatarUrl} />
                  <AvatarFallback>{a.name[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{a.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {a.location}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveFeatured(a.id, -1)}
                    disabled={i === 0}
                  >
                    Up
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveFeatured(a.id, 1)}
                    disabled={i === featured.length - 1}
                  >
                    Down
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeFeatured(a.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            {featured.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No featured artists yet.
              </p>
            )}

            <Separator className="my-3" />
            <p className="text-xs text-muted-foreground">Available</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {available.slice(0, 12).map((a) => (
                <div
                  key={a.id}
                  className="flex items-center gap-3 rounded-md border p-2"
                >
                  <Avatar className="size-8">
                    <AvatarImage src={a.avatarUrl} />
                    <AvatarFallback>{a.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{a.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {a.location}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    disabled={featuredIds.length >= maxFeatured}
                    onClick={() => addFeatured(a.id)}
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-end">
        <Button onClick={saveHomepage}>Save Homepage</Button>
      </div>
    </div>
  );
};

export default HomepageConfig;
