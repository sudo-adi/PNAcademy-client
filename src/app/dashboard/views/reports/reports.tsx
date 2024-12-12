import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllReports from "./components/tabs/all-reports";
import ReportsOverViewTab from "./components/tabs/reports-overview-tab";
const Reports = () => {
  return (
    <Tabs defaultValue="1" className="w-full h-full">
      <div className="flex w-full items-start justify-start">
        <TabsList className="grid max-w-[400px] grid-cols-2">
          <TabsTrigger value="0">OverView</TabsTrigger>
          <TabsTrigger value="1">All</TabsTrigger>
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
  );
};

export default Reports;
