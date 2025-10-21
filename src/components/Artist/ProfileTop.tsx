import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

type Props = {
  name: string;
  city: string;
  country: string;
};

function ProfileTop({ name, city, country }: Props) {
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=E5E7EB&color=111827&size=128`;
  return (
    <div className="flex items-start gap-4">
      <img
        src={avatar}
        alt={name}
        className="h-20 w-20 rounded-full object-cover ring-1 ring-black/10"
      />
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {name}
        </h1>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" /> {city}, {country}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Button size="sm" variant="default">
            Follow
          </Button>
          <Button size="sm" variant="outline">
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileTop;
