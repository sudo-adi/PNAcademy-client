import React, { useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  PercentIcon,
  BookOpenIcon,
  FileTextIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ReportDialog from "../dialogs/my-report-dialog";

export interface ResultCardProps {
  correctAnswersCount: number;
  marksScored: number;
  correctPercentage: number;
  wrongAnswersCount: number;
  assessmentName: string;
  assessmentDescription: string;
}

export const ResultCard: React.FC<ResultCardProps> = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 max-h-80 h-56 hover:shadow-md dark:hover:shadow-slate-700 min-w-[220px] max-w-full flex flex-col justify-between">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold">
          {truncateText(props.assessmentName, 40)}
        </CardTitle>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {truncateText(props.assessmentDescription, 60)}
        </p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-1 mb-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="outline" className="text-[10px]">
                  <PercentIcon className="w-2 h-2 mr-1" />
                  {props.correctPercentage.toFixed(2)}%
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Correct Percentage</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="outline" className="text-[10px]">
                  <BookOpenIcon className="w-2 h-2 mr-1" />
                  {props.marksScored}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Marks Scored</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded p-2 flex items-center justify-between">
            <CheckCircleIcon className="w-3 h-3 text-green-600 dark:text-green-400" />
            <div className="text-right">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {props.correctAnswersCount}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Correct
              </p>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded p-2 flex items-center justify-between">
            <XCircleIcon className="w-3 h-3 text-red-600 dark:text-red-400" />
            <div className="text-right">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {props.wrongAnswersCount}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Incorrect
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-2 bg-slate-50 dark:bg-slate-800/50">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setIsDialogOpen(true)}
        >
          <FileTextIcon className="w-4 h-4 mr-2" />
          View Report
        </Button>
      </CardFooter>
      <ReportDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        data={props}
        onViewAnswerKey={() => {}}
      />
    </Card>
  );
};
