import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllReports from "./components/tabs/all-reports";
import ReportsOverViewTab from "./components/tabs/reports-overview-tab";
const Reports = () => {
  return (
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <Tabs defaultValue="1" className="w-full h-full p-2">
        <div className="flex w-full p-2 items-start justify-start">
          <TabsList className="grid max-w-[600px] grid-cols-2">
            <TabsTrigger value="0">OverView</TabsTrigger>
            <TabsTrigger value="1">All Reports</TabsTrigger>
          </TabsList>
        </div>
        <div className="flex w-full">
          <TabsContent value="0" className="w-full">
            <ReportsOverViewTab />
          </TabsContent>
          <TabsContent value="1" className="w-full">
            <AllReports />
          </TabsContent>
          <TabsContent value="2"></TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Reports;
