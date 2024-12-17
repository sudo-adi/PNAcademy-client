import React, { use, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowRight,
  ClipboardList,
  Clock,
  Users,
  BarChart2,
  Award,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { useManageReports } from "../../hooks/useManageReports";
import { GroupReportResult } from "@/lib/types/reportTypes";
import ViewReportByGroupDialog from "./view-report-by-group-dialog";

interface Assessment {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  duration: number;
}

interface Result {
  total_marks: number;
  total_participants: number;
  average_marks: number;
  average_marks_percentage: number;
  is_published: boolean;
}

interface AssessmentCardProps {
  assessment: Assessment;
  result: Result;
}
const AssessmentCard: React.FC<AssessmentCardProps> = ({
  assessment,
  result,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const startDate = new Date(assessment.start_at);
  const endDate = new Date(assessment.end_at);
  const isOngoing = new Date() >= startDate && new Date() <= endDate;
  const isPast = new Date() > endDate;

  const dialogData = {
    assessmentName: assessment.name,
    assessmentId: assessment.id,
    assessmentDate: assessment.start_at,
    totalParticipants: result.total_participants,
    totalMarks: result.total_marks,
    averageMarks: result.average_marks,
    averageMarksPercentage: result.average_marks_percentage,
    isPublished: result.is_published,
  };

  const toggleDialog = () => setIsDialogOpen((prev) => !prev);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full hover:shadow-md transition-all duration-300 hover:scale-105">
        <CardContent className="flex flex-row items-center justify-between p-3">
          {/* Assessment Details */}
          <div className="flex flex-col gap-1 flex-grow">
            <h3 className="text-lg font-bold">{assessment.name}</h3>
            <p className="text-xs text-muted-foreground">
              {assessment.description}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Badge
                variant={
                  isOngoing ? "default" : isPast ? "secondary" : "outline"
                }
                className="text-xs px-1 py-0"
              >
                {isOngoing ? "Ongoing" : isPast ? "Completed" : "Upcoming"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {isOngoing
                  ? `Ends ${formatDistanceToNow(endDate, { addSuffix: true })}`
                  : isPast
                  ? `Ended ${formatDistanceToNow(endDate, { addSuffix: true })}`
                  : `Starts ${formatDistanceToNow(startDate, {
                      addSuffix: true,
                    })}`}
              </span>
            </div>
          </div>
          {/* Metrics */}
          <div className="flex flex-col gap-2 items-end">
            <div className="flex items-center gap-3">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs">{assessment.duration / 60000} min</span>
            </div>
            <Badge
              variant={result.is_published ? "default" : "secondary"}
              className="text-xs"
            >
              {result.is_published ? "Published" : "Unpublished"}
            </Badge>
          </div>
        </CardContent>

        {/* Dialog Trigger */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          onClick={toggleDialog}
        >
          View Reports
        </Button>

        {/* Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Reports</DialogTitle>
            </DialogHeader>
            <ViewReportByGroupDialog
              assessmentId={assessment.id}
              data={dialogData}
              isOpen={isDialogOpen}
              onClose={toggleDialog}
            />
          </DialogContent>
        </Dialog>
      </Card>
    </motion.div>
  );
};

interface ViewGroupsDialogProps {
  groupId: string;
}

const ViewGroupsDialog: React.FC<ViewGroupsDialogProps> = ({ groupId }) => {
  const [assessments, setAssessments] = useState<GroupReportResult[]>([]);

  const { fetchAllReportsByGroup } = useManageReports();
  const [loading, setLoading] = useState(false);

  // Fetch assessment reports
  const fetchReports = async () => {
    const payload = {
      groupId: groupId,
      page: 1,
      pageSize: 10,
      sortBy: "createdAt" as const,
      orderBy: "ASC" as const,
    };

    try {
      setLoading(true);
      const response = await fetchAllReportsByGroup(payload);
      console.log("Assessment Reports Response:", response);
      setAssessments(response);
    } catch (err) {
      console.error("Error fetching assessment reports:", err);
      setAssessments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [groupId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full group hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
          onClick={() => {}}
        >
          <span className="text-xs">View Reports</span>
          <ArrowRight className="w-3 h-3 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[40rem] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2 mb-4">
            <ClipboardList className="h-5 w-5 text-primary" />
            Reports
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-4 overflow-auto scrollbar-thin">
          <div className="flex flex-col w-full gap-3 p-4">
            {assessments.map((item) => (
              <AssessmentCard
                key={item.assessment.id}
                assessment={item.assessment}
                result={item}
              />
            ))}
          </div>
        </ScrollArea>
        <DialogFooter className="flex justify-between items-center mt-4 pt-4 border-t">
          <span className="text-sm text-muted-foreground">
            {assessments.length} report{assessments.length !== 1 ? "s" : ""}{" "}
            available
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewGroupsDialog;
