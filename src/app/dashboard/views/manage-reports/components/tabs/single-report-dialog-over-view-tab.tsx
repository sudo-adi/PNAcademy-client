import React from "react";
import KeyMetricCard from "../cards/key-metric-card";
import { KeyMetrics } from "@/lib/types/reportTypes";

export interface SingleReportDialogOverViewTabProps {
  keyMetrics: KeyMetrics;
}

const SingleReportDialogOverViewTab: React.FC<
  SingleReportDialogOverViewTabProps
> = ({ keyMetrics }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <KeyMetricCard props={keyMetrics} />
    </div>
  );
};

export default SingleReportDialogOverViewTab;
