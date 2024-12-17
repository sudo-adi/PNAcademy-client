// components/tabs/group-reports.tsx
import React, { useEffect } from "react";
import { Loader } from "lucide-react";
import { ReportsSingleGroup } from "@/lib/types/reportTypes";
import { ReportGroupCard } from "../cards/report-group-card";

interface ReportsByGroupsProps {
  groups: ReportsSingleGroup[];
  loadingGroups: boolean;
}

const ReportsByGroups: React.FC<ReportsByGroupsProps> = ({
  groups,
  loadingGroups,
}) => {
  useEffect(() => {
    console.log("ReportsByGroups Component", {
      groups,
      groupsLength: groups?.length,
      loadingGroups,
    });
  }, [loadingGroups, groups]);
  if (loadingGroups) {
    return (
      <div className="flex h-[calc(100vh-12rem)] w-full items-center justify-center">
        <Loader className="h-6 w-6 animate-spin" />
      </div>
    );
  }
  return (
    <div className="w-full h-[calc(100vh-12rem)] overflow-y-auto scrollbar-thin">
      {groups && groups.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-0">
          {groups.map((group) => (
            <>
              <ReportGroupCard
                key={group.group_id}
                groupId={group.group_id}
                groupName={group.group_name}
                totalMembers={parseInt(group.total_users)}
                totalAssessments={parseInt(group.total_assessments)}
              />
            </>
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-500">
          No groups available
        </div>
      )}
    </div>
  );
};

export default ReportsByGroups;
