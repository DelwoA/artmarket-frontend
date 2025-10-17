import { useMemo, useState } from "react";
import { ARTS, type ArtItem } from "@/lib/data/arts";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type ModeratedArt = ArtItem & {
  status: "For Sale" | "Sold" | "Showcase";
  visibility: "published" | "draft";
  banned: boolean;
};

const seedAll: ModeratedArt[] = ARTS.map((a, i) => ({
  ...a,
  status: (["For Sale", "Sold", "Showcase"] as const)[i % 3],
  visibility: i % 5 === 0 ? "draft" : "published",
  banned: i % 7 === 0,
}));

const PAGE_SIZE = 8;

const ArtworksModeration = () => {
  const [items, setItems] = useState<ModeratedArt[]>(seedAll);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [banFilter, setBanFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [confirming, setConfirming] = useState<ModeratedArt | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      const matchesQ =
        !q ||
        [it.title, it.artistName].some((f) => f.toLowerCase().includes(q));
      const matchesStatus = status === "all" || it.status === status;
      const matchesBan =
        banFilter === "all" ||
        (banFilter === "banned" ? it.banned : !it.banned);
      return matchesQ && matchesStatus && matchesBan;
    });
  }, [items, query, status, banFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleBan = (id: number, ban: boolean) => {
    setItems((cur) =>
      cur.map((it) => (it.id === id ? { ...it, banned: ban } : it))
    );
    toast[ban ? "warning" : "success"](
      ban ? "Artwork banned" : "Artwork unbanned"
    );
  };

  return (
    <div className="space-y-4 min-h-[81vh]">
      <Card className="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <Input
              placeholder="Search by title or artist..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={status}
              onValueChange={(v) => {
                setStatus(v);
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="For Sale">For Sale</SelectItem>
                <SelectItem value="Sold">Sold</SelectItem>
                <SelectItem value="Showcase">Showcase</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={banFilter}
              onValueChange={(v) => {
                setBanFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All (banned + not)</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
                <SelectItem value="not">Not banned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Artwork</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {current.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="p-10 text-center text-sm text-muted-foreground">
                    No artworks match your filters.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              current.map((it) => (
                <TableRow key={it.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={it.imageUrl}
                        alt="thumb"
                        className="size-12 rounded object-cover"
                      />
                      <div className="min-w-0">
                        <a
                          href={it.artworkUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium hover:underline truncate block max-w-[40ch]"
                        >
                          {it.title}
                        </a>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <a
                      href={it.artistUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      {it.artistName}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{it.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        it.visibility === "published" ? "secondary" : "outline"
                      }
                    >
                      {it.visibility}
                    </Badge>
                  </TableCell>
                  <TableCell>{it.likes.toLocaleString()}</TableCell>
                  <TableCell>{it.views.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {it.banned ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleBan(it.id, false)}
                        >
                          Unban
                        </Button>
                      ) : (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => setConfirming(it)}
                            >
                              Ban
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Ban artwork</DialogTitle>
                              <DialogDescription>
                                This hides the artwork from the public site. You
                                can unban later.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="text-sm">
                              <span className="text-muted-foreground">
                                Artwork:
                              </span>{" "}
                              <span className="font-medium">
                                {confirming?.title}
                              </span>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button
                                  variant="destructive"
                                  onClick={() =>
                                    confirming && toggleBan(confirming.id, true)
                                  }
                                >
                                  Confirm ban
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <Pagination className="pt-2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.max(1, p - 1));
              }}
            />
          </PaginationItem>
          {Array.from({ length: pageCount }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={page === i + 1}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(i + 1);
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.min(pageCount, p + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ArtworksModeration;
