import React from "react";
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
  BookOpenIcon,
} from "lucide-react";

interface ReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    correctAnswersCount: number;
    wrongAnswersCount: number;
    marksScored: number;
    correctPercentage: number;
    assessmentName: string;
    assessmentDescription: string;
  };
  onViewAnswerKey: () => void;
}

const ReportDialog: React.FC<ReportDialogProps> = ({
  isOpen,
  onClose,
  data,
  onViewAnswerKey,
}) => {
  const chartData = [
    { name: "Correct", value: data.correctAnswersCount },
    { name: "Incorrect", value: data.wrongAnswersCount },
  ];

  const COLORS = ["#10B981", "#EF4444"];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{data.assessmentName}</DialogTitle>
          <DialogDescription>{data.assessmentDescription}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
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
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center">
              <CheckCircleIcon className="w-4 h-4 mr-2 text-green-500" />
              <span>Correct: {data.correctAnswersCount}</span>
            </div>
            <div className="flex items-center">
              <XCircleIcon className="w-4 h-4 mr-2 text-red-500" />
              <span>Incorrect: {data.wrongAnswersCount}</span>
            </div>
            <div className="flex items-center">
              <PercentIcon className="w-4 h-4 mr-2 text-blue-500" />
              <span>Percentage: {data.correctPercentage.toFixed(2)}%</span>
            </div>
            <div className="flex items-center">
              <BookOpenIcon className="w-4 h-4 mr-2 text-purple-500" />
              <span>Marks: {data.marksScored}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onViewAnswerKey}>View Answer Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
