import React, { useRef } from "react";
import { FileText, Users, BarChart2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ViewGroupsDialog from "../dialogs/view-groups-dialog-box";
import { ReportsSingleGroup } from "@/lib/types/reportTypes";
import { motion } from "framer-motion";

interface ReportGroupCardProps {
  groupId: string;
  groupName: string;
  totalMembers: number;
  totalAssessments: number;
}

export const ReportGroupCard: React.FC<ReportGroupCardProps> = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-w-[300px] max-w-[350px]"
    >
      <Card className="overflow-hidden transition-all duration-300 p-0 hover:shadow-lg dark:hover:shadow-slate-700 group h-full">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100 line-clamp-1">
            {props.groupName}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Assessments
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {props.totalAssessments}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-full">
                <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {props.totalMembers}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t">
          <ViewGroupsDialog groupId={props.groupId} />
        </CardFooter>
      </Card>
    </motion.div>
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

  return (
    <div
      ref={scrollContainerRef}
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-4
        w-full
        p-4
      "
    >
      {loading ? (
        <div className="col-span-full flex items-center justify-center p-8">
          <div className="flex items-center gap-2 text-slate-500">
            <BarChart2 className="w-5 h-5 animate-pulse" />
            <span>Loading reports...</span>
          </div>
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
        <div className="col-span-full flex flex-col items-center justify-center p-8 text-slate-500">
          <FileText className="w-12 h-12 mb-2 opacity-50" />
          <p className="text-lg font-medium">No Groups Available</p>
          <p className="text-sm text-slate-400">
            There are no groups to display at the moment
          </p>
        </div>
      )}
    </div>
  );
};
