import { useMemo, useState } from "react";
import { BLOGS, type BlogPost } from "@/lib/data/blogs";
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

type PendingBlog = BlogPost & {
  authorEmail?: string;
  contentPreview: string;
};

const seedPending: PendingBlog[] = BLOGS.slice(0, 10).map((b, i) => ({
  ...b,
  authorEmail: `${b.author.toLowerCase().replace(/[^a-z]+/g, ".")}@example.com`,
  contentPreview: b.excerpt,
  views: b.views + i * 13,
}));

type Props = {
  onApproved?: (count: number) => void;
  onRejected?: (count: number, reason?: string) => void;
};

const BlogsApproval = ({ onApproved, onRejected }: Props) => {
  const [query, setQuery] = useState("");
  const [pending, setPending] = useState<PendingBlog[]>(seedPending);
  const [selected, setSelected] = useState<Record<number, boolean>>({});
  const [rejecting, setRejecting] = useState<PendingBlog | null>(null);
  const [reason, setReason] = useState("");
  const [bulkRejectOpen, setBulkRejectOpen] = useState(false);
  const [preview, setPreview] = useState<PendingBlog | null>(null);

  const selectedIds = useMemo(
    () =>
      Object.entries(selected)
        .filter(([, v]) => v)
        .map(([k]) => Number(k)),
    [selected]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pending;
    return pending.filter((b) =>
      [b.title, b.author, b.authorEmail ?? ""].some((f) =>
        f.toLowerCase().includes(q)
      )
    );
  }, [pending, query]);

  const toggleAll = (checked: boolean) => {
    const next: Record<number, boolean> = {};
    if (checked) filtered.forEach((b) => (next[b.id] = true));
    setSelected(next);
  };

  const approve = (ids: number[]) => {
    if (!ids.length) return;
    setPending((cur) => cur.filter((b) => !ids.includes(b.id)));
    setSelected({});
    toast.success(`${ids.length} blog${ids.length > 1 ? "s" : ""} approved`);
    onApproved?.(ids.length);
  };
  const reject = (ids: number[], r?: string) => {
    if (!ids.length) return;
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
                    No pending blogs{query ? " for this search" : ""}.
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
                          {b.contentPreview}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{b.author}</span>
                      <span className="text-xs text-muted-foreground">
                        {b.authorEmail}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {new Date(b.publishedAt).toLocaleDateString()}
                    </Badge>
                  </TableCell>
                  <TableCell>{b.views.toLocaleString()}</TableCell>
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
              {preview && new Date(preview.publishedAt).toLocaleDateString()}
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
            <p className="text-muted-foreground">{preview?.contentPreview}</p>
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
