// Key Performance Indicator (KPI) Card

import { Card } from "@/components/ui/card";

type Props = {
  title: string;
  value: number;
};

const KpiCard = ({ title, value }: Props) => {
  return (
    <Card className="p-4">
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </Card>
  );
};

export default KpiCard;
