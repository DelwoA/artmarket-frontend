type Props = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

const AvailableNowFilter = ({ label, active = false, onClick }: Props) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`inline-flex items-center rounded-full border px-3 py-1 transition-colors ${
      active
        ? "bg-white text-foreground border-gray-300"
        : "bg-transparent text-muted-foreground hover:text-foreground/70"
    }`}
  >
    {label}
  </button>
);

export default AvailableNowFilter;
