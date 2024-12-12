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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bell,
  BellPlus,
  FileCog,
  FilePen,
  FilePieChart,
  Loader2,
  PieChart,
  Plus,
  ScrollText,
  User,
  UserCog,
  Users,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useRoles } from "../../hooks/useRoles";
import { RolePermissions } from "@/lib/types/roleTypes";
import { ApiError } from "@/lib/api/apiError";
import { toast } from "@/components/ui/use-toast";

interface CreateRoleDialogProps {
  refreshRoles: () => void;
}

const CreateRoleDialog: React.FC<CreateRoleDialogProps> = ({
  refreshRoles,
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

  // constants here
  const managingPermissions = [
    {
      label: "Manage Assessments",
      icon: FileCog,
      permission: "canManageAssessment",
      description:
        "Allows the user to create, update, and delete assessments, as well as manage assessment-related settings.",
    },
    {
      label: "Manage Users",
      icon: UserCog,
      permission: "canManageUser",
      description:
        "Grants the user the ability to add, remove, and modify user accounts and their related settings.",
    },
    {
      label: "Manage Roles",
      icon: FileCog,
      permission: "canManageRole",
      description:
        "Enables the user to create, edit, or delete user roles and assign different permissions to them.",
    },
    {
      label: "Manage Notifications",
      icon: BellPlus,
      permission: "canManageNotification",
      description:
        "Allows the user to create and manage notifications for all users within the system.",
    },
    {
      label: "Manage Reports",
      icon: PieChart,
      permission: "canManageReports",
      description:
        "Provides the user access to generate, modify, and manage reports related to user activities, assessments, and performance.",
    },
    {
      label: "Manage Groups",
      icon: Users,
      permission: "canManageLocalGroup",
      description:
        "Grants the ability to create and manage groups or teams within the system, including adding or removing group members.",
    },
  ];

  const accessibilityPermissions = [
    {
      label: "Attempt Assessments",
      icon: FilePen,
      permission: "canAttemptAssessment",
      description: "Allows users to take and submit assessments.",
    },
    {
      label: "View Reports",
      icon: FilePieChart,
      permission: "canViewReport",
      description: "Allows users to view generated reports and analytics.",
    },
    {
      label: "View Notifications",
      icon: Bell,
      permission: "canViewNotification",
      description: "Allows users to view and manage notifications.",
    },
    {
      label: "Manage Account",
      icon: User,
      permission: "canManageMyAccount",
      description: "Allows users to manage their personal account settings.",
    },
  ];

  // all hooks here
  const { addRole } = useRoles();

  // local state here
  const [roleName, setRoleName] = useState<string>("");
  const [permissions, setPermissions] = useState<RolePermissions>({
    canManageAssessment: false,
    canManageUser: false,
    canManageRole: false,
    canManageNotification: false,
    canManageLocalGroup: false,
    canManageReports: false,
    canAttemptAssessment: false,
    canViewReport: false,
    canManageMyAccount: false,
    canViewNotification: false,
  });

  // loading states
  const [creatingRole, setCreatingRole] = useState<boolean>(false);

  // disable states
  const [createRoleDisable, setCreteRoleDisable] = useState<boolean>(false);

  // handlers here
  const handleCreateRole = async () => {
    try {
      setCreatingRole(true);
      await addRole({ name: roleName, permissions });
      // Success toast
      toast({
        title: "Role Created Successfully",
        description: `Role "${roleName}" has been created.`,
        variant: "default",
        duration: 5000,
      });

      // Reset form
      setRoleName("");
      setPermissions({
        canManageAssessment: false,
        canManageUser: false,
        canManageRole: false,
        canManageNotification: false,
        canManageLocalGroup: false,
        canManageReports: false,
        canAttemptAssessment: false,
        canViewReport: false,
        canManageMyAccount: false,
        canViewNotification: false,
      });

      refreshRoles();
    } catch (err) {
      // Error toast
      toast({
        title: "Error Creating Role",
        description:
          err instanceof ApiError
            ? err.message
            : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setCreatingRole(false);
    }
  };

  const handlePermissionChange = (
    permission: keyof RolePermissions,
    value: boolean
  ) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [permission]: value,
    }));
  };

  const handleClearSelections = () => {
    setPermissions({
      canManageAssessment: false,
      canManageUser: false,
      canManageRole: false,
      canManageNotification: false,
      canManageLocalGroup: false,
      canManageReports: false,
      canAttemptAssessment: false,
      canViewReport: false,
      canManageMyAccount: false,
      canViewNotification: false,
    });
  };

  // useEffects here
  useEffect(() => {
    if (roleName.length < 3) {
      setCreteRoleDisable(true);
    } else {
      setCreteRoleDisable(false);
    }
  }, [roleName]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className={`
            flex items-center gap-2
          `}
            size="sm"
          >
            <ScrollText className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
            Create Role
          </Button>
        </DialogTrigger>
        <DialogContent
          className={`
          w-full
          ${
            isMobile
              ? "min-w-[95%] max-w-[95%] rounded-lg"
              : "min-w-[600px] max-w-[800px]"
          }
          min-h-[400px]
          max-h-[90vh]
          overflow-hidden
          overflow-y-auto
          scrollbar-thin
          ${!isMobile ? "p-6 space-y-4" : ""}
        `}
        >
          <DialogHeader>
            <DialogTitle
              className={`
              ${isMobile ? "text-lg font-semibold" : "text-xl font-semibold"}
            `}
            >
              Create a New Role
            </DialogTitle>
            <DialogDescription
              className={`
              ${isMobile ? "text-xs" : "text-sm"}
            `}
            >
              Assign permissions to the new role.
            </DialogDescription>
            <div className={`py-2 ${!isMobile ? "space-y-2" : ""}`}>
              <Label
                htmlFor="name"
                className={`
                ml-1
                ${isMobile ? "text-sm" : ""}
              `}
              >
                Role Name
              </Label>
              <Input
                id="name"
                type="text"
                value={roleName}
                placeholder="e.g. student..."
                onChange={(e) => setRoleName(e.target.value)}
                required
                className={`
                mt-2
                ${isMobile ? "text-sm h-9" : "h-10"}
              `}
              />
            </div>
          </DialogHeader>

          <Card
            className={`
            min-h-[100px]
            max-h-[500px]
            min-w-[100px]
            max-w-[800px]
            overflow-y-auto
            bg-transparent
            border
            border-muted
            scrollbar-thin
            ${isMobile ? "text-xs max-h-[300px]" : ""}
            ${!isMobile ? "p-2" : ""}
          `}
          >
            <CardContent className="p-1">
              <Table className="w-full">
                {/* Managing Permissions Section */}
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className={`
                        ${isMobile ? "text-xs p-1" : "p-2"}
                      `}
                    >
                      Managing Permissions
                    </TableHead>
                    <TableHead
                      className={`
                        text-right
                        ${isMobile ? "text-xs p-1" : "p-2"}
                      `}
                    >
                      Toggle
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {managingPermissions.map(
                    ({ label, icon: Icon, permission, description }) => (
                      <TableRow
                        key={permission}
                        className={`
                          hover:bg-transparent
                          ${isMobile ? "h-12" : ""}
                        `}
                      >
                        <TableCell
                          className={`
                            p-1
                            ${isMobile ? "py-1 px-2" : "p-2"}
                          `}
                        >
                          <div className="flex items-start justify-center flex-col">
                            <div className="flex flex-row gap-1 items-center">
                              <Icon
                                className={`
                                  ${isMobile ? "h-3 w-3 mr-1" : "h-4 w-4"}
                                `}
                              />
                              <span
                                className={`
                                  font-medium
                                  ${isMobile ? "text-xs" : "p-2"}
                                `}
                              >
                                {label}
                              </span>
                            </div>
                            <div
                              className={`
                                text-muted-foreground
                                ${isMobile ? "text-[10px] leading-tight" : ""}
                              `}
                            >
                              {description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell
                          className={`
                            text-right
                            ${isMobile ? "p-1" : "p-2"}
                          `}
                        >
                          <Switch
                            checked={
                              permissions[permission as keyof RolePermissions]
                            }
                            onCheckedChange={(value) =>
                              handlePermissionChange(
                                permission as keyof RolePermissions,
                                value
                              )
                            }
                          />
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>

                {/* Accessibility Permissions Section */}
                <TableHeader className="border-t">
                  <TableRow>
                    <TableHead
                      className={`
                        ${isMobile ? "text-xs p-1" : "p-2"}
                      `}
                    >
                      Accessibility Permissions
                    </TableHead>
                    <TableHead
                      className={`
                        text-right
                        ${isMobile ? "text-xs p-1" : "p-2"}
                      `}
                    >
                      Toggle
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessibilityPermissions.map(
                    ({ label, icon: Icon, permission, description }) => (
                      <TableRow
                        key={permission}
                        className={`
                          hover:bg-transparent
                          ${isMobile ? "h-12" : ""}
                        `}
                      >
                        <TableCell
                          className={`
                            p-1
                            ${isMobile ? "py-1 px-2" : "p-2"}
                          `}
                        >
                          <div className="flex items-start justify-center flex-col">
                            <div className="flex flex-row gap-1 items-center">
                              <Icon
                                className={`
                                  ${isMobile ? "h-3 w-3 mr-1" : "h-4 w-4"}
                                `}
                              />
                              <span
                                className={`
                                  font-medium
                                  ${isMobile ? "text-xs" : "p-2"}
                                `}
                              >
                                {label}
                              </span>
                            </div>
                            <div
                              className={`
                                text-muted-foreground
                                ${isMobile ? "text-[10px] leading-tight" : ""}
                              `}
                            >
                              {description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell
                          className={`
                            text-right
                            ${isMobile ? "p-1" : "p-2"}
                          `}
                        >
                          <Switch
                            checked={
                              permissions[permission as keyof RolePermissions]
                            }
                            onCheckedChange={(value) =>
                              handlePermissionChange(
                                permission as keyof RolePermissions,
                                value
                              )
                            }
                          />
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <DialogFooter className="sm:justify-end">
            <div
              className={`
              w-full
              flex
              flex-col
              sm:flex-row
              justify-between
              ${isMobile ? "gap-2" : "gap-4"}
            `}
            >
              <div
                className={`
                flex
                flex-col
                sm:flex-row
                ${isMobile ? "gap-1" : "gap-3"}
                sm:w-auto
                w-full
              `}
              >
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className={`
                    w-full
                    sm:w-auto
                    ${isMobile ? "text-xs h-8" : ""}
                  `}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  variant="outline"
                  onClick={() => handleClearSelections()}
                  className={`
                  w-full
                  sm:w-auto
                  ${isMobile ? "text-xs h-8 hidden" : ""}
                `}
                >
                  Clear Selection
                </Button>
              </div>
              <Button
                disabled={createRoleDisable || creatingRole}
                variant="default"
                onClick={handleCreateRole}
                className={`
                w-full
                sm:w-auto
                ${isMobile ? "text-xs h-8" : ""}
              `}
              >
                {creatingRole ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" /> Create Role
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateRoleDialog;
