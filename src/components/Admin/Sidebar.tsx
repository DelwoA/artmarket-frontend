import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

type NavKey = "overview" | "artists" | "blogs" | "artworks" | "homepage";

type Props = {
  active: NavKey;
  onNavigate: (key: NavKey) => void;
};

const Sidebar = ({ active, onNavigate }: Props) => {
  return (
    <aside className="w-64 shrink-0 border-r border-border hidden md:block">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Admin
        </h2>
      </div>
      <Separator />
      <nav className="p-2">
        <SidebarItem
          label="Overview"
          active={active === "overview"}
          onClick={() => onNavigate("overview")}
        />
        <SidebarItem
          label="Pending Artists"
          active={active === "artists"}
          onClick={() => onNavigate("artists")}
        />
        <SidebarItem
          label="Pending Blogs"
          active={active === "blogs"}
          onClick={() => onNavigate("blogs")}
        />
        <SidebarItem
          label="Artworks Moderation"
          active={active === "artworks"}
          onClick={() => onNavigate("artworks")}
        />
        <SidebarItem
          label="Homepage"
          active={active === "homepage"}
          onClick={() => onNavigate("homepage")}
        />
      </nav>
    </aside>
  );
};

function SidebarItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={cn(
        "w-full text-left rounded-md px-3 py-2 text-sm transition-colors",
        active ? "bg-accent text-accent-foreground" : "hover:bg-accent"
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export type { NavKey };
export default Sidebar;
