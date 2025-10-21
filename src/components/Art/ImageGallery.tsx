type Props = {
  images: string[];
};

const ImageGallery = ({ images }: Props) => {
  if (!images || images.length === 0) return null;
  const [first, ...rest] = images;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="md:col-span-2 rounded-xl overflow-hidden border border-border bg-muted/20">
        <img src={first} alt="Artwork" className="w-full h-auto" />
      </div>
      <div className="flex md:flex-col gap-3">
        {rest.slice(0, 3).map((src, i) => (
          <div
            key={i}
            className="flex-1 rounded-xl overflow-hidden border border-border bg-muted/20"
          >
            <img src={src} alt={`Artwork ${i + 2}`} className="w-full h-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
