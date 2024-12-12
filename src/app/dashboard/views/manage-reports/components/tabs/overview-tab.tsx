import React from "react";
import StatCard from "../cards/stat-card";
import {
  ClipboardCheck,
  FileTextIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import AssessmentCardList from "../cards/assessment-report-card";
import { GroupCardScrollViewList } from "../cards/overview-group-card-scrollview";

interface ReportsOverViewTabProps {
  reports: string;
  totalGroups: string;
  totalCandidates: string;
}

const ReportsOverViewTab: React.FC<ReportsOverViewTabProps> = ({
  reports,
  totalGroups,
  totalCandidates,
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 m-0">
        <StatCard
          title="Reports generated this week"
          value="69"
          Icon={ClipboardCheck}
        />
        <StatCard title="Total Reports" value="69" Icon={FileTextIcon} />
        <StatCard title="Total Groups" value="69" Icon={UsersIcon} />
        <StatCard title="Total candidates" value="69" Icon={UserIcon} />
      </div>

      <div className="flex flex-col gap-2 mt-5 w-[calc(100vw-21rem)]">
        <div className="flex flex-row justify-between">
          <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            This Week's Assessments
          </h1>
          <div className="flex underline">View All</div>
        </div>
        <AssessmentCardList />
      </div>
      <div className="flex flex-col gap-2 mt-5 w-[calc(100vw-21rem)]">
        <div className="flex flex-row justify-between">
          <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Group Reports
          </h1>
          <div className="flex underline">View All</div>
        </div>
        <GroupCardScrollViewList />
      </div>
    </div>
  );
};

export default ReportsOverViewTab;
