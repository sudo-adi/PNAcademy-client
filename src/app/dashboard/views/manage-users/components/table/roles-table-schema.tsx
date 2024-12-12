import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableRow } from "@/components/ui/table";
import { Calendar, Clock, MousePointer2, ScrollText } from "lucide-react";
import { RolesTableSchemaProps } from "@/lib/types/roleTypes";

// Table schema
const RolesTableSchema: React.FC<RolesTableSchemaProps> = ({
  toggleSorting,
  sortBy,
  order,
  allSelected,
  onSelectAll,
}) => {
  return (
    <TableRow>
      <TableHead className="hidden sm:table-cell">
        <div className="flex items-center gap-2 flex-row cursor-pointer">
          <Checkbox
            checked={allSelected}
            onCheckedChange={(checked) => onSelectAll(checked as boolean)}
          />
        </div>
      </TableHead>
      <TableHead onClick={() => toggleSorting({ field: "name" })}>
        <div className="flex flex-row gap-2 items-center cursor-pointer text-[10px]">
          <ScrollText className="h-3 w-3" />
          Role Name {sortBy === "name" && (order === "ASC" ? "↓" : "↑")}
        </div>
      </TableHead>
      <TableHead
        className="hidden lg:table-cell"
        onClick={() => toggleSorting({ field: "createdAt" })}
      >
        <div className="flex flex-row gap-2 items-center cursor-pointer text-[10px]">
          <Calendar className="h-3 w-3" />
          Created At {sortBy === "createdAt" && (order === "ASC" ? "↓" : "↑")}
        </div>
      </TableHead>
      <TableHead
        className="hidden lg:table-cell"
        onClick={() => toggleSorting({ field: "updatedAt" })}
      >
        <div className="flex flex-row gap-2 items-center cursor-pointer text-[10px]">
          <Clock className="h-3 w-3" />
          Updated At {sortBy === "updatedAt" && (order === "ASC" ? "↓" : "↑")}
        </div>
      </TableHead>
      <TableHead className="md:table-cell">
        <div className="flex flex-row gap-2 items-center text-[10px]">
          <MousePointer2 className="h-3 w-3" />
          Actions
        </div>
      </TableHead>
    </TableRow>
  );
};

export default RolesTableSchema;
