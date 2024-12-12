import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollText, Search, User } from "lucide-react";
import RolesTabContent from "./components/tab-content/roles-tab-content";
import useTabStore from "@/lib/stores/manage-users-store/tab-store";
import UsersTabContent from "./components/tab-content/users-tab-content";

const ManageUsers = () => {
  const { activeTabIndex, setActiveTabIndex } = useTabStore();

  useEffect(() => {
    // Ensure active tab is always 0 or 1
    setActiveTabIndex(
      activeTabIndex === 0 || activeTabIndex === 1 ? activeTabIndex : 0
    );
  }, [activeTabIndex, setActiveTabIndex]);

  const SearchComponent = () => (
    <div className="flex w-full max-w-lg items-center space-x-2">
      <Input
        type="text"
        className="w-full sm:w-full"
        placeholder="Search User with email, id or name..."
      />
      <Button type="submit" size={"sm"}>
        <Search className="h-4 w-4 mr-1" />
        Search
      </Button>
    </div>
  );

  return (
    <Tabs
      value={activeTabIndex.toString()}
      onValueChange={(value) => setActiveTabIndex(Number(value))}
      className="w-full"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
        <TabsList className="grid grid-cols-2 sm:mb-0 w-full sm:w-auto">
          <TabsTrigger value="0">
            <User className="h-4 w-4 mr-2" /> Users
          </TabsTrigger>
          <TabsTrigger value="1">
            <ScrollText className="h-4 w-4 mr-2" /> Roles
          </TabsTrigger>
        </TabsList>
        {activeTabIndex === 0 && <SearchComponent />}
      </div>

      <TabsContent value="0" className="mt-1">
        <UsersTabContent />
      </TabsContent>
      <TabsContent value="1" className="mt-1">
        <RolesTabContent />
      </TabsContent>
    </Tabs>
  );
};

export default ManageUsers;
