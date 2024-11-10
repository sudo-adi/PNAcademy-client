import React from "react";
import NumberOfParticipants from "../cards/number-of-participants";
import { CompetitiveGroupReportCard } from "../cards/competitive-group-report";
import KeyMetricCard from "../cards/key-metric-card";
import { ScoreRangeDistributionCard } from "../cards/score-range-distribution-card";
import { GroupAttemptionPercentageCard } from "../cards/group-attemption-percentage-card";
import {
  AvgPercentage,
  EachGroupAvgScore,
  KeyMetrics,
  ScoreDistribution,
  UsersAttemptedFromEachGroupPercentage,
  UsersAttemptedVsUsersUnAttempted,
} from "@/lib/types/reportTypes";
import AvgPercentageCard from "../cards/avg-percentage";

export interface SingleReportDialogOverViewTabProps {
  keyMetrics: KeyMetrics;
  usersAttemptedVsUsersUnAttempted: UsersAttemptedVsUsersUnAttempted;
  avgPercentage: AvgPercentage;
  scoreDistribution: ScoreDistribution;
  eachGroupAvgScore: EachGroupAvgScore;
  usersAttemptedFromEachGroupPercentage: UsersAttemptedFromEachGroupPercentage;
}

const SingleReportDialogOverViewTab: React.FC<
  SingleReportDialogOverViewTabProps
> = ({
  keyMetrics,
  usersAttemptedVsUsersUnAttempted,
  avgPercentage,
  scoreDistribution,
  eachGroupAvgScore,
  usersAttemptedFromEachGroupPercentage,
}) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <KeyMetricCard props={keyMetrics} />
      <NumberOfParticipants props={usersAttemptedVsUsersUnAttempted} />
      <AvgPercentageCard />
      <ScoreRangeDistributionCard />
      <CompetitiveGroupReportCard />
      <GroupAttemptionPercentageCard />
    </div>
  );
};

export default SingleReportDialogOverViewTab;
