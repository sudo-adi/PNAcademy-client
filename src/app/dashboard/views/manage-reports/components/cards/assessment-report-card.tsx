import React, { useRef } from "react";
import {
  CalendarIcon,
  UsersIcon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
  Percent,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ViewReportDialogBox from "../dialogs/view-report-dialog-box";

interface AssessmentCardProps {
  assessmentName: string;
  assessmentId: string;
  assessmentDate: string;
  totalParticipants: number;
  totalMarks: number;
  averageMarks: number;
  averageMarksPercentage: number;
  isPublished: boolean;
}

export const AssessmentReportCard: React.FC<AssessmentCardProps> = (props) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 h-60 hover:shadow-md dark:hover:shadow-slate-700 min-w-[250px] max-w-[300px] flex flex-col justify-between">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="text-[10px]">
                  {truncateText(props.assessmentId, 20)}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{props.assessmentId}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant={props.isPublished ? "default" : "secondary"}
                  className="text-[10px] font-medium"
                >
                  {props.isPublished ? (
                    <>
                      <CheckCircleIcon className="w-2 h-2 mr-1" /> Published
                    </>
                  ) : (
                    <>
                      <XCircleIcon className="w-2 h-2 mr-1" /> Draft
                    </>
                  )}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {props.isPublished
                    ? "This assessment is live"
                    : "This assessment is not yet published"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
          {truncateText(props.assessmentName, 80)}
        </p>
        <div className="flex flex-wrap gap-1 mb-2">
          <Badge variant="outline" className="text-[10px]">
            <CalendarIcon className="w-2 h-2 mr-1" />
            {new Date(props.assessmentDate).toLocaleDateString()}
          </Badge>
          <Badge variant="outline" className="text-[10px]">
            <Percent className="w-2 h-2 mr-1" />
            {props.averageMarksPercentage}%
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded p-2 flex items-center justify-between">
            <UsersIcon className="w-3 h-3 text-slate-600 dark:text-slate-300" />
            <div className="text-right">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {props.totalParticipants}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Participants
              </p>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded p-2 flex items-center justify-between">
            <StarIcon className="w-3 h-3 text-slate-600 dark:text-slate-300" />
            <div className="text-right">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {props.totalMarks}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Total Marks
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-slate-50 dark:bg-slate-800/50 p-2">
        <ViewReportDialogBox assessmentId={props.assessmentId} data={props} />
      </CardFooter>
    </Card>
  );
};

const dummyAssessments: AssessmentCardProps[] = [
  {
    assessmentName: "Midterm Exam 2024",
    assessmentId: "A1234567890",
    assessmentDate: "2024-12-10",
    totalParticipants: 30,
    totalMarks: 100,
    averageMarks: 75,
    averageMarksPercentage: 75,
    isPublished: true,
  },
  {
    assessmentName: "Final Exam 2024",
    assessmentId: "B0987654321",
    assessmentDate: "2024-12-20",
    totalParticipants: 25,
    totalMarks: 100,
    averageMarks: 80,
    averageMarksPercentage: 80,
    isPublished: false,
  },
  {
    assessmentName: "Mock Test",
    assessmentId: "C1122334455",
    assessmentDate: "2024-12-15",
    totalParticipants: 20,
    totalMarks: 50,
    averageMarks: 40,
    averageMarksPercentage: 80,
    isPublished: true,
  },
];

const AssessmentCardList: React.FC = () => {
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
      {dummyAssessments.map((assessment, index) => (
        <div
          key={`${assessment.assessmentId}-${index}`}
          className="
            flex-shrink-0
            scroll-snap-align-start
            scroll-ml-4
            last:mr-4
          "
        >
          <AssessmentReportCard {...assessment} />
        </div>
      ))}
    </div>
  );
};

export default AssessmentCardList;
