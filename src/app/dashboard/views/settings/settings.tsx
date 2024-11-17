import React, { useEffect, useState } from "react";
import { useUserInfo } from "./hooks/useUsersInfo";
import { Input } from "@/components/ui/input";
import { SingleUser } from "@/lib/types/userTypes";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useUsers } from "../manage-users/hooks/useUsers";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { ApiError } from "@/lib/api/apiError";
import { Label } from "@/components/ui/label";
const Settings = () => {
  const { fetchUserInfo } = useUserInfo();
  const { changePassword } = useUsers();
  const [userInfo, setUserInfo] = useState<SingleUser>({} as SingleUser);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  const initialize = async () => {
    try {
      const data = await fetchUserInfo();
      setUserInfo(data);
    } catch (err) {}
  };
  useEffect(() => {
    initialize();
  }, []);

  const handleResetPassword = async () => {
    setChangingPassword(true);
    try {
      await changePassword({
        password: newPassword,
      });
      toast({
        title: "Password Changed Successfully",
        action: <ToastAction altText="Goto schedule to undo">Ok</ToastAction>,
      });
    } catch (err) {
      if (err instanceof ApiError) {
        toast({
          title: "Failed to Change Password",
          description: err.message,
          action: <ToastAction altText="Goto schedule to undo">Ok</ToastAction>,
        });
      } else {
        toast({
          title: "Failed to Change Password",
          action: <ToastAction altText="Goto schedule to undo">Ok</ToastAction>,
        });
      }
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div
      className="flex flex-col flex-1 items-start justify-start rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex p-4 gap-4 flex-col w-[30rem]">
        <div className="flex flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              type="text"
              placeholder="First Name"
              value={userInfo.first_name}
              disabled={true}
            />
          </div>

          <div className="flex-1 space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              type="text"
              placeholder="Last Name"
              value={userInfo.last_name}
              disabled={true}
            />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              value={userInfo.email}
              disabled={true}
            />
          </div>

          <div className="flex-1 space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Phone Number"
              value={userInfo.phone}
              disabled={true}
            />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-row gap-4">
          <div className="relative flex-grow space-y-2">
            <Label htmlFor="new_password">New Password</Label>
            <div className="relative">
              <Input
                id="new_password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex items-end">
            <Button onClick={handleResetPassword} size={"sm"}>
              {changingPassword ? (
                <>
                  <Loader className="animate-spin mr-2" /> Resetting Password...
                </>
              ) : (
                <>Reset Password</>
              )}
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground px-2 max-w-lg">
          Note: Password must be at least 8 characters long and contain at least
          one uppercase letter, one lowercase letter, one number and one special
          character. e.g Password@123
        </p>
      </div>
    </div>
  );
};

export default Settings;
