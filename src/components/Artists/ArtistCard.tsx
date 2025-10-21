import { Button } from "@/components/ui/button";
import { Heart, Eye, MapPin } from "lucide-react";
import { Link } from "react-router";

export type ArtistListItem = {
  id: number;
  name: string;
  location: string;
  likes: number;
  views: number;
  avatarUrl: string;
  profileUrl: string;
  artworksUrl: string;
};

type Props = {
  artist: ArtistListItem;
};

const ArtistCard = ({ artist }: Props) => {
  return (
    <article className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <img
          src={artist.avatarUrl}
          alt={artist.name}
          className="h-28 w-28 rounded-full object-cover ring-1 ring-black/10"
        />
        <h3 className="mt-4 text-base font-semibold">{artist.name}</h3>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-4 w-4" /> {artist.location}
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Heart className="h-4 w-4" /> {artist.likes}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="h-4 w-4" /> {artist.views}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 w-full">
          <Button asChild variant="outline" size="sm">
            <Link to={artist.profileUrl}>View Profile</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to={artist.artworksUrl}>View Artwork</Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ArtistCard;
