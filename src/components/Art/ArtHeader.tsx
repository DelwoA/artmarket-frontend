import { Heart, Eye } from "lucide-react";

type Props = {
  title: string;
  artistName: string;
  price: number;
  likes: number;
  views: number;
  availability: "For Sale" | "Not for Sale" | "Sold";
};

const ArtHeader = ({
  title,
  artistName,
  price,
  likes,
  views,
  availability,
}: Props) => {
  const priceLabel = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <header className="mb-4 md:mb-6">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="mt-1 text-sm md:text-base text-muted-foreground">
        by {artistName}
      </p>

      <div className="mt-3 flex items-center gap-4 text-xs md:text-sm text-muted-foreground">
        {availability === "For Sale" ? (
          <div className="font-medium text-foreground">{priceLabel}</div>
        ) : null}
        <span className="flex items-center gap-1.5">
          <Heart className="h-4 w-4" /> {likes}
        </span>
        <span className="flex items-center gap-1.5">
          <Eye className="h-4 w-4" /> {views}
        </span>
      </div>
    </header>
  );
};

export default ArtHeader;
