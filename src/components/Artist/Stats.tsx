type Props = {
  totalLikes: number;
  totalViews: number;
};

const Stats = ({ totalLikes, totalViews }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <div className="text-2xl font-semibold">{totalLikes}</div>
        <div className="text-sm text-muted-foreground">Total Likes</div>
      </div>
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <div className="text-2xl font-semibold">{totalViews}</div>
        <div className="text-sm text-muted-foreground">Total Views</div>
      </div>
    </div>
  );
};

export default Stats;
