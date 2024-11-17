"use client";
import React, { useState, useCallback } from "react";
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
import { Trash2, Loader2, Asterisk, EyeOff, Eye } from "lucide-react";
import { useUsers } from "../../hooks/useUsers";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { ApiError } from "@/lib/api/apiError";

interface ChangeUserPasswordDialogProps {
  refreshUsers: () => void;
  user: any;
}

const ChangeUserPasswordDialog: React.FC<ChangeUserPasswordDialogProps> = ({
  refreshUsers,
  user,
}) => {
  const { changePassword } = useUsers();
  const [newPassword, setNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = useCallback(async () => {
    setChangingPassword(true);
    try {
      console.log(user);
      const response = await changePassword({
        userId: user.id,
        password: newPassword,
      });
      console.log(response);
      toast({
        title: `Password changed successfully for ${user.first_name} ${user.last_name}`,
        action: <ToastAction altText="Goto schedule to undo">Ok</ToastAction>,
      });
    } catch (err) {
      if (err instanceof ApiError) {
        toast({
          title: `Error changing password for ${user.first_name} ${user.last_name}`,
          description: err.message,
          action: <ToastAction altText="Goto schedule to undo">Ok</ToastAction>,
        });
      } else {
        toast({
          title: `Error changing password for ${user.first_name} ${user.last_name}`,
          description: "An unexpected error occurred",
          action: <ToastAction altText="Goto schedule to undo">Ok</ToastAction>,
        });
      }
    } finally {
      setChangingPassword(false);
      refreshUsers();
    }
  }, [changePassword, user.id]);

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-transparent">
            <Asterisk className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[400px]">
          <DialogHeader>
            <DialogTitle>
              Change Password for {user.first_name} {user.last_name}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="relative flex-grow">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground px-2">
            Note: Password must be at least 8 characters long and contain at
            least one uppercase letter, one lowercase letter, one number and one
            special character. e.g Password@123
          </p>
          <DialogFooter>
            <div className="flex w-full flex-row justify-between">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={onSubmit} disabled={changingPassword}>
                {changingPassword ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Dialog */}
    </>
  );
};

export default ChangeUserPasswordDialog;
