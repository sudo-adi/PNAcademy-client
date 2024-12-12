import {
  Mail,
  User,
  Clock,
  Calendar,
  MousePointer2,
  Phone,
} from "lucide-react";
import { UserTableSchemaProps } from "@/lib/types/userTypes";
import { TableHead, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const UserTableSchema: React.FC<
  UserTableSchemaProps & { isMobile?: boolean }
> = ({
  toggleSorting,
  sortBy,
  order,
  allSelected,
  onSelectAll,
  isMobile = false,
}) => {
  // Define column configurations
  const columns = [
    {
      key: "checkbox",
      className: cn("w-12 sm:table-cell", isMobile ? "hidden" : ""),
      content: (
        <div className="flex items-center gap-2">
          <Checkbox
            checked={allSelected}
            onCheckedChange={(checked) => onSelectAll(checked as boolean)}
          />
        </div>
      ),
    },
    {
      key: "first_name",
      className: cn("w-36 cursor-pointer", isMobile ? "w-36" : ""),
      onClick: () => toggleSorting("first_name"),
      content: (
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-2">
            <User className="h-3 w-3" />
            <span>First Name</span>
          </div>
          <span className="w-4 text-center">
            {sortBy === "first_name" && (order === "ASC" ? "↓" : "↑")}
          </span>
        </div>
      ),
    },
    {
      key: "last_name",
      className: cn("w-36 cursor-pointer", isMobile ? "w-36" : ""),
      onClick: () => toggleSorting("last_name"),
      content: (
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-2">
            <User className="h-3 w-3" />
            <span>Last Name</span>
          </div>
          <span className="w-4 text-center">
            {sortBy === "last_name" && (order === "ASC" ? "↓" : "↑")}
          </span>
        </div>
      ),
    },
    {
      key: "email",
      className: cn(
        "w-48 cursor-pointer",
        isMobile ? "hidden sm:table-cell" : ""
      ),
      onClick: () => toggleSorting("email"),
      content: (
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-2">
            <Mail className="h-3 w-3" />
            <span>Email</span>
          </div>
          <span className="w-4 text-center">
            {sortBy === "email" && (order === "ASC" ? "↓" : "↑")}
          </span>
        </div>
      ),
    },
    {
      key: "phone",
      className: "w-36 hidden lg:table-cell",
      content: (
        <div className="flex items-center gap-2 cursor-default text-[10px]">
          <Phone className="h-3 w-3" />
          <span>Phone</span>
        </div>
      ),
    },
    {
      key: "created_at",
      className: "w-40 hidden lg:table-cell",
      onClick: () => toggleSorting("createdAt"),
      content: (
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            <span>Created At</span>
          </div>
          <span className="w-4 text-center">
            {sortBy === "createdAt" && (order === "ASC" ? "↓" : "↑")}
          </span>
        </div>
      ),
    },
    {
      key: "updated_at",
      className: "w-40 hidden lg:table-cell",
      onClick: () => toggleSorting("updatedAt"),
      content: (
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>Updated At</span>
          </div>
          <span className="w-4 text-center">
            {sortBy === "updatedAt" && (order === "ASC" ? "↓" : "↑")}
          </span>
        </div>
      ),
    },
    {
      key: "actions",
      className: "w-40 text-center",
      content: (
        <div className="flex items-center justify-center text-[10px]">
          <MousePointer2 className="h-3 w-3 mr-2" />
          <span>Actions</span>
        </div>
      ),
    },
  ];

  return (
    <TableRow>
      {columns.map((column) => (
        <TableHead
          key={column.key}
          className={column.className}
          onClick={column.onClick}
        >
          {column.content}
        </TableHead>
      ))}
    </TableRow>
  );
};

export default UserTableSchema;
