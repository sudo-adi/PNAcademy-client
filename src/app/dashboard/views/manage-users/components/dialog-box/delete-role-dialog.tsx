import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useCallback, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Trash2 } from "lucide-react";
import { useRoles } from "../../hooks/useRoles";
import { DeleteRoleDialogProps } from "@/lib/types/roleTypes";
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
import RoleBadge from "../role-badge";
import { toast } from "@/components/ui/use-toast";

const DeleteRoleDialog: React.FC<DeleteRoleDialogProps> = ({
  refreshRoles,
  role,
}) => {
  // Responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { removeRoles } = useRoles();
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    setLoading(true);
    try {
      await removeRoles({ roleIds: [{ roleId: role.id }] });

      // Success toast
      toast({
        title: "Role Deleted",
        description: `Role "${role.name}" has been deleted successfully.`,
        variant: "default",
      });

      refreshRoles();
    } catch (err) {
      // Error toast
      toast({
        title: "Error Deleting Role",
        description: "Unable to delete the role. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [removeRoles, role.id, refreshRoles]);

  // Permission mapping for dynamic rendering
  const permissionMap = [
    {
      condition: role.canManageAssessment,
      text: "Manage Assessments",
      icon: <FileCog />,
    },
    {
      condition: role.canManageUser,
      text: "Manage Users",
      icon: <UserCog />,
    },
    {
      condition: role.canManageRole,
      text: "Manage Roles",
      icon: <Scroll />,
    },
    {
      condition: role.canManageLocalGroup,
      text: "Manage Local Groups",
      icon: <Users />,
    },
    {
      condition: role.canManageReports,
      text: "Manage Reports",
      icon: <PieChart />,
    },
    {
      condition: role.canManageNotification,
      text: "Manage Notifications",
      icon: <BellPlus />,
    },
    {
      condition: role.canAttemptAssessment,
      text: "Attempt Assessments",
      icon: <Scroll />,
    },
    {
      condition: role.canViewReport,
      text: "View Reports",
      icon: <FilePieChart />,
    },
    {
      condition: role.canViewNotification,
      text: "Get Notifications",
      icon: <Bell />,
    },
    {
      condition: role.canManageMyAccount,
      text: "Manage My Account",
      icon: <User />,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-transparent">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`
          ${isMobile ? "w-[95%] max-w-[95%] rounded-lg" : "w-[800px]"}
          ${!isMobile ? "p-6 space-y-4" : ""}
        `}
      >
        <DialogHeader>
          <DialogTitle
            className={`
              ${isMobile ? "text-lg" : "text-xl"}
            `}
          >
            Delete Role
          </DialogTitle>
          <DialogDescription
            className={`
              ${isMobile ? "text-xs" : "text-sm"}
            `}
          >
            Are you sure you want to delete this Role? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <Card
          className={`
            ${isMobile ? "p-3" : "p-5"}
            flex flex-col gap-2
          `}
        >
          <CardTitle
            className={`
              ${isMobile ? "text-base" : "text-lg"}
            `}
          >
            Role: {role.name}
          </CardTitle>
          <CardDescription
            className={`
              ${isMobile ? "text-xs" : ""}
            `}
          >
            Permissions for this role:
          </CardDescription>

          <div
            className={`
              flex gap-2 flex-wrap
              ${isMobile ? "max-h-[200px] overflow-y-auto" : ""}
            `}
          >
            {permissionMap
              .filter((permission) => permission.condition)
              .map((permission, index) => (
                <RoleBadge
                  key={index}
                  text={permission.text}
                  icon={permission.icon}
                  className={`
                    ${isMobile ? "text-xs p-1" : ""}
                  `}
                />
              ))}
          </div>
        </Card>

        <DialogFooter>
          <div
            className={`
              flex
              ${isMobile ? "flex-col" : "flex-row"}
              w-full
              justify-between
              gap-2
            `}
          >
            <DialogClose asChild>
              <Button
                variant="outline"
                className={`
                  ${isMobile ? "w-full" : ""}
                  ${isMobile ? "text-xs h-8" : ""}
                `}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              variant="destructive"
              onClick={onSubmit}
              disabled={loading}
              className={`
                ${isMobile ? "w-full" : ""}
                ${isMobile ? "text-xs h-8" : ""}
                flex items-center
              `}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRoleDialog;
