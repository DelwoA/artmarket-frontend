import { useMemo, useState } from "react";
import { ARTISTS, type Artist } from "@/lib/data/artists";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

type PendingArtist = Artist & {
  email: string;
  submittedAt: string;
};

function toEmail(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z]+/g, ".")
    .replace(/\.+/g, ".");
  return `${slug}@example.com`;
}

const seedPending: PendingArtist[] = ARTISTS.slice(0, 8).map((a, i) => ({
  ...a,
  email: toEmail(a.name),
  submittedAt: new Date(Date.now() - (i + 1) * 3600_000).toISOString(),
}));

type Props = {
  onApproved?: (count: number) => void;
  onRejected?: (count: number, reason?: string) => void;
};

const ArtistsApproval = ({ onApproved, onRejected }: Props) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<number, boolean>>({});
  const [pending, setPending] = useState<PendingArtist[]>(seedPending);
  const [rejecting, setRejecting] = useState<PendingArtist | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [bulkRejectOpen, setBulkRejectOpen] = useState(false);

  const allSelectedIds = useMemo(
    () =>
      Object.entries(selected)
        .filter(([, v]) => v)
        .map(([k]) => Number(k)),
    [selected]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pending;
    return pending.filter((p) =>
      [p.name, p.email, p.location, p.bio ?? ""].some((f) =>
        f.toLowerCase().includes(q)
      )
    );
  }, [pending, query]);

  const toggleAll = (checked: boolean) => {
    const next: Record<number, boolean> = {};
    if (checked) filtered.forEach((p) => (next[p.id] = true));
    setSelected(next);
  };

  const approve = (ids: number[]) => {
    if (ids.length === 0) return;
    setPending((cur) => cur.filter((p) => !ids.includes(p.id)));
    setSelected({});
    toast.success(`${ids.length} artist${ids.length > 1 ? "s" : ""} approved`);
    onApproved?.(ids.length);
  };

  const reject = (ids: number[], reason?: string) => {
    if (ids.length === 0) return;
    setPending((cur) => cur.filter((p) => !ids.includes(p.id)));
    setSelected({});
    toast.warning(
      `${ids.length} artist${ids.length > 1 ? "s" : ""} rejected` +
        (reason ? ` · Reason: ${reason}` : "")
    );
    onRejected?.(ids.length, reason);
  };

  const empty = filtered.length === 0;

  return (
    <div className="space-y-4 min-h-[81vh]">
      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <Input
              placeholder="Search by name, email, or location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={allSelectedIds.length === 0}
              onClick={() => approve(allSelectedIds)}
            >
              Approve selected
            </Button>
            <Dialog open={bulkRejectOpen} onOpenChange={setBulkRejectOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  disabled={allSelectedIds.length === 0}
                >
                  Reject selected
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reject selected artists</DialogTitle>
                  <DialogDescription>
                    Optionally include a reason. This action removes them from
                    the pending list.
                  </DialogDescription>
                </DialogHeader>
                <Textarea
                  placeholder="Reason (optional)"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        reject(
                          allSelectedIds,
                          rejectReason.trim() || undefined
                        );
                        setRejectReason("");
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
                    allSelectedIds.length === filtered.length
                  }
                  onCheckedChange={(v) => toggleAll(Boolean(v))}
                />
              </TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Info</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {empty ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="p-10 text-center text-sm text-muted-foreground">
                    No pending artists{query ? " for this search" : ""}.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((p) => (
                <TableRow
                  key={p.id}
                  data-state={selected[p.id] ? "selected" : undefined}
                >
                  <TableCell>
                    <Checkbox
                      checked={!!selected[p.id]}
                      onCheckedChange={(v) =>
                        setSelected((s) => ({ ...s, [p.id]: Boolean(v) }))
                      }
                      aria-label={`Select ${p.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarImage src={p.avatarUrl} alt={p.name} />
                        <AvatarFallback>{p.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <a
                          href={p.profileUrl}
                          className="font-medium hover:underline truncate block"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {p.name}
                        </a>
                        <p className="text-muted-foreground text-xs truncate">
                          {p.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{p.location}</Badge>
                        <a
                          href={p.artworksUrl}
                          className="text-xs text-primary hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          View artworks
                        </a>
                      </div>
                      {p.bio && (
                        <p className="text-xs text-muted-foreground line-clamp-2 max-w-[52ch]">
                          {p.bio}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {new Date(p.submittedAt).toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" onClick={() => approve([p.id])}>
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setRejecting(p)}
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

      <Dialog open={!!rejecting} onOpenChange={(o) => !o && setRejecting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject artist</DialogTitle>
            <DialogDescription>
              Optionally include a reason. This action removes them from the
              pending list.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="text-sm">
              <span className="text-muted-foreground">Artist:</span>{" "}
              <span className="font-medium">{rejecting?.name}</span>
            </div>
            <Textarea
              placeholder="Reason (optional)"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setRejectReason("")}>
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="destructive"
                onClick={() => {
                  if (rejecting)
                    reject([rejecting.id], rejectReason.trim() || undefined);
                  setRejecting(null);
                  setRejectReason("");
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

export default ArtistsApproval;
