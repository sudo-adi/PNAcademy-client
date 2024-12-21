// pages/manage-reports.tsx
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportsByGroups from "./components/tabs/group-reports";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { AssessmentResult, ReportsSingleGroup } from "@/lib/types/reportTypes";
import { useManageReports } from "./hooks/useManageReports";
import ReportsOverViewTab from "./components/tabs/overview-tab";
import AllAssessmentReportsTab from "./components/tabs/all-assessment-reports";

const ManageReports = () => {
  const { fetchAllReportGroups, fetchAssessmentResults } = useManageReports();

  // State for reports
  const [loading, setLoading] = useState<boolean>(true);
  const [reportsData, setReportsData] = useState<AssessmentResult[]>([]);

  // State for groups
  const [groups, setGroups] = useState<ReportsSingleGroup[]>([]);
  const [loadingGroups, setLoadingGroups] = useState<boolean>(true);

  // Fetch assessment reports
  const fetchData = async () => {
    const payload = {
      page: 1,
      pageSize: 10,
      sortBy: "name" as const,
      orderBy: "ASC" as const,
    };

    try {
      setLoading(true);
      const response = await fetchAssessmentResults(payload);
      console.log("Assessment Reports Response:", response);
      setReportsData(response);
    } catch (err) {
      console.error("Error fetching assessment reports:", err);
      setReportsData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch report groups
  const fetchGroups = async () => {
    const payload = {
      page: 1,
      pageSize: 9999,
      sortBy: "name" as const,
      order: "ASC" as const,
    };

    try {
      setLoadingGroups(true);
      const response = await fetchAllReportGroups(payload);
      console.log("Report Groups Response:", response);

      // Type-safe extraction of groups
      const fetchedGroups = Array.isArray(response)
        ? response
        : response ?? response ?? [];

      // Validate fetched groups
      if (!Array.isArray(fetchedGroups)) {
        console.error("Unexpected response structure:", response);
        setGroups([]);
        return;
      }

      setGroups(fetchedGroups);
    } catch (err) {
      console.error("Error fetching report groups:", err);
      setGroups([]);
    } finally {
      setLoadingGroups(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchGroups();
    fetchData();
  }, []);

  // Log groups and loading state changes
  useEffect(() => {
    console.log("Groups state:", {
      groups,
      groupsLength: groups.length,
      loadingGroups,
    });
  }, [groups, loadingGroups]);

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
              className="w-[20rem]"
              type="text"
              placeholder="Search Report with assessment id or name..."
            />
            <Button
              type="submit"
              className="flex items-center justify-center gap-1"
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
            loading={loading}
            reportsData={reportsData}
            loadingGroups={loadingGroups}
            groups={groups}
            refreshReports={fetchData}
          />
        </TabsContent>
        <TabsContent value="1" className="w-full">
          <AllAssessmentReportsTab
            loading={loading}
            reportsData={reportsData}
            refreshReports={fetchData}
          />
        </TabsContent>
        <TabsContent value="2" className="w-full">
          <ReportsByGroups groups={groups} loadingGroups={loadingGroups} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ManageReports;
