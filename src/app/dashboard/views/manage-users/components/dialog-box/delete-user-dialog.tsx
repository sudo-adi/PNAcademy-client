"use client";
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Loader2 } from "lucide-react";
import { useUsers } from "../../hooks/useUsers";
import { DeleteUsersDialogProps } from "@/lib/types/userTypes";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const DeleteUserDialog: React.FC<DeleteUsersDialogProps> = ({
  refreshUsers,
  user,
}) => {
  const { removeUsers } = useUsers();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const onSubmit = useCallback(async () => {
    setLoading(true);
    try {
      await removeUsers({ userIds: [user.id] });
    } catch (err) {
      console.error("Error deleting user:", err);
    } finally {
      setLoading(false);
      refreshUsers();
      toast({
        title: `Role ${user.first_name} ${user.last_name} deleted successfully`,
        action: <ToastAction altText="Goto schedule to undo">Ok</ToastAction>,
      });
    }
  }, [removeUsers, user.id]);

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-transparent">
            <Trash2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={onSubmit} disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </Button>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Dialog */}
    </>
  );
};

export default DeleteUserDialog;
