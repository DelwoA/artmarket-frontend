import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";
import { getAdminBlogs, approveBlogAdmin, rejectBlogAdmin } from "@/lib/blogs";

type PendingBlog = {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  publishedAt?: string;
  excerpt?: string;
  views?: number;
  clerkUserId?: string;
};

type Props = {
  onApproved?: (count: number) => void;
  onRejected?: (count: number, reason?: string) => void;
};

const BlogsApproval = ({ onApproved, onRejected }: Props) => {
  const { getToken } = useAuth();
  const [query, setQuery] = useState("");
  const [pending, setPending] = useState<PendingBlog[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [rejecting, setRejecting] = useState<PendingBlog | null>(null);
  const [reason, setReason] = useState("");
  const [bulkRejectOpen, setBulkRejectOpen] = useState(false);
  const [preview, setPreview] = useState<PendingBlog | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const token = await getToken();
        const list = await getAdminBlogs("pending", token || undefined);
        const items: PendingBlog[] = (Array.isArray(list) ? list : []).map(
          (b: any) => ({
            id: String(b._id),
            title: b.title,
            author: b.artistName,
            coverUrl: b.image,
            excerpt: b.subtitle,
            publishedAt: b.createdAt,
            views: b.views,
          })
        );
        if (mounted) setPending(items);
      } catch {
        toast.error("Failed to load pending blogs");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [getToken]);

  const selectedIds = useMemo(
    () => Object.keys(selected).filter((k) => selected[k]),
    [selected]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pending;
    return pending.filter((b) =>
      [b.title, b.author, b.excerpt ?? ""].some((f) =>
        f.toLowerCase().includes(q)
      )
    );
  }, [pending, query]);

  const toggleAll = (checked: boolean) => {
    const next: Record<string, boolean> = {};
    if (checked) filtered.forEach((b) => (next[b.id] = true));
    setSelected(next);
  };

  const approve = async (ids: string[]) => {
    if (!ids.length) return;
    const token = await getToken();
    await Promise.all(ids.map((id) => approveBlogAdmin(id, token || "")));
    setPending((cur) => cur.filter((b) => !ids.includes(b.id)));
    setSelected({});
    toast.success(`${ids.length} blog${ids.length > 1 ? "s" : ""} approved`);
    onApproved?.(ids.length);
  };
  const reject = async (ids: string[], r?: string) => {
    if (!ids.length) return;
    const token = await getToken();
    await Promise.all(ids.map((id) => rejectBlogAdmin(id, r, token || "")));
    setPending((cur) => cur.filter((b) => !ids.includes(b.id)));
    setSelected({});
    toast.warning(
      `${ids.length} blog${ids.length > 1 ? "s" : ""} rejected` +
        (r ? ` · Reason: ${r}` : "")
    );
    onRejected?.(ids.length, r);
  };

  const empty = filtered.length === 0;

  return (
    <div className="space-y-4 min-h-[81vh]">
      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <Input
              placeholder="Search by title or author..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={!selectedIds.length}
              onClick={() => approve(selectedIds)}
            >
              Approve selected
            </Button>
            <Dialog open={bulkRejectOpen} onOpenChange={setBulkRejectOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" disabled={!selectedIds.length}>
                  Reject selected
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reject selected blogs</DialogTitle>
                  <DialogDescription>
                    Optionally include a reason. This removes them from the
                    pending list.
                  </DialogDescription>
                </DialogHeader>
                <Textarea
                  placeholder="Reason (optional)"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        reject(selectedIds, reason.trim() || undefined);
                        setReason("");
                      }}
                    >
                      Reject
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  aria-label="Select all"
                  checked={
                    filtered.length > 0 &&
                    selectedIds.length === filtered.length
                  }
                  onCheckedChange={(v) => toggleAll(Boolean(v))}
                />
              </TableHead>
              <TableHead>Blog</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {empty ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="p-10 text-center text-sm text-muted-foreground">
                    {loading
                      ? "Loading..."
                      : `No pending blogs${query ? " for this search" : ""}.`}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((b) => (
                <TableRow
                  key={b.id}
                  data-state={selected[b.id] ? "selected" : undefined}
                >
                  <TableCell>
                    <Checkbox
                      checked={!!selected[b.id]}
                      onCheckedChange={(v) =>
                        setSelected((s) => ({ ...s, [b.id]: Boolean(v) }))
                      }
                      aria-label={`Select ${b.title}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {b.coverUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={b.coverUrl}
                          alt="cover"
                          className="size-10 rounded object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="size-10 rounded bg-muted" />
                      )}
                      <div className="min-w-0">
                        <p className="font-medium truncate max-w-[40ch]">
                          {b.title}
                        </p>
                        <p className="text-muted-foreground text-xs line-clamp-1 max-w-[60ch]">
                          {b.excerpt}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{b.author}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {b.publishedAt
                        ? new Date(b.publishedAt).toLocaleDateString()
                        : "-"}
                    </Badge>
                  </TableCell>
                  <TableCell>{(b.views ?? 0).toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setPreview(b)}
                      >
                        Preview
                      </Button>
                      <Button size="sm" onClick={() => approve([b.id])}>
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setRejecting(b)}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{preview?.title}</DialogTitle>
            <DialogDescription>
              by {preview?.author} ·{" "}
              {preview?.publishedAt
                ? new Date(preview.publishedAt).toLocaleDateString()
                : "-"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            {preview?.coverUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview.coverUrl}
                alt="cover"
                className="w-full rounded object-cover"
              />
            )}
            <p className="text-muted-foreground">{preview?.excerpt}</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={() => approve(preview ? [preview.id] : [])}>
                Approve
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!rejecting} onOpenChange={(o) => !o && setRejecting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject blog</DialogTitle>
            <DialogDescription>Optionally include a reason.</DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Reason (optional)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setReason("")}>
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="destructive"
                onClick={() => {
                  if (rejecting)
                    reject([rejecting.id], reason.trim() || undefined);
                  setRejecting(null);
                  setReason("");
                }}
              >
                Reject
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogsApproval;
