import React, { act, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import UsersTabContent from "./components/tab-content/users-tab-content";
import RolesTabContent from "./components/tab-content/roles-tab-content";
import useTabStore from "@/lib/stores/manage-users-store/tab-store";

const ManageUsers = () => {
  const { activeTabIndex, setActiveTabIndex } = useTabStore();
  useEffect(() => {
    activeTabIndex === 0
      ? setActiveTabIndex(0)
      : activeTabIndex === 1
      ? setActiveTabIndex(1)
      : setActiveTabIndex(0);
  }, [setActiveTabIndex]);
  return (
    <>
      <Tabs defaultValue={activeTabIndex.toString()} className="w-full ">
        <div className="flex justify-between items-center flex-row w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="0" onClick={() => setActiveTabIndex(0)}>
              Users
            </TabsTrigger>
            <TabsTrigger value="1" onClick={() => setActiveTabIndex(1)}>
              Roles
            </TabsTrigger>
          </TabsList>
          {/* <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="email"
              placeholder="Search User with email, id or name..."
            />
            <Button
              type="submit"
              className="flex items-center justify-center  gap-1"
            >
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div> */}
        </div>
        <TabsContent value="0">
          <UsersTabContent />
        </TabsContent>
        <TabsContent value="1">
          <RolesTabContent />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ManageUsers;
