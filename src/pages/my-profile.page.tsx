import { useMemo, useState } from "react";
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

  const isArtist = role === "artist";
  const isAdmin = role === "admin";
  const isVisitor = role === "user";

  const artistIncomplete =
    isArtist &&
    (!form.about || !form.country || !form.city || !form.displayName);

  const save = () => {
    // minimal validation
    if (!form.displayName) {
      toast.error("Display name is required");
      return;
    }
    if (isArtist && (!form.about || !form.country || !form.city)) {
      toast.error("Please complete required artist fields");
      return;
    }
    toast.success("Profile saved");
  };

  const reset = () => setForm(initial);

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

  const isProfileComplete = () => {
    const fields = [
      form.displayName,
      form.email,
      form.bio,
      form.country,
      form.city,
      form.website,
      form.instagram,
      form.facebook,
    ];
    return fields.every((v) => typeof v === "string" && v.trim().length > 0);
  };

  const submitApplication = async () => {
    try {
      const token = await getToken();
      if (!token) throw new Error("No auth token");
      // Map UI form to backend expected fields
      const ensureProtocol = (url: string) => {
        const trimmed = (url || "").trim();
        if (!trimmed) return trimmed;
        if (/^https?:\/\//i.test(trimmed)) return trimmed;
        return `https://${trimmed}`;
      };
      const countryMatch = COUNTRIES.find(
        (c) =>
          c.slug === String(form.country).toLowerCase() ||
          c.name === form.country
      );
      const normalizedCountry = countryMatch ? countryMatch.name : form.country;
      const payload = {
        name: form.displayName,
        bio: form.bio,
        country: normalizedCountry,
        city: form.city,
        website: ensureProtocol(form.website),
        instagram: ensureProtocol(form.instagram),
        facebook: ensureProtocol(form.facebook),
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
                      if (isProfileComplete()) {
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
              <Button variant="outline" onClick={reset}>
                Cancel
              </Button>
              <Button onClick={save}>Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyProfilePage;
