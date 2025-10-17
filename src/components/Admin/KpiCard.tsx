// Key Performance Indicator (KPI) Card

import { Card } from "@/components/ui/card";

type Props = {
  title: string;
  value: number;
  loading?: boolean;
};

const KpiCard = ({ title, value, loading }: Props) => {
  return (
    <Card className="p-4">
      <p className="text-xs text-muted-foreground">{title}</p>
      {loading ? (
        <div className="mt-3 h-7 w-16 rounded bg-muted/50" />
      ) : (
        <p className="mt-2 text-2xl font-semibold">{value}</p>
      )}
    </Card>
  );
};

export default KpiCard;
