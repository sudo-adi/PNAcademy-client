import React from "react";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Check, CirclePercent, CircleX, Hash, User, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SingleUserReport {
  username: string;
  email: string;
  group: string;
  correctAnswers: number;
  wrongAnswers: number;
  totalScore: number;
  percentage: number;
}

interface SingleReportDialogUsersTabProps {
  users: SingleUserReport[];
}

const SingleReportDialogUsersTab: React.FC<SingleReportDialogUsersTabProps> = ({
  users,
}) => {
  return (
    <div className="text-xs flex flex-col h-full border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-background">
              <Schema toggleSorting={() => {}} />
            </thead>
          </table>
          <div
            className="overflow-y-auto"
            style={{ maxHeight: "calc(56vh + 9px)" }}
          >
            {/* Adjust the 200px value as needed */}
            <table className="min-w-full divide-y table-fixed">
              <tbody className="divide-y">
                {users.map((user, index) => (
                  <Row
                    key={index}
                    name={user.username}
                    email={user.email}
                    group={user.group}
                    correctAnswers={user.correctAnswers}
                    wrongAnswers={user.wrongAnswers}
                    totalScore={user.totalScore}
                    percentage={user.percentage}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SchemaProps {
  toggleSorting: (name: string) => void;
}

const Schema: React.FC<SchemaProps> = ({ toggleSorting }) => (
  <TableRow className="bg-secondary">
    <TableHead
      className="w-1/4 rounded-tl-md"
      onClick={() => toggleSorting("first_name")}
    >
      <div className="flex gap-2 items-center cursor-pointer text-[10px]">
        <User className="h-3 w-3" />
        User
      </div>
    </TableHead>
    <TableHead className="w-1/6" onClick={() => toggleSorting("first_name")}>
      <div className="flex gap-2 items-center cursor-pointer text-[10px]">
        <Users className="h-3 w-3" />
        group
      </div>
    </TableHead>
    <TableHead className="w-1/6" onClick={() => toggleSorting("first_name")}>
      <div className="flex gap-2 items-center cursor-pointer text-[10px]">
        <Check className="h-3 w-3" />
        Correct ans
      </div>
    </TableHead>
    <TableHead className="w-1/6" onClick={() => toggleSorting("first_name")}>
      <div className="flex gap-2 items-center cursor-pointer text-[10px]">
        <CircleX className="h-3 w-3" />
        Wrong ans
      </div>
    </TableHead>
    <TableHead className="w-1/6" onClick={() => toggleSorting("first_name")}>
      <div className="flex gap-2 items-center cursor-pointer text-[10px]">
        <Hash className="h-3 w-3" />
        Total Score
      </div>
    </TableHead>
    <TableHead
      className="w-1/6 rounded-tr-md"
      onClick={() => toggleSorting("first_name")}
    >
      <div className="flex gap-2 items-center cursor-pointer text-[10px]">
        <CirclePercent className="h-3 w-3" />
        Percentage %
      </div>
    </TableHead>
  </TableRow>
);

interface RowProps {
  name: string;
  email: string;
  group: string;
  correctAnswers: number;
  wrongAnswers: number;
  totalScore: number;
  percentage: number;
}

const Row: React.FC<RowProps> = ({
  name,
  email,
  group,
  correctAnswers,
  wrongAnswers,
  totalScore,
  percentage,
}) => {
  return (
    <TableRow>
      <TableCell className="w-1/4">
        <div className="flex flex-col gap-2">
          <span className="truncate">{name}</span>
          <Badge
            className="text-[8px] cursor-pointer w-fit"
            variant={"outline"}
          >
            {email}
          </Badge>
        </div>
      </TableCell>
      <TableCell className="w-1/6 font-medium text-left text-xs">
        {group}
      </TableCell>
      <TableCell className="w-1/6 font-medium text-left text-xs">
        {correctAnswers}
      </TableCell>
      <TableCell className="w-1/6 font-medium text-left text-xs">
        {wrongAnswers}
      </TableCell>
      <TableCell className="w-1/6 font-medium text-left text-xs">
        {totalScore}
      </TableCell>
      <TableCell className="w-1/6 font-medium text-left text-xs">
        {percentage}
      </TableCell>
    </TableRow>
  );
};

export default SingleReportDialogUsersTab;
