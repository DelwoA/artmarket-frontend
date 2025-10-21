import { Button } from "@/components/ui/button";
import { Heart, Eye, MapPin } from "lucide-react";
import { Link } from "react-router";

export type Artist = {
  id: number;
  name: string;
  location: string;
  bio: string;
  likes: string;
  views: string;
  avatarUrl: string;
  profileUrl?: string;
};

type Props = {
  artist: Artist;
};

const FeaturedArtistCard = ({ artist }: Props) => {
  return (
    <article className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-start gap-4">
        <img
          src={artist.avatarUrl}
          alt={`${artist.name} avatar`}
          className="h-12 w-12 rounded-full object-cover ring-1 ring-black/10"
        />
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight">
            {artist.name}
          </h3>
          <div className="mt-1 flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1.5 h-4 w-4" /> {artist.location}
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm md:text-base text-muted-foreground">
        {artist.bio}
      </p>

      <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Heart className="h-4 w-4" /> {artist.likes}
        </div>
        <div className="flex items-center gap-1.5">
          <Eye className="h-4 w-4" /> {artist.views}
        </div>
      </div>

      <Button
        asChild
        className="mt-6 w-full bg-white text-foreground hover:bg-slate-100"
      >
        <Link to={"#"}>View Profile</Link>
      </Button>
    </article>
  );
};

export default FeaturedArtistCard;
