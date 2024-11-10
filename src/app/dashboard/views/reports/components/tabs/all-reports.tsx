import React, { use, useEffect, useState } from "react";
import { useReports } from "../../hooks/useReports";
import ReportCard from "../cards/report-card";
import { Loader } from "lucide-react";
import { assessmentReport } from "@/lib/types/reportTypes";
import { useReportDataProviders } from "../../../manage-reports/hooks/useReportsDataProvider";

const AllReports = () => {
  const { fetchAllAssessmentsReportsData } = useReportDataProviders();

  // Initialize reportsData as an empty array
  const [reportsData, setReportsData] = useState<assessmentReport[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    const payload = {
      page: 1,
      pageSize: 10,
      sortBy: "name" as "name",
      orderBy: "ASC" as "ASC",
    };
    try {
      const response = await fetchAllAssessmentsReportsData(payload);
      setReportsData(response);
    } catch (err) {
      console.error("Error fetching assessment reports:", err);
      // Optionally, you could set an error state here to show an error message to the user
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex h-[calc(100vh-12rem)] overflow-y-auto scrollbar-thin">
      {loading && (
        <div className="flex h-full w-full items-center justify-center">
          <Loader className="h-6 w-6 animate-spin" />
        </div>
      )}

      {!loading && (
        <main className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-2 p-2">
          {reportsData.length > 0 ? (
            reportsData.map((report) => (
              <ReportCard key={report.assessmentId} {...report} />
            ))
          ) : (
            <div>No reports available</div> // Optional: Display a message when there are no reports
          )}
        </main>
      )}
    </div>
  );
};

export default AllReports;
