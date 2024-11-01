import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableRow } from "@/components/ui/table";
import { Assessment } from "@/lib/types/assessmentTypes";
import { Timer, User, Wand } from "lucide-react";

interface SchemaProps {
  toggleSorting: (field: keyof Assessment) => void;
  sortBy: keyof Assessment;
  order: "ASC" | "DESC";
  allSelected: boolean;
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
    <TableRow className="bg-">
      {/* <TableHead className="hidden sm:table-cell">
        <div className="flex w-4 items-center gap-2">
          <Checkbox
            checked={allSelected}
            onCheckedChange={(checked) => onSelectAll(checked as boolean)}
          />
        </div>
      </TableHead> */}
      <TableHead onClick={() => toggleSorting("name")} className="w-[280px]">
        <div className="flex gap-2 text-[10px] items-center cursor-pointer">
          <User className="h-4 w-4" />
          Assessment Name {sortBy === "name" && (order === "ASC" ? "↓" : "↑")}
        </div>
      </TableHead>
      <TableHead className="w-[270px]">
        <div className="flex gap-2 text-[10px] items-center cursor-pointer">
          <User className="h-4 w-4" />
          Assessment Id {sortBy === "id" && (order === "ASC" ? "↓" : "↑")}
        </div>
      </TableHead>
      <TableHead onClick={() => toggleSorting("createdAt")}>
        <div className="flex gap-2 text-[10px] w-[100px] items-center cursor-pointer">
          <Timer className="h-4 w-4" />
          Cretated at {sortBy === "createdAt" && (order === "ASC" ? "↓" : "↑")}
        </div>
      </TableHead>
      <TableHead onClick={() => toggleSorting("updatedAt")}>
        <div className="flex gap-2 text-[10px] w-[100px] items-center cursor-pointer">
          <Timer className="h-4 w-4" />
          Last Drafted {sortBy === "updatedAt" && (order === "ASC" ? "↓" : "↑")}
        </div>
      </TableHead>
      <TableHead className="md:table-cell ">
        <div className="flex text-[10px] flex-row items-center justify-start">
          <Wand className="mr-2 h-4 w-4" />
          Actions
        </div>
      </TableHead>
    </TableRow>
  );
};

export default Schema;
