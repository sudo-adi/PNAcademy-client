import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  CheckCircleIcon,
  XCircleIcon,
  PercentIcon,
  TrophyIcon,
  BrainCircuitIcon,
  BarChart3Icon,
  Target,
  FilePieChart,
  KeyIcon,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

interface ReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    assessmentId: string;
    correctAnswersCount: number;
    wrongAnswersCount: number;
    marksScored: number;
    correctPercentage: number;
    assessmentName: string;
    assessmentDescription: string;
    totalMarks: number;
  };
}

const ReportDialog: React.FC<ReportDialogProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const router = useRouter();

  const chartData = [
    { name: "Correct", value: data.correctAnswersCount },
    { name: "Incorrect", value: data.wrongAnswersCount },
  ];

  const COLORS = ["#10B981", "#EF4444"];

  const [navigatingToAnswerKey, setNavigatingToAnswerKey] = useState(false);

  const navigateToAnswerKey = () => {
    setNavigatingToAnswerKey(true);
    router.push(`/answer-key/${data.assessmentId}`);
  };

  const getPerformanceDetails = (percentage: number) => {
    if (percentage >= 90) {
      return {
        grade: "Excellent",
        color: "text-green-500",
        badge: "success",
        icon: <TrophyIcon className="w-5 h-5" />,
        message: "Outstanding performance! Keep up the great work!",
      };
    } else if (percentage >= 75) {
      return {
        grade: "Good",
        color: "text-blue-500",
        badge: "default",
        icon: <Target className="w-5 h-5" />,
        message: "Well done! You're on the right track.",
      };
    } else if (percentage >= 50) {
      return {
        grade: "Average",
        color: "text-yellow-500",
        badge: "warning",
        icon: <BrainCircuitIcon className="w-5 h-5" />,
        message: "Room for improvement. Keep practicing!",
      };
    } else {
      return {
        grade: "Needs Improvement",
        color: "text-red-500",
        badge: "destructive",
        icon: <BarChart3Icon className="w-5 h-5" />,
        message: "Focus on understanding the concepts better.",
      };
    }
  };

  const performance = getPerformanceDetails(data.correctPercentage);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-bold">
                {data.assessmentName}
              </DialogTitle>
              <DialogDescription className="mt-1.5">
                {data.assessmentDescription}
              </DialogDescription>
            </div>
            <Badge variant={performance.badge as any} className="ml-2">
              <span className="flex items-center gap-1">
                {performance.icon}
                {performance.grade}
              </span>
            </Badge>
          </div>
        </DialogHeader>

        <div className="py-4">
          {/* Performance Summary */}
          <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BrainCircuitIcon className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Performance Summary</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {performance.message}
            </p>
          </div>

          {/* Chart and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        className="stroke-background hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Correct</span>
                </div>
                <span className="text-2xl font-bold text-green-500">
                  {data.correctAnswersCount}
                </span>
              </div>

              <div className="flex flex-col gap-1 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <XCircleIcon className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium">Incorrect</span>
                </div>
                <span className="text-2xl font-bold text-red-500">
                  {data.wrongAnswersCount}
                </span>
              </div>

              <div className="flex flex-col gap-1 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <PercentIcon className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Accuracy</span>
                </div>
                <span className="text-2xl font-bold text-blue-500">
                  {data.correctPercentage.toFixed(1)}%
                </span>
              </div>

              <div className="flex flex-col gap-1 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <FilePieChart className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Score</span>
                </div>
                <span className="text-2xl font-bold text-purple-500">
                  {data.marksScored} / {data.totalMarks}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={navigateToAnswerKey} className="gap-2">
            {navigatingToAnswerKey ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <KeyIcon className="w-4 h-4" />
                View Answer Key
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
