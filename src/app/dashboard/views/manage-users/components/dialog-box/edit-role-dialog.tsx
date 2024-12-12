import React, { useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bell,
  BellPlus,
  Edit,
  FileCog,
  FilePen,
  FilePieChart,
  PieChart,
  User,
  UserCog,
  Users,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useRoles } from "../../hooks/useRoles";
import { RolePermissions, Role } from "@/lib/types/roleTypes";
import { useToast } from "@/components/ui/use-toast";

interface EditRoleDialogProps {
  refreshRoles: () => void;
  role: Role;
}

const EditRoleDialog: React.FC<EditRoleDialogProps> = ({
  refreshRoles,
  role,
}) => {
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Constants
  const managingPermissions = [
    {
      label: "Manage Assessments",
      icon: FileCog,
      permission: "canManageAssessment",
      description: "Create, update, and delete assessments.",
    },
    {
      label: "Manage Users",
      icon: UserCog,
      permission: "canManageUser",
      description: "Add, remove, and modify user accounts.",
    },
    {
      label: "Manage Roles",
      icon: FileCog,
      permission: "canManageRole",
      description: "Create, edit, or delete user roles.",
    },
    {
      label: "Manage Notifications",
      icon: BellPlus,
      permission: "canManageNotification",
      description: "Create and manage system notifications.",
    },
    {
      label: "Manage Reports",
      icon: PieChart,
      permission: "canManageReports",
      description: "Generate and manage performance reports.",
    },
    {
      label: "Manage Groups",
      icon: Users,
      permission: "canManageLocalGroup",
      description: "Create and manage system groups.",
    },
  ];

  const accessibilityPermissions = [
    {
      label: "Attempt Assessments",
      icon: FilePen,
      permission: "canAttemptAssessment",
      description: "Take and submit assessments.",
    },
    {
      label: "View Reports",
      icon: FilePieChart,
      permission: "canViewReport",
      description: "View generated reports and analytics.",
    },
    {
      label: "View Notifications",
      icon: Bell,
      permission: "canViewNotification",
      description: "View and manage notifications.",
    },
    {
      label: "Manage Account",
      icon: User,
      permission: "canManageMyAccount",
      description: "Manage personal account settings.",
    },
  ];

  const { patchRole } = useRoles();
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

  const [updatingRole, setUpdatingRole] = useState<boolean>(false);
  const [saveRoleDisable, setSaveRoleDisable] = useState<boolean>(false);

  const handleSaveRole = async () => {
    const payload = {
      name: roleName,
      roleId: role.id,
      permissions: permissions,
    };
    try {
      setUpdatingRole(true);
      await patchRole(payload);
      refreshRoles();
      toast({
        title: "Role Updated",
        description: "Role has been successfully updated.",
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update role.",
        variant: "destructive",
      });
    } finally {
      setUpdatingRole(false);
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
    const clearedPermissions = Object.keys(permissions).reduce(
      (acc, key) => ({
        ...acc,
        [key]: false,
      }),
      {} as RolePermissions
    );
    setPermissions(clearedPermissions);
  };

  useEffect(() => {
    setSaveRoleDisable(roleName === "");
  }, [roleName]);

  useEffect(() => {
    setPermissions(role);
    setRoleName(role.name);
  }, [role]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-transparent">
          <Edit className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`
          w-full
          ${
            isMobile
              ? "min-w-[95%] max-w-[95%] rounded-lg"
              : "min-w-[100px] max-w-[600px]"
          }
          min-h-[400px]
          max-h-[90vh]
          overflow-hidden
          overflow-y-auto
          scrollbar-thin
        `}
      >
        <DialogHeader>
          <DialogTitle
            className={`
              ${isMobile ? "text-lg font-semibold" : "text-xl font-semibold"}
            `}
          >
            Update Role
          </DialogTitle>
          <DialogDescription
            className={`
              ${isMobile ? "text-xs" : ""}
            `}
          >
            Assign permissions to the new role.
          </DialogDescription>
          <div className="py-2">
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
                ${isMobile ? "text-sm h-9" : ""}
              `}
            />
          </div>
        </DialogHeader>

        <Card
          className={`
    min-h-[100px]
    max-h-[300px]
    min-w-[100px]
    max-w-[800px]
    overflow-y-auto
    bg-transparent
    border
    border-muted
    scrollbar-thin
    ${isMobile ? "text-xs" : ""}
  `}
        >
          <CardContent className="p-1">
            {" "}
            {/* Reduced padding */}
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
                ${isMobile ? "h-12" : ""}  // Reduced row height
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
                        ${isMobile ? "text-xs" : ""}
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
                ${isMobile ? "h-12" : ""}  // Reduced row height
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
                        ${isMobile ? "text-xs" : ""}
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
                ${isMobile ? "gap-1" : "gap-2"}
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
              disabled={saveRoleDisable || updatingRole}
              variant="default"
              onClick={handleSaveRole}
              className={`
                w-full
                sm:w-auto
                ${isMobile ? "text-xs h-8" : ""}
              `}
            >
              {updatingRole ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditRoleDialog;
