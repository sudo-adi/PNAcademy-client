import React, { use, useEffect } from "react";
import { useUserInfo } from "./hooks/useUsersInfo";
import { Input } from "@/components/ui/input";
import { SingleUser } from "@/lib/types/userTypes";
import { ThemeColorToggle } from "@/components/common/theme-color-sitcher";

const Settings = () => {
  const { fetchUserInfo } = useUserInfo();
  const [userInfo, setUserInfo] = React.useState<SingleUser>({} as SingleUser);

  useEffect(() => {
    const initialize = async () => {
      try {
        const data = await fetchUserInfo();
        setUserInfo(data);
      } catch (err) {}
    };
    initialize();
  }, [fetchUserInfo]);

  return (
    <div
      className="flex flex-col flex-1 items-start justify-start rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex p-4 gap-4 flex-col">
        <div className="flex flex-row gap-4">
          <Input
            type="first_name"
            placeholder="Search User with email, id or name..."
            value={userInfo.first_name}
            disabled={true}
          />

          <Input
            type="last_name"
            placeholder="Search User with email, id or name..."
            value={userInfo.last_name}
            disabled={true}
          />
        </div>
        <div className="flex flex-row gap-4">
          <Input
            type="email"
            placeholder="Search User with email, id or name..."
            value={userInfo.email}
            disabled={true}
          />

          <Input
            type="phone"
            placeholder="Search User with email, id or name..."
            value={userInfo.phone}
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
