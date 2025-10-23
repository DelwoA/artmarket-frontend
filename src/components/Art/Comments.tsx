import { useEffect, useMemo, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import {
  createComment,
  deleteComment,
  getCommentsByArtId,
  type CreateCommentPayload,
} from "@/lib/comments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type CommentItem = {
  _id: string;
  artId: string;
  comment: string;
  authorId: string;
  authorUsername: string;
  authorDisplayName: string;
  authorImage: string;
  authorRole: "User" | "Admin";
  createdAt: string;
};

type Props = {
  artId: string;
};

const Comments = ({ artId }: Props) => {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();

  const [items, setItems] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [showGuestDialog, setShowGuestDialog] = useState(false);
  const [guestName, setGuestName] = useState("");

  const isAdmin = useMemo(() => {
    const role = (user?.publicMetadata as any)?.role as string | undefined;
    return role === "admin" || role === "Admin";
  }, [user?.publicMetadata]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getCommentsByArtId(artId);
        if (!isMounted) return;
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        toast.error("Failed to load comments");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [artId]);

  const resetComposer = () => {
    setText("");
    setGuestName("");
    setShowGuestDialog(false);
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    if (!isSignedIn) {
      setShowGuestDialog(true);
      return;
    }

    const payload: CreateCommentPayload = {
      comment: text.trim(),
      authorId: user!.id,
      authorUsername:
        user!.username ||
        user!.primaryEmailAddress?.emailAddress?.split("@")[0] ||
        "user",
      authorDisplayName: user!.fullName || user!.username || "User",
      authorImage: user!.imageUrl || "",
      authorRole: isAdmin ? "Admin" : "User",
    };

    const optimistic: CommentItem = {
      _id: `tmp-${Date.now()}`,
      artId,
      comment: payload.comment,
      authorId: payload.authorId,
      authorUsername: payload.authorUsername,
      authorDisplayName: payload.authorDisplayName,
      authorImage: payload.authorImage,
      authorRole: payload.authorRole,
      createdAt: new Date().toISOString(),
    };
    setItems((cur) => [optimistic, ...cur]);
    resetComposer();

    try {
      const token = await getToken();
      const saved = await createComment(artId, payload, token || undefined);
      setItems((cur) => cur.map((c) => (c._id === optimistic._id ? saved : c)));
    } catch (e) {
      setItems((cur) => cur.filter((c) => c._id !== optimistic._id));
      toast.error("Failed to post comment");
    }
  };

  const handleGuestConfirm = async () => {
    if (!text.trim() || !guestName.trim()) return;
    const payload: CreateCommentPayload = {
      comment: text.trim(),
      authorId: "guest",
      authorUsername: guestName.trim(),
      authorDisplayName: guestName.trim(),
      authorImage: "/placeholder-user.png",
      authorRole: "User",
    };

    const optimistic: CommentItem = {
      _id: `tmp-${Date.now()}`,
      artId,
      comment: payload.comment,
      authorId: payload.authorId,
      authorUsername: payload.authorUsername,
      authorDisplayName: payload.authorDisplayName,
      authorImage: payload.authorImage,
      authorRole: payload.authorRole,
      createdAt: new Date().toISOString(),
    };
    setItems((cur) => [optimistic, ...cur]);
    resetComposer();

    try {
      const saved = await createComment(artId, payload);
      setItems((cur) => cur.map((c) => (c._id === optimistic._id ? saved : c)));
    } catch (e) {
      setItems((cur) => cur.filter((c) => c._id !== optimistic._id));
      toast.error("Failed to post comment");
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      const token = await getToken();
      if (!token) throw new Error("Not authorized");
      await deleteComment(artId, commentId, token);
      setItems((cur) => cur.filter((c) => c._id !== commentId));
    } catch (e) {
      toast.error("Failed to delete comment");
    }
  };

  const canDelete = (c: CommentItem) => {
    if (isAdmin) return true;
    if (isSignedIn && user?.id === c.authorId) return true;
    return false;
  };

  return (
    <section className="mt-8">
      <h2 className="text-lg md:text-xl font-semibold tracking-tight">
        Comments
      </h2>
      {loading ? (
        <div className="text-sm text-muted-foreground mt-3">
          Loading comments…
        </div>
      ) : items.length === 0 ? (
        <div className="text-sm text-muted-foreground mt-3">
          There are no comments for this art.
        </div>
      ) : (
        <ul className="mt-3 space-y-3">
          {items.map((c) => (
            <li
              key={c._id}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={c.authorImage} alt={c.authorDisplayName} />
                  <AvatarFallback>
                    {c.authorDisplayName?.slice(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                      {c.authorDisplayName}
                      <span className="ml-2 text-xs text-muted-foreground">
                        {new Date(c.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {canDelete(c) ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        onClick={() => handleDelete(c._id)}
                        aria-label="Delete comment"
                        title="Delete comment"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-foreground whitespace-pre-wrap break-words">
                    {c.comment}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6">
        <Textarea
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-2 flex items-center gap-2">
          <Button variant="secondary" onClick={resetComposer}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>

      <Dialog open={showGuestDialog} onOpenChange={setShowGuestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your name to submit</DialogTitle>
            <DialogDescription>
              You are not logged in, please enter your name to post this
              comment. Note: once you comment as a guest, you cannot delete the
              comment. Only logged-in users can delete their own comments.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Input
              placeholder="Your name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={resetComposer}>
              Cancel
            </Button>
            <Button onClick={handleGuestConfirm}>Confirm submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Comments;
