import { Button } from "@/components/ui/button";
import { Heart, Eye } from "lucide-react";
import { Link } from "react-router";
import { slugify } from "@/lib/utils";

type Props = {
  item: {
    title: string;
    artistName: string;
    price: number;
    likes: number;
    views: number;
    imageUrl?: string;
    availability: "For Sale" | "Not for Sale" | "Sold";
  };
};

const ArtworkCard = ({ item }: Props) => {
  const priceLabel = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(item.price);
  const slug = slugify(item.title);
  return (
    <article className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
      <Link to={`/arts/${slug}`} className="block">
        <div className="aspect-[4/3] w-full bg-muted/20">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-sm font-semibold leading-tight">{item.title}</h3>
        <p className="text-xs text-muted-foreground">by {item.artistName}</p>
        <div className="mt-1 text-xs text-muted-foreground flex items-center gap-3">
          {item.availability === "For Sale" ? (
            <span className="font-medium text-foreground">{priceLabel}</span>
          ) : (
            <span>{item.availability}</span>
          )}
          <span className="flex items-center gap-1.5">
            <Heart className="h-4 w-4" /> {item.likes}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="h-4 w-4" /> {item.views}
          </span>
        </div>
        <Button asChild variant="outline" className="mt-3 w-full">
          <Link to={`/arts/${slug}`}>View</Link>
        </Button>
      </div>
    </article>
  );
};

export default ArtworkCard;
