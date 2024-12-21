import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, ClipboardList, Loader2 } from "lucide-react";
import { useManageReports } from "../../hooks/useManageReports";
import { GroupReportResult } from "@/lib/types/reportTypes";
import ViewReportByGroupDialog from "./view-report-by-group-dialog";
import { motion, AnimatePresence } from "framer-motion";

interface ViewGroupsDialogProps {
  groupId: string;
}

const ViewGroupsDialog: React.FC<ViewGroupsDialogProps> = ({ groupId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [assessments, setAssessments] = useState<GroupReportResult[]>([]);
  const { fetchAllReportsByGroup } = useManageReports();
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    const payload = {
      groupId: groupId,
      page: 1,
      pageSize: 10,
      sortBy: "createdAt" as const,
      orderBy: "DESC" as const,
    };

    try {
      setLoading(true);
      const response = await fetchAllReportsByGroup(payload);
      setAssessments(response);
    } catch (err) {
      console.error("Error fetching assessment reports:", err);
      setAssessments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchReports();
    }
  }, [isOpen, groupId]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full group hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
        >
          <span className="text-xs">View Reports</span>
          <ArrowRight className="w-3 h-3 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Assessment Reports
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-grow mt-4">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center p-8"
              >
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </motion.div>
            ) : assessments.length > 0 ? (
              <div className="grid gap-4 p-4">
                {assessments.map((assessment, index) => (
                  <motion.div
                    key={assessment.assessment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ViewReportByGroupDialog
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                      assessmentId={assessment.assessment.id}
                      data={{
                        assessmentName: assessment.assessment.name,
                        assessmentId: assessment.assessment.id,
                        assessmentDate: assessment.assessment.start_at,
                        totalParticipants: assessment.total_participants,
                        totalMarks: assessment.total_marks,
                        averageMarks: assessment.average_marks,
                        averageMarksPercentage:
                          assessment.average_marks_percentage,
                        isPublished: assessment.is_published,
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center p-8 text-slate-500"
              >
                <ClipboardList className="w-12 h-12 mb-2 opacity-50" />
                <p className="text-lg font-medium">No Reports Available</p>
                <p className="text-sm text-slate-400">
                  There are no assessment reports to display
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ViewGroupsDialog;
