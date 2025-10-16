const AvailableNowFilter = ({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 ${
      active
        ? "bg-white text-foreground"
        : "bg-transparent text-muted-foreground"
    }`}
  >
    {label}
  </span>
);

export default AvailableNowFilter;
