import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyMetrics } from "@/lib/types/reportTypes";

interface KeyMetricCardProps {
  props: KeyMetrics;
}

const KeyMetricCard: React.FC<KeyMetricCardProps> = ({ props }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xs">Key Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 w-full">
          <div>
            <p className="text-xs text-muted-foreground">Total Participants</p>
            <h3 className="text-sm font-bold">{props.totalParticipants}</h3>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Marks</p>
            <h3 className="text-sm font-bold">{props.totalMarks}</h3>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Average Score</p>
            <h3 className="text-sm font-bold">
              {props.averageMarks.toFixed(2)}%
            </h3>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Average Score</p>
            <h3 className="text-sm font-bold">
              {props.averageMarksPercentage.toFixed(2)}%
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyMetricCard;
