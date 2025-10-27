import { useMemo, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BasicInfo from "@/components/Profile/BasicInfo";
import SocialLinks from "@/components/Profile/SocialLinks";
import CompletionBanner from "@/components/Profile/CompletionBanner";
import { useUser, useAuth } from "@clerk/clerk-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import { applyToBecomeArtist } from "@/lib/artists";
import { getMyProfile, updateMyProfile } from "@/lib/users";
import COUNTRIES from "@/lib/data/countries";
// country select moved into BasicInfo

type Role = "user" | "artist" | "admin";

const MyProfilePage = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  // Role mapping from Clerk public metadata; default visitor
  const [role] = useState<Role>((user?.publicMetadata?.role as Role) || "user");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openIncomplete, setOpenIncomplete] = useState(false);

  const initial = useMemo(() => {
    if (role === "artist") {
      return {
        email: user?.primaryEmailAddress?.emailAddress || "artist@example.com",
        displayName: user?.fullName || user?.username || "Artist",
        bio: "Abstract painter exploring color.",
        avatarUrl: user?.imageUrl,
        country: "Spain",
        city: "Madrid",
        about:
          "Contemporary abstract painter focused on emotion through color. Exhibited across EU.",
        website: "https://elenarodriguez.art",
        instagram: "https://instagram.com/elena.paint",
        facebook: "",
      };
    }
    if (role === "admin") {
      return {
        email: user?.primaryEmailAddress?.emailAddress || "admin@artmarket.io",
        displayName: user?.fullName || "Platform Admin",
        bio: "Curating quality across the platform.",
        avatarUrl: user?.imageUrl,
      } as any;
    }
    return {
      email: user?.primaryEmailAddress?.emailAddress || "visitor@example.com",
      displayName: user?.fullName || user?.username || "Visitor",
      bio: "Art enthusiast",
      avatarUrl: user?.imageUrl,
      country: "Canada",
      city: "Vancouver",
      website: "",
      instagram: "",
      facebook: "",
      about: "",
    } as any;
  }, [role, user]);

  const [form, setForm] = useState<any>(initial);
  const [saved, setSaved] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const isArtist = role === "artist";
  const isAdmin = role === "admin";
  const isVisitor = role === "user";

  const artistIncomplete =
    isArtist && (!form.country || !form.city || !form.displayName);

  const countryNameToSlug = useCallback((name?: string) => {
    if (!name) return "";
    const match = COUNTRIES.find((c) => c.name === name);
    return match ? match.slug : String(name).toLowerCase();
  }, []);

  const countrySlugToName = useCallback((slugOrName?: string) => {
    if (!slugOrName) return "";
    const match = COUNTRIES.find(
      (c) =>
        c.slug === String(slugOrName).toLowerCase() || c.name === slugOrName
    );
    return match ? match.name : slugOrName;
  }, []);

  const ensureProtocol = useCallback((url?: string) => {
    const trimmed = String(url || "").trim();
    if (!trimmed) return trimmed;
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  }, []);

  // Load saved profile and hydrate form
  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const token = await getToken();
        if (!token) return;
        const profile = await getMyProfile(token);
        if (!active) return;
        const canonical = {
          displayName:
            (profile as any)?.displayName ||
            user.fullName ||
            user.username ||
            "",
          bio: (profile as any)?.bio || "",
          country: (profile as any)?.country || "",
          city: (profile as any)?.city || "",
          website: (profile as any)?.website || "",
          instagram: (profile as any)?.instagram || "",
          facebook: (profile as any)?.facebook || "",
          avatarUrl: (profile as any)?.avatarUrl || user.imageUrl,
          email: user.primaryEmailAddress?.emailAddress || "",
        };
        setSaved(canonical);
        setForm({
          ...canonical,
          // UI stores slug; backend stores country name
          country: countryNameToSlug(canonical.country),
        });
      } catch {
        // fall back to initial values if load fails
        setSaved(null);
        setForm(initial);
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, getToken]);

  const save = async () => {
    try {
      if (!form.displayName) {
        toast.error("Display name is required");
        return;
      }
      const token = await getToken();
      if (!token) throw new Error("No auth token");
      setSaving(true);
      const payload = {
        displayName: String(form.displayName || "").trim(),
        bio: String(form.bio || "").trim(),
        country: countrySlugToName(form.country),
        city: String(form.city || "").trim(),
        website: ensureProtocol(form.website),
        instagram: ensureProtocol(form.instagram),
        facebook: ensureProtocol(form.facebook),
        avatarUrl: ensureProtocol(form.avatarUrl),
      } as any;
      const updated = await updateMyProfile(payload, token);
      const canonical = {
        ...updated,
        email: user?.primaryEmailAddress?.emailAddress || "",
        avatarUrl: updated?.avatarUrl || form.avatarUrl,
      } as any;
      setSaved(canonical);
      setForm({
        ...canonical,
        country: countryNameToSlug(canonical.country),
      });
      toast.success("Profile saved");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to save profile";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    if (saved) {
      setForm({
        ...saved,
        country: countryNameToSlug(saved.country),
      });
    } else {
      setForm(initial);
    }
  };

  const onAvatarFileSelected = async (file: File) => {
    try {
      if (!user) return;
      // Clerk image update: convert to blob and call setProfileImage
      await user.setProfileImage({ file });
      // reflect new url locally
      setForm((prev: any) => ({
        ...prev,
        avatarUrl: user.imageUrl || prev.avatarUrl,
      }));
    } catch (e) {
      toast.error("Failed to update avatar in Clerk");
    }
  };

  const isSavedProfileComplete = () => {
    const src = saved || {};
    const fields = [
      (src as any).displayName,
      user?.primaryEmailAddress?.emailAddress || "",
      (src as any).bio,
      (src as any).country,
      (src as any).city,
      (src as any).website,
      (src as any).instagram,
      (src as any).facebook,
    ];
    return fields.every((v) => typeof v === "string" && v.trim().length > 0);
  };

  const submitApplication = async () => {
    try {
      const token = await getToken();
      if (!token) throw new Error("No auth token");
      const canonical = saved || {};
      const payload = {
        name: (canonical as any).displayName,
        bio: (canonical as any).bio,
        country: (canonical as any).country,
        city: (canonical as any).city,
        website: ensureProtocol((canonical as any).website),
        instagram: ensureProtocol((canonical as any).instagram),
        facebook: ensureProtocol((canonical as any).facebook),
        totalLikes: 0,
        totalViews: 0,
      };
      await applyToBecomeArtist(payload, token);
      toast.success("Application submitted. Awaiting admin approval.");
      setOpenConfirm(false);
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Failed to submit application";
      toast.error(msg);
    }
  };

  return (
    <main className="w-full bg-background min-h-[92.5vh]">
      <div className="container mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold mb-3 mt-2">
            My Profile
          </h1>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">
            Role: {isAdmin ? "ADMIN" : isArtist ? "ARTIST" : "VISITOR"}
          </div>
        </div>

        <div className="space-y-8">
          {isArtist && <CompletionBanner show={artistIncomplete} />}

          <BasicInfo
            email={form.email}
            displayName={form.displayName}
            bio={form.bio}
            avatarUrl={form.avatarUrl}
            displayNameRequired
            bioRequired={isArtist}
            onChange={(next) => setForm({ ...form, ...next })}
            onAvatarFileSelected={onAvatarFileSelected}
            country={form.country}
            city={form.city}
          />

          {/* Typical User extra (optional location) and Artist location are handled below */}
          {/* Location moved into BasicInfo */}

          {/* Social links available for visitor and artist */}
          {(isVisitor || isArtist) && (
            <SocialLinks
              website={form.website}
              instagram={form.instagram}
              facebook={form.facebook}
              onChange={(next) => setForm({ ...form, ...next })}
            />
          )}

          <div className="flex items-center justify-between gap-2 mb-13">
            <div>
              {isVisitor && (
                <>
                  {/* Incomplete details dialog */}
                  <Dialog
                    open={openIncomplete}
                    onOpenChange={setOpenIncomplete}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Complete your profile</DialogTitle>
                        <DialogDescription className="mt-2 mb-3">
                          To apply as an artist, please complete all fields in
                          the Basic Info and Social Links sections. These fields
                          are mandatory.
                        </DialogDescription>
                      </DialogHeader>
                      <Button
                        className="w-full"
                        onClick={() => setOpenIncomplete(false)}
                      >
                        OK
                      </Button>
                    </DialogContent>
                  </Dialog>

                  {/* Confirm dialog */}
                  <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <UserPlus className="size-4" /> Confirm application
                        </DialogTitle>
                        <DialogDescription>
                          Are you sure you want to apply for becoming an artist
                          in ArtMarket? After applying, you must wait until an
                          admin approves your account. You may continue using
                          your profile meanwhile. Once approved, your ROLE will
                          be updated to ARTIST.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={submitApplication}>Submit</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Trigger */}
                  <Button
                    variant="default"
                    onClick={() => {
                      if (isSavedProfileComplete()) {
                        setOpenConfirm(true);
                      } else {
                        setOpenIncomplete(true);
                      }
                    }}
                  >
                    Apply to become an Artist
                  </Button>
                </>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={reset}
                disabled={loading || saving}
              >
                Cancel
              </Button>
              <Button onClick={save} disabled={loading || saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyProfilePage;
