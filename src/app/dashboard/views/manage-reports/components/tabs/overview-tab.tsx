import StatCard from "../cards/stat-card";
import {
  ClipboardCheck,
  FileTextIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import AssessmentCardList from "../cards/assessment-report-card";
import { AssessmentResult, ReportsSingleGroup } from "@/lib/types/reportTypes";
import { ReportGroupCardList } from "../cards/report-group-card";

interface ReportsOverViewTabProps {
  // Define props here
  loading: boolean;
  reportsData: AssessmentResult[];
  loadingGroups: boolean;
  groups: ReportsSingleGroup[];
  refreshReports: () => void;
}

const ReportsOverViewTab: React.FC<ReportsOverViewTabProps> = ({
  loading,
  reportsData,
  loadingGroups,
  groups,
  refreshReports,
}) => {
  const currentDate = new Date();

  // Calculate reports generated this week
  const totalReportsGeneratedThisWeek = reportsData.reduce((acc, report) => {
    const reportDate = new Date(report.createdAt);

    // Check if the report's createdAt date is within the current week
    const startOfWeek = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay())
    );
    const endOfWeek = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6)
    );

    if (reportDate >= startOfWeek && reportDate <= endOfWeek) {
      return acc + report.total_marks;
    }
    return acc;
  }, 0);

  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 m-0">
        <StatCard
          title="Reports generated this week"
          value={totalReportsGeneratedThisWeek}
          Icon={ClipboardCheck}
        />
        <StatCard
          title="Total Reports"
          value={reportsData.length}
          Icon={FileTextIcon}
        />
        <StatCard title="Total Groups" value={groups.length} Icon={UsersIcon} />
        {/* <StatCard title="Total candidates" value={} Icon={UserIcon} /> */}
      </div>

      <div className="flex flex-col gap-2 mt-5 w-[calc(100vw-21rem)]">
        <div className="flex flex-row justify-between">
          <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Recent Reports Reports
          </h1>
          <div className="flex underline">View All</div>
        </div>
        <AssessmentCardList
          loading={loading}
          reportsData={reportsData}
          refreshReports={refreshReports}
        />
      </div>
      <div className="flex flex-col gap-2 mt-5 w-[calc(100vw-21rem)]">
        <div className="flex flex-row justify-between">
          <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Group Reports
          </h1>
          <div className="flex underline">View All</div>
        </div>
        <ReportGroupCardList loading={loadingGroups} groupsData={groups} />
      </div>
    </div>
  );
};

export default ReportsOverViewTab;
