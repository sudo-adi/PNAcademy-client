import React, { useState } from "react";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import {
  Check,
  CirclePercent,
  CircleX,
  ClipboardList,
  Hash,
  Loader2,
  User,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LeaderboardData } from "../charts/leaderboards";
import { useRouter } from "next/navigation";

interface SingleReportDialogUsersTabProps {
  data: {
    assessmentId: string;
    users: LeaderboardData[];
    totalMarks: number;
  };
}

const AllUsersInAssessmentLeaderboardsTable: React.FC<
  SingleReportDialogUsersTabProps
> = ({ data }) => {
  const router = useRouter();
  const viewAnswerKey = (userId: string) => {
    router.push(`/answer-key/${data.assessmentId}/${userId}`);
  };

  return (
    <div className="text-xs flex flex-col h-full border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-background">
            <Schema toggleSorting={() => {}} />
          </thead>
          <tbody className="divide-y">
            {data.users.map((user, index) => (
              <Row
                key={index}
                name={`${user.user.first_name} ${user.user.last_name}`}
                email={user.user.email}
                correctAnswers={user.correct_answers_count}
                wrongAnswers={user.wrong_answers_count}
                totalScore={user.marks_scored}
                percentage={user.correct_percentage}
                scorePercentage={(user.marks_scored / data.totalMarks) * 100}
                view={() => viewAnswerKey(user.user_id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface SchemaProps {
  toggleSorting: (name: string) => void;
}

const Schema: React.FC<SchemaProps> = ({ toggleSorting }) => (
  <TableRow>
    <TableHead
      className="w-[15%] px-2 py-1 text-left cursor-pointer"
      onClick={() => toggleSorting("first_name")}
    >
      <div className="flex gap-2 items-center text-[10px]">
        <User className="h-3 w-3" />
        User
      </div>
    </TableHead>
    <TableHead
      className="w-[10%] px-2 py-1 text-left cursor-pointer"
      onClick={() => toggleSorting("correct_answers")}
    >
      <div className="flex gap-2 items-center text-[10px]">
        <Check className="h-3 w-3" />
        Correct ans
      </div>
    </TableHead>
    <TableHead
      className="w-[10%] px-2 py-1 text-left cursor-pointer"
      onClick={() => toggleSorting("wrong_answers")}
    >
      <div className="flex gap-2 items-center text-[10px]">
        <CircleX className="h-3 w-3" />
        Wrong ans
      </div>
    </TableHead>
    <TableHead
      className="w-[10%] px-2 py-1 text-left cursor-pointer"
      onClick={() => toggleSorting("total_score")}
    >
      <div className="flex gap-2 items-center text-[10px]">
        <Hash className="h-3 w-3" />
        Total Score
      </div>
    </TableHead>
    <TableHead
      className="w-[10%] px-2 py-1 text-left cursor-pointer"
      onClick={() => toggleSorting("percentage")}
    >
      <div className="flex gap-2 items-center text-[10px]">
        <CirclePercent className="h-3 w-3" />
        Correct Ans %
      </div>
    </TableHead>
    <TableHead
      className="w-[10%] px-2 py-1 text-left cursor-pointer"
      onClick={() => toggleSorting("score")}
    >
      <div className="flex gap-2 items-center text-[10px]">
        <Users className="h-3 w-3" />
        Score %age
      </div>
    </TableHead>
    <TableHead
      className="w-[10%] px-2 py-1 text-left cursor-pointer"
      onClick={() => toggleSorting("view")}
    >
      <div className="flex gap-2 items-center text-[10px]">View</div>
    </TableHead>
  </TableRow>
);

interface RowProps {
  name: string;
  email: string;
  correctAnswers: number;
  wrongAnswers: number;
  totalScore: number;
  percentage: number;
  scorePercentage: number;
  view: () => void;
}

const Row: React.FC<RowProps> = ({
  name,
  email,
  correctAnswers,
  wrongAnswers,
  totalScore,
  percentage,
  scorePercentage,
  view,
}) => {
  const [isViewing, setIsViewing] = useState(false);

  return (
    <TableRow>
      <TableCell className="w-[15%] px-2 py-1">
        <div className="flex flex-col gap-1">
          <span className="truncate text-xs">{name}</span>
          <Badge className="text-[8px] cursor-pointer w-fit" variant="outline">
            {email}
          </Badge>
        </div>
      </TableCell>
      <TableCell className="w-[10%] px-2 py-1 text-xs text-left">
        {correctAnswers}
      </TableCell>
      <TableCell className="w-[10%] px-2 py-1 text-xs text-left">
        {wrongAnswers}
      </TableCell>
      <TableCell className="w-[10%] px-2 py-1 text-xs text-left">
        {totalScore}
      </TableCell>
      <TableCell className="w-[10%] px-2 py-1 text-xs text-left">
        {percentage.toFixed(2)}%
      </TableCell>
      <TableCell className="w-[10%] px-2 py-1 text-xs text-left">
        {scorePercentage.toFixed(2)}
      </TableCell>
      <TableCell className="w-[10%] px-2 py-1">
        <button
          className="p-1 h-8 w-8 flex items-center justify-center border rounded-sm hover:bg-secondary cursor-pointer"
          onClick={() => {
            setIsViewing(true);
            view();
          }}
        >
          {isViewing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ClipboardList className="h-4 w-4" />
          )}
        </button>
      </TableCell>
    </TableRow>
  );
};

export default AllUsersInAssessmentLeaderboardsTable;
