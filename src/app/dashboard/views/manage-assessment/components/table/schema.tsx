import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableRow } from "@/components/ui/table";
import { Assessment } from "@/lib/types/assessmentTypes";
import { CircleDotDashed, User, Wand } from "lucide-react";

interface SchemaProps {
  sortBy: keyof Assessment;
  order: "ASC" | "DESC";
  allSelected: boolean;
  toggleSorting: (field: keyof Assessment) => void;
  onSelectAll: (checked: boolean) => void;
}
const Schema: React.FC<SchemaProps> = ({
  toggleSorting,
  sortBy,
  order,
  allSelected,
  onSelectAll,
}) => {
  return (
    <TableRow>
      {/* <TableHead className="hidden sm:table-cell">
        <div className="flex w-4 items-center gap-2">
          <Checkbox
            checked={allSelected}
            onCheckedChange={(checked) => onSelectAll(checked as boolean)} />
        </div>
      </TableHead> */}
      <TableHead onClick={() => toggleSorting("name")} className="w-[270px]">
        <div className="flex gap-2 text-[10px] items-center cursor-pointer">
          <User className="h-4 w-4" />
          Assessment Name {sortBy === "name" && (order === "ASC" ? "↓" : "↑")}
        </div>
      </TableHead>
      <TableHead onClick={() => toggleSorting("start_at")}>
        <div className="flex gap-2 text-[10px] items-center cursor-pointer">
          <User className="h-4 w-4" />
          Started at {sortBy === "start_at" && (order === "ASC" ? "↓" : "↑")}
        </div>
      </TableHead>
      <TableHead onClick={() => toggleSorting("end_at")}>
        <div className="flex gap-2 text-[10px] items-center cursor-pointer">
          <User className="h-4 w-4" />
          Ended at {sortBy === "end_at" && (order === "ASC" ? "↓" : "↑")}
        </div>
      </TableHead>
      <TableHead onClick={() => toggleSorting("createdAt")}>
        <div className="gap-2 text-[10px] items-center cursor-pointer flex">
          <User className="h-4 w-4" />
          <div className="inline-block">
            Created at {sortBy === "createdAt" && (order === "ASC" ? "↓" : "↑")}
          </div>
        </div>
      </TableHead>
      <TableHead onClick={() => toggleSorting("updatedAt")}>
        <div className="flex gap-2 text-[10px] items-center cursor-pointer">
          <User className="h-4 w-4" />
          Updated at {sortBy === "updatedAt" && (order === "ASC" ? "↓" : "↑")}
        </div>
      </TableHead>
      <TableHead className="md:table-cell">
        <div className="flex text-[10px] flex-row gap-2 items-center">
          <CircleDotDashed className="h-4 w-4" />
          Status
        </div>
      </TableHead>
      <TableHead className="md:table-cell ">
        <div className="flex text-[10px] flex-row items-center justify-start">
          <Wand className="w-4 h-4 mr-2" />
          Actions
        </div>
      </TableHead>
    </TableRow>
  );
};

export default Schema;
