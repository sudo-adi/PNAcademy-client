import React, { useRef } from "react";
import { FileText, Users } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ViewGroupsDialog from "../dialogs/view-groups-dialog-box";
import { ReportsSingleGroup } from "@/lib/types/reportTypes";

interface ReportGroupCardProps {
  groupId: string;
  groupName: string;
  totalMembers: number;
  totalAssessments: number;
}

export const ReportGroupCard: React.FC<ReportGroupCardProps> = (props) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 p-0 hover:shadow-lg dark:hover:shadow-slate-700 group">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
          {props.groupName}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
              <FileText className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Assessments
              </p>
              <p className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                {props.totalAssessments}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
              <Users className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Users
              </p>
              <p className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                {props.totalMembers}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-slate-50 dark:bg-slate-800/50 p-4">
        <ViewGroupsDialog groupId={props.groupId} />
      </CardFooter>
    </Card>
  );
};

interface ReportGroupCardListProps {
  loading: boolean;
  groupsData: ReportsSingleGroup[];
}

export const ReportGroupCardList: React.FC<ReportGroupCardListProps> = ({
  loading,
  groupsData,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current) {
      e.preventDefault();
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      onWheel={handleWheel}
      className="
        w-full
        flex
        overflow-x-auto
        space-x-4
        pb-4
        scrollbar-thin
        scrollbar-track-slate-100
        scrollbar-thumb-slate-300
        dark:scrollbar-track-slate-800
        dark:scrollbar-thumb-slate-600
        scroll-smooth
        hover:scrollbar-thumb-slate-400
        dark:hover:scrollbar-thumb-slate-500
      "
      style={{
        scrollbarWidth: "thin",
        scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {loading ? (
        <div className="flex w-full items-center justify-center text-gray-500">
          Loading...
        </div>
      ) : groupsData.length > 0 ? (
        groupsData.map((group) => (
          <ReportGroupCard
            key={group.group_id}
            groupId={group.group_id}
            groupName={group.group_name}
            totalMembers={parseInt(group.total_users)}
            totalAssessments={parseInt(group.total_assessments)}
          />
        ))
      ) : (
        <div className="flex w-full items-center justify-center text-gray-500">
          No groups available
        </div>
      )}
    </div>
  );
};
