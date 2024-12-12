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
  // Helper function to render sort arrow with consistent width
  const renderSortIndicator = (field: keyof Assessment) => {
    if (sortBy === field) {
      return (
        <span className="inline-block w-4 text-center">
          {order === "ASC" ? "↓" : "↑"}
        </span>
      );
    }
    return <span className="inline-block w-4" />;
  };

  return (
    <TableRow className="w-full">
      <TableHead
        onClick={() => toggleSorting("name")}
        className="w-[200px] min-w-[200px]"
      >
        <div className="flex items-center gap-2 text-[10px] cursor-pointer whitespace-nowrap">
          <User className="h-4 w-4 flex-shrink-0" />
          <span className="flex-grow">Assessment Name</span>
          {renderSortIndicator("name")}
        </div>
      </TableHead>

      <TableHead
        onClick={() => toggleSorting("start_at")}
        className="w-[150px] min-w-[150px] hidden md:table-cell"
      >
        <div className="flex items-center gap-2 text-[10px] cursor-pointer whitespace-nowrap">
          <User className="h-4 w-4 flex-shrink-0" />
          <span className="flex-grow">Started at</span>
          {renderSortIndicator("start_at")}
        </div>
      </TableHead>

      <TableHead
        onClick={() => toggleSorting("end_at")}
        className="w-[150px] min-w-[150px] hidden md:table-cell"
      >
        <div className="flex items-center gap-2 text-[10px] cursor-pointer whitespace-nowrap">
          <User className="h-4 w-4 flex-shrink-0" />
          <span className="flex-grow">Ended at</span>
          {renderSortIndicator("end_at")}
        </div>
      </TableHead>

      <TableHead
        onClick={() => toggleSorting("createdAt")}
        className="w-[150px] min-w-[150px] hidden md:table-cell"
      >
        <div className="flex items-center gap-2 text-[10px] cursor-pointer whitespace-nowrap">
          <User className="h-4 w-4 flex-shrink-0" />
          <span className="flex-grow">Created at</span>
          {renderSortIndicator("createdAt")}
        </div>
      </TableHead>

      <TableHead
        onClick={() => toggleSorting("updatedAt")}
        className="w-[150px] min-w-[150px] hidden md:table-cell"
      >
        <div className="flex items-center gap-2 text-[10px] cursor-pointer whitespace-nowrap">
          <User className="h-4 w-4 flex-shrink-0" />
          <span className="flex-grow">Updated at</span>
          {renderSortIndicator("updatedAt")}
        </div>
      </TableHead>

      <TableHead className="w-[100px] min-w-[100px]">
        <div className="flex items-center gap-2 text-[10px] whitespace-nowrap">
          <CircleDotDashed className="h-4 w-4 flex-shrink-0" />
          <span className="flex-grow">Status</span>
        </div>
      </TableHead>

      <TableHead className="w-[100px] min-w-[100px]">
        <div className="flex items-center gap-2 text-[10px] whitespace-nowrap">
          <Wand className="w-4 h-4 flex-shrink-0" />
          <span className="flex-grow">Actions</span>
        </div>
      </TableHead>
    </TableRow>
  );
};

export default Schema;
