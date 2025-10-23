import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getArtists } from "@/lib/artists";
import { getArts } from "@/lib/arts";
import { getBlogs } from "@/lib/blogs";
import {
  getHomepageConfig,
  saveHomepageConfig,
  type HomeConfig,
} from "@/lib/homepage";
import { toast } from "sonner";

type ArtistItem = {
  id: string;
  name: string;
  location: string;
  avatarUrl: string;
};
type ArtItem = {
  id: string;
  title: string;
  artistName: string;
  imageUrl?: string;
};
type BlogItem = {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
};

const MAX = { artists: 4, arts: 8, blogs: 6 } as const;

const HomepageConfig = () => {
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState<ArtistItem[]>([]);
  const [arts, setArts] = useState<ArtItem[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [saved, setSaved] = useState<HomeConfig | null>(null);
  const [draft, setDraft] = useState<HomeConfig>({
    featuredArtistIds: [],
    featuredArtIds: [],
    featuredBlogIds: [],
  });

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const [artistsRaw, artsRaw, blogsRaw, config] = await Promise.all([
          getArtists(),
          getArts(),
          getBlogs(),
          getHomepageConfig(),
        ]);

        if (!isMounted) return;
        setArtists(
          (Array.isArray(artistsRaw) ? artistsRaw : []).map(
            (a: any, i: number) => ({
              id: String(a._id ?? i),
              name: a.name,
              location: `${a.city}, ${a.country}`,
              avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                a.name
              )}&background=E5E7EB&color=111827&size=64`,
            })
          )
        );
        setArts(
          (Array.isArray(artsRaw) ? artsRaw : []).map(
            (art: any, i: number) => ({
              id: String(art._id ?? i),
              title: art.title,
              artistName: art.artistName,
              imageUrl:
                Array.isArray(art.images) && art.images.length > 0
                  ? art.images[0]
                  : undefined,
            })
          )
        );
        setBlogs(
          (Array.isArray(blogsRaw) ? blogsRaw : []).map(
            (b: any, i: number) => ({
              id: String(b._id ?? i),
              title: b.title,
              author: b.artistName,
              coverUrl: b.image,
            })
          )
        );
        setSaved(config);
        setDraft(config);
      } catch (e) {
        toast.error("Failed to load homepage data");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const byId = <T extends { id: string }>(list: T[]) =>
    Object.fromEntries(list.map((x) => [x.id, x]));

  const artistsMap = useMemo(() => byId(artists), [artists]);
  const artsMap = useMemo(() => byId(arts), [arts]);
  const blogsMap = useMemo(() => byId(blogs), [blogs]);

  const move = (arr: string[], id: string, dir: -1 | 1) => {
    const idx = arr.indexOf(id);
    const j = idx + dir;
    if (idx < 0 || j < 0 || j >= arr.length) return arr;
    const next = arr.slice();
    const [sp] = next.splice(idx, 1);
    next.splice(j, 0, sp);
    return next;
  };

  const remove = (arr: string[], id: string) => arr.filter((x) => x !== id);
  const add = (arr: string[], id: string, max: number) =>
    arr.includes(id) || arr.length >= max ? arr : [...arr, id];

  const resetDraft = () => {
    if (!saved) return;
    setDraft(saved);
    toast.info("Changes cleared");
  };

  const onSave = async () => {
    try {
      const payload: HomeConfig = {
        featuredArtistIds: draft.featuredArtistIds,
        featuredArtIds: draft.featuredArtIds,
        featuredBlogIds: draft.featuredBlogIds,
      };
      const result = await saveHomepageConfig(payload);
      setSaved(result);
      setDraft(result);
      toast.success("Homepage saved");
    } catch (e) {
      toast.error("Failed to save homepage");
    }
  };

  return (
    <div className="space-y-4 min-h-[81vh] mb-15">
      <Tabs defaultValue="artists" className="flex flex-col h-full">
        <TabsList>
          <TabsTrigger value="artists">Featured Artists</TabsTrigger>
          <TabsTrigger value="arts">Featured Arts</TabsTrigger>
          <TabsTrigger value="blogs">Featured Blogs</TabsTrigger>
        </TabsList>

        {/* Artists Tab */}
        <TabsContent value="artists">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Featured Artists</h3>
              <Badge variant="secondary">
                {draft.featuredArtistIds.length}/{MAX.artists}
              </Badge>
            </div>
            <Separator className="my-3" />

            <p className="text-xs text-muted-foreground">Selected</p>
            <div className="space-y-3">
              {draft.featuredArtistIds.map((id, i) => {
                const a = artistsMap[id];
                if (!a) return null;
                return (
                  <div key={id} className="flex items-center gap-3">
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
                        onClick={() =>
                          setDraft((d) => ({
                            ...d,
                            featuredArtistIds: move(
                              d.featuredArtistIds,
                              id,
                              -1
                            ),
                          }))
                        }
                        disabled={i === 0}
                      >
                        Up
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setDraft((d) => ({
                            ...d,
                            featuredArtistIds: move(d.featuredArtistIds, id, 1),
                          }))
                        }
                        disabled={i === draft.featuredArtistIds.length - 1}
                      >
                        Down
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          setDraft((d) => ({
                            ...d,
                            featuredArtistIds: remove(d.featuredArtistIds, id),
                          }))
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
              {draft.featuredArtistIds.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No artists selected.
                </p>
              )}
            </div>

            <Separator className="my-3" />
            <p className="text-xs text-muted-foreground">Available</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {artists.map((a) => (
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
                    disabled={draft.featuredArtistIds.length >= MAX.artists}
                    onClick={() =>
                      setDraft((d) => ({
                        ...d,
                        featuredArtistIds: add(
                          d.featuredArtistIds,
                          a.id,
                          MAX.artists
                        ),
                      }))
                    }
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Arts Tab */}
        <TabsContent value="arts">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Featured Arts</h3>
              <Badge variant="secondary">
                {draft.featuredArtIds.length}/{MAX.arts}
              </Badge>
            </div>
            <Separator className="my-3" />

            <p className="text-xs text-muted-foreground">Selected</p>
            <div className="space-y-3">
              {draft.featuredArtIds.map((id, i) => {
                const art = artsMap[id];
                if (!art) return null;
                return (
                  <div key={id} className="flex items-center gap-3">
                    <div className="size-9 rounded bg-muted overflow-hidden">
                      {art.imageUrl ? (
                        <img
                          src={art.imageUrl}
                          className="size-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{art.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        by {art.artistName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setDraft((d) => ({
                            ...d,
                            featuredArtIds: move(d.featuredArtIds, id, -1),
                          }))
                        }
                        disabled={i === 0}
                      >
                        Up
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setDraft((d) => ({
                            ...d,
                            featuredArtIds: move(d.featuredArtIds, id, 1),
                          }))
                        }
                        disabled={i === draft.featuredArtIds.length - 1}
                      >
                        Down
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          setDraft((d) => ({
                            ...d,
                            featuredArtIds: remove(d.featuredArtIds, id),
                          }))
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
              {draft.featuredArtIds.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No arts selected.
                </p>
              )}
            </div>

            <Separator className="my-3" />
            <p className="text-xs text-muted-foreground">Available</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {arts.map((art) => (
                <div
                  key={art.id}
                  className="flex items-center gap-3 rounded-md border p-2"
                >
                  <div className="size-8 rounded bg-muted overflow-hidden">
                    {art.imageUrl ? (
                      <img
                        src={art.imageUrl}
                        className="size-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{art.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      by {art.artistName}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    disabled={draft.featuredArtIds.length >= MAX.arts}
                    onClick={() =>
                      setDraft((d) => ({
                        ...d,
                        featuredArtIds: add(d.featuredArtIds, art.id, MAX.arts),
                      }))
                    }
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Blogs Tab */}
        <TabsContent value="blogs">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Featured Blogs</h3>
              <Badge variant="secondary">
                {draft.featuredBlogIds.length}/{MAX.blogs}
              </Badge>
            </div>
            <Separator className="my-3" />

            <p className="text-xs text-muted-foreground">Selected</p>
            <div className="space-y-3">
              {draft.featuredBlogIds.map((id, i) => {
                const b = blogsMap[id];
                if (!b) return null;
                return (
                  <div key={id} className="flex items-center gap-3">
                    <div className="size-9 rounded bg-muted overflow-hidden">
                      {b.coverUrl ? (
                        <img
                          src={b.coverUrl}
                          className="size-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{b.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {b.author}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setDraft((d) => ({
                            ...d,
                            featuredBlogIds: move(d.featuredBlogIds, id, -1),
                          }))
                        }
                        disabled={i === 0}
                      >
                        Up
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setDraft((d) => ({
                            ...d,
                            featuredBlogIds: move(d.featuredBlogIds, id, 1),
                          }))
                        }
                        disabled={i === draft.featuredBlogIds.length - 1}
                      >
                        Down
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          setDraft((d) => ({
                            ...d,
                            featuredBlogIds: remove(d.featuredBlogIds, id),
                          }))
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
              {draft.featuredBlogIds.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No blogs selected.
                </p>
              )}
            </div>

            <Separator className="my-3" />
            <p className="text-xs text-muted-foreground">Available</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center gap-3 rounded-md border p-2"
                >
                  <div className="size-8 rounded bg-muted overflow-hidden">
                    {b.coverUrl ? (
                      <img
                        src={b.coverUrl}
                        className="size-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{b.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {b.author}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    disabled={draft.featuredBlogIds.length >= MAX.blogs}
                    onClick={() =>
                      setDraft((d) => ({
                        ...d,
                        featuredBlogIds: add(
                          d.featuredBlogIds,
                          b.id,
                          MAX.blogs
                        ),
                      }))
                    }
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={resetDraft}
          disabled={loading || !saved}
        >
          Clear Changes
        </Button>
        <Button onClick={onSave} disabled={loading}>
          Save Homepage
        </Button>
      </div>
    </div>
  );
};

export default HomepageConfig;
