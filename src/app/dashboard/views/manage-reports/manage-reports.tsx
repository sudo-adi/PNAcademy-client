import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllAssessmentReportsTab from "./components/tabs/all-assessment-reports";
import ReportsOverViewTab from "./components/tabs/overview-tab";
import ReportsByGroups from "./components/tabs/group-reports";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const ManageReports = () => {
  return (
    <Tabs defaultValue="0" className="w-full h-full">
      <div className="flex w-full items-start justify-between m-0">
        <TabsList className="grid max-w-[400px] grid-cols-3">
          <TabsTrigger value="0">OverView</TabsTrigger>
          <TabsTrigger value="1">All</TabsTrigger>
          <TabsTrigger value="2">Groups</TabsTrigger>
        </TabsList>
        <div className="flex">
          <div className="flex items-center space-x-2">
            <Input
              className=" w-[20rem]"
              type="text"
              placeholder="Search Report with assessment id or name..."
            />
            <Button
              type="submit"
              className="flex items-center justify-center  gap-1"
            >
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </div>
      <div className="flex w-full m-0 h-[calc(100vh-10rem)] overflow-auto rounded-md scrollbar-none">
        <TabsContent value="0" className="w-full">
          <ReportsOverViewTab
            reports={""}
            totalGroups={""}
            totalCandidates={""}
          />
        </TabsContent>
        <TabsContent value="1" className="w-full">
          <AllAssessmentReportsTab />
        </TabsContent>
        <TabsContent value="2">
          <ReportsByGroups />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ManageReports;
