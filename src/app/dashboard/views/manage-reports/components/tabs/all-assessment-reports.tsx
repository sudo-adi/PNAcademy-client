import React, { useState, useEffect } from "react";
import { useReportDataProviders } from "../../hooks/useReportsDataProvider";
import { assessmentReport } from "@/lib/types/reportTypes";
import { Loader } from "lucide-react";
import { AssessmentReportCard } from "../cards/assessment-report-card";

const AllAssessmentReportsTab = () => {
  const { fetchAllAssessmentsReportsData } = useReportDataProviders();

  // Initialize reportsData as an empty array
  const [reportsData, setReportsData] = useState<assessmentReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    } finally {
      setLoading(false);
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
        <main className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xxl:grid-cols-4 gap-2 p-2">
          {reportsData.length > 0 ? (
            reportsData.map((report) => (
              <AssessmentReportCard
                assessmentName={report.assessmentName}
                isPublished={false}
                assessmentId={""}
                totalParticipants={0}
                totalMarks={0}
                assessmentDate={report.assessmentDate}
                averageMarksPercentage={0}
                averageMarks={0}
              />
            ))
          ) : (
            <div>No reports available</div> // Optional: Display a message when there are no reports
          )}
        </main>
      )}
    </div>
  );
};

export default AllAssessmentReportsTab;
