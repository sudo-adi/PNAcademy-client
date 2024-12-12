import { RoleTableRowProps } from "@/lib/types/roleTypes";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Bell,
  BellPlus,
  FileCog,
  FilePieChart,
  PieChart,
  Scroll,
  User,
  UserCog,
  Users,
} from "lucide-react";
import EditRoleDialog from "../dialog-box/edit-role-dialog";
import DeleteRoleDialog from "../dialog-box/delete-role-dialog";
import RoleBadge from "../role-badge";
import { Badge } from "@/components/ui/badge";
import { formatDateInIST } from "@/lib/helpers/time-converter";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

// Single table row
const RolesTableRow: React.FC<RoleTableRowProps> = ({
  role,
  selected,
  loading,
  onSelectRole,
  refreshRoles,
}) => {
  const { toast } = useToast();
  const [showLoadingToast, setShowLoadingToast] = useState(false);

  // Loading toast effect
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (loading) {
      timeoutId = setTimeout(() => {
        setShowLoadingToast(true);
        toast({
          title: "Loading Taking Longer Than Expected",
          description: "The server might be busy. Please wait...",
          duration: 3000,
        });
      }, 3000);
    } else {
      setShowLoadingToast(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loading, toast]);

  // Render nothing if loading
  if (loading) {
    return null;
  }

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) =>
            onSelectRole(role.id, checked as boolean)
          }
        />
      </TableCell>
      <TableCell className="font-medium text-left w-[500px]">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center text-xs">
            {role.name}
          </div>
          <div className="hidden md:flex gap-2 md:flex-wrap">
            {role.canManageAssessment && (
              <RoleBadge text={"Manage Assessments"} icon={<FileCog />} />
            )}
            {role.canManageUser && (
              <RoleBadge text={"Manage Users"} icon={<UserCog />} />
            )}
            {role.canManageRole && (
              <RoleBadge text={"Manage Roles"} icon={<Scroll />} />
            )}
            {role.canManageLocalGroup && (
              <RoleBadge text={"Manage Local Groups"} icon={<Users />} />
            )}
            {role.canManageReports && (
              <RoleBadge text={"Manage Reports"} icon={<PieChart />} />
            )}
            {role.canManageNotification && (
              <RoleBadge text={"Manage Notifications"} icon={<BellPlus />} />
            )}
            {role.canAttemptAssessment && (
              <RoleBadge text={"Attempt Assessments"} icon={<Scroll />} />
            )}
            {role.canViewReport && (
              <RoleBadge text={"View Reports"} icon={<FilePieChart />} />
            )}
            {role.canViewNotification && (
              <RoleBadge text={"Get Notifications"} icon={<Bell />} />
            )}
            {role.canManageMyAccount && (
              <RoleBadge text={"Manage My Account"} icon={<User />} />
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <Badge
          variant={"outline"}
          className="text-[10px] text-center bg-transparent cursor-default"
        >
          {formatDateInIST(role.createdAt)}
        </Badge>
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <Badge
          variant={"outline"}
          className="text-[10px] text-center bg-transparent cursor-default"
        >
          {formatDateInIST(role.updatedAt)}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex gap-4">
          <EditRoleDialog refreshRoles={refreshRoles} role={role} />
          <DeleteRoleDialog refreshRoles={refreshRoles} role={role} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default RolesTableRow;
