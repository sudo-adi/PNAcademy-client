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
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <Tabs defaultValue="1" className="w-full h-full p-2 ">
        <div className="flex w-full p-2 items-start justify-between">
          <TabsList className="grid max-w-[600px] grid-cols-3">
            <TabsTrigger value="0">OverView</TabsTrigger>
            <TabsTrigger value="1">All Assessments</TabsTrigger>
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
        <div className="flex w-full">
          <TabsContent value="0" className="w-full">
            <ReportsOverViewTab />
          </TabsContent>
          <TabsContent value="1" className="w-full">
            <AllAssessmentReportsTab />
          </TabsContent>
          <TabsContent value="2">
            <ReportsByGroups />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ManageReports;
