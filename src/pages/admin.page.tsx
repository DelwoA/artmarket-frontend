import { useEffect, useMemo, useState } from "react";
import Sidebar, { type NavKey } from "@/components/Admin/Sidebar";
import Overview from "@/components/Admin/Overview";
import ArtistsApproval from "@/components/Admin/ArtistsApproval";
import BlogsApproval from "@/components/Admin/BlogsApproval";
import ArtworksModeration from "@/components/Admin/ArtworksModeration";
import HomepageConfig from "@/components/Admin/HomepageConfig";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";

const AdminPage = () => {
  const [active, setActive] = useState<NavKey>("overview");
  const { user, isLoaded } = useUser();
  const isAdmin = Boolean(
    user?.publicMetadata && (user.publicMetadata as any).role === "admin"
  );
  const [counts, setCounts] = useState({
    pendingArtists: 0,
    pendingBlogs: 0,
    bannedArtworks: 0,
    totalArtists: 0,
    totalArtworks: 0,
  });

  useEffect(() => {}, []);

  const recent = useMemo(
    () => [{ id: 1, type: "artist" as const, title: "Activity", at: "" }],
    []
  );

  if (!isLoaded) return null;

  if (!isAdmin) {
    return (
      <main className="w-full bg-background">
        <div className="container mx-auto px-4 md:px-8 py-10">
          <Card className="p-6">
            <h1 className="text-xl font-semibold">No access</h1>
            <p className="text-sm text-muted-foreground mt-1">
              You don't have permission to view the admin dashboard.
            </p>
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => toast.info("This area requires admin role")}
              >
                Go back
              </Button>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-background">
      <Toaster position="top-right" richColors />
      <div className="container mx-auto px-4 md:px-8 py-6">
        <div className="flex gap-6">
          <Sidebar active={active} onNavigate={setActive} />

          <section className="flex-1 min-w-0">
            <header className="mb-4 flex items-center justify-between">
              <h1 className="text-xl md:text-2xl font-semibold">
                {active === "overview" && "Overview"}
                {active === "artists" && "Pending Artists"}
                {active === "blogs" && "Pending Blogs"}
                {active === "artworks" && "Artworks Moderation"}
                {active === "homepage" && "Homepage"}
              </h1>
              <div className="flex items-center gap-2">
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="ghost" className="md:hidden">
                      <MenuIcon className="size-4" />
                      <span className="sr-only">Open navigation</span>
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Admin</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-2">
                      <Sidebar
                        active={active}
                        onNavigate={(k) => {
                          setActive(k);
                        }}
                      />
                    </div>
                  </DrawerContent>
                </Drawer>
                {null}
              </div>
            </header>

            {active === "overview" && (
              <Overview
                counts={counts}
                recent={recent}
                onQuickNav={setActive}
              />
            )}

            {active === "artists" && (
              <ArtistsApproval
                onApproved={(n) =>
                  setCounts((c) => ({
                    ...c,
                    pendingArtists: Math.max(0, c.pendingArtists - n),
                  }))
                }
                onRejected={(n) =>
                  setCounts((c) => ({
                    ...c,
                    pendingArtists: Math.max(0, c.pendingArtists - n),
                  }))
                }
              />
            )}
            {active === "blogs" && (
              <BlogsApproval
                onApproved={(n) =>
                  setCounts((c) => ({
                    ...c,
                    pendingBlogs: Math.max(0, c.pendingBlogs - n),
                  }))
                }
                onRejected={(n) =>
                  setCounts((c) => ({
                    ...c,
                    pendingBlogs: Math.max(0, c.pendingBlogs - n),
                  }))
                }
              />
            )}
            {active === "artworks" && <ArtworksModeration />}
            {active === "homepage" && <HomepageConfig />}
          </section>
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
