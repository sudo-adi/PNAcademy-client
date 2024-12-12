import { Card, CardContent } from "@/components/ui/card";
import { LucideProps } from "lucide-react";

const StatCard: React.FC<{
  title: string;
  value: string | number;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}> = ({ title, value, Icon }) => (
  <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-105">
    <CardContent className="p-6">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-primary/10 rounded-full">
          <Icon />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;
