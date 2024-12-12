import { UserTableRowProps } from "@/lib/types/userTypes";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { formatDateInIST } from "@/lib/helpers/time-converter";
import { copyToClipboard } from "@/lib/helpers/copy-to-clipboard";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import ViewUserDialog from "../dialog-box/view-user-dialog";
import EditUserDialog from "../dialog-box/edit-user-diallog";
import DeleteUserDialog from "../dialog-box/delete-user-dialog";
import ChangeUserPasswordDialog from "../dialog-box/change-user-password-dialog";
import { cn } from "@/lib/utils";

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  selected,
  onSelectUser,
  refreshUsers,
  loading,
}) => {
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Responsive handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (loading) {
      timeoutId = setTimeout(() => {
        toast({
          title: "Loading Taking Longer Than Expected",
          description: "The server might be busy. Please wait...",
          duration: 5000,
        });
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loading, toast]);

  if (loading) {
    return null;
  }

  // Define row columns with responsive visibility
  const columns = [
    {
      key: "checkbox",
      className: cn("hidden sm:table-cell w-12", isMobile ? "hidden" : ""),
      content: (
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) =>
            onSelectUser(user.id, checked as boolean)
          }
        />
      ),
    },
    {
      key: "first_name",
      className: cn(
        "font-medium text-left text-xs w-36 truncate",
        isMobile ? "w-36" : ""
      ),
      content: user.first_name,
    },
    {
      key: "last_name",
      className: cn(
        "font-medium text-left text-xs w-36 truncate",
        isMobile ? "w-36" : ""
      ),
      content: user.last_name,
    },
    {
      key: "email",
      className: cn(
        "w-48 hidden sm:table-cell",
        isMobile ? "hidden sm:table-cell" : ""
      ),
      content: (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => copyToClipboard(user.email)}
                className="max-w-full"
              >
                <Badge
                  variant="outline"
                  className="hover:bg-secondary text-[10px] truncate block"
                >
                  {user.email}
                </Badge>
              </button>
            </TooltipTrigger>
            <TooltipContent>Copy to Clipboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      key: "phone",
      className: "w-36 hidden lg:table-cell",
      content: (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => copyToClipboard(user.phone)}
                className="max-w-full"
              >
                <Badge
                  variant="outline"
                  className="hover:bg-secondary text-[10px] truncate block"
                >
                  {user.phone ?? "No Phone Number"}
                </Badge>
              </button>
            </TooltipTrigger>
            <TooltipContent>Copy to Clipboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      key: "created_at",
      className: "hidden lg:table-cell w-40",
      content: (
        <Badge
          variant="outline"
          className="text-[10px] bg-transparent cursor-default truncate block"
        >
          {formatDateInIST(user.createdAt)}
        </Badge>
      ),
    },
    {
      key: "updated_at",
      className: "hidden lg:table-cell w-40",
      content: (
        <Badge
          variant="outline"
          className="text-[10px] bg-transparent cursor-default truncate block"
        >
          {formatDateInIST(user.updatedAt)}
        </Badge>
      ),
    },
    {
      key: "actions",
      className: cn("w-40", isMobile ? "w-40" : "hidden lg:table-cell"),
      content: (
        <div
          className={`flex ${isMobile ? "justify-center" : "gap-4"} sm:flex`}
        >
          <ViewUserDialog user={user} />
          {!isMobile && (
            <>
              <EditUserDialog user={user} refreshUsers={refreshUsers} />
              <DeleteUserDialog user={user} refreshUsers={refreshUsers} />
              <ChangeUserPasswordDialog
                user={user}
                refreshUsers={refreshUsers}
              />
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell key={column.key} className={column.className}>
          {column.content}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default UserTableRow;
