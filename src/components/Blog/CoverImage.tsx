type Props = {
  src?: string;
  alt?: string;
};

const CoverImage = ({ src, alt }: Props) => {
  return (
    <div className="mx-auto max-w-3xl rounded-xl overflow-hidden border border-border bg-muted/20">
      {src ? (
        <img src={src} alt={alt ?? "Blog cover"} className="w-full h-auto" />
      ) : (
        <div className="aspect-[16/9] w-full" />
      )}
    </div>
  );
};

export default CoverImage;
