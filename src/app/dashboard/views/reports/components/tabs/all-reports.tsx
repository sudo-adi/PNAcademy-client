import React, { use, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useReports } from "../../hooks/useReports";
import { ResultCard } from "../cards/my-report-card";
import { toast } from "@/components/ui/use-toast";
import { MyAssessmentResult } from "@/lib/types/reportTypes";

const AllReports = () => {
  const { fetchMyResults } = useReports();

  // Initialize reportsData as an empty array
  const [reportsData, setReportsData] = useState<MyAssessmentResult[]>(
    [] as MyAssessmentResult[]
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    const payload = {
      page: 1,
      pageSize: 10,
      sortBy: "name" as "name",
      order: "ASC" as "ASC",
    };
    try {
      const response = await fetchMyResults(payload);
      setReportsData(response);
      console.log(response);
    } catch (err) {
      console.error("Error fetching assessment reports:", err);
      // Optionally, you could set an error state here to show an error message to the user
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <main className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-max">
        {loading && (
          <div className="col-span-full flex h-full w-full items-center justify-center">
            <Loader className="h-6 w-6 animate-spin" />
          </div>
        )}
        {!loading && reportsData.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No reports available
          </div>
        )}
        {!loading &&
          reportsData.length > 0 &&
          reportsData.map((report, index) => (
            <ResultCard
              key={index}
              correctAnswersCount={report.correct_answers_count}
              marksScored={report.marks_scored}
              correctPercentage={report.correct_percentage}
              wrongAnswersCount={report.wrong_answers_count}
              assessmentName={report.assessment.name}
              assessmentDescription={report.assessment.description}
              totalMarks={report.assessment.total_marks}
              assessmentId={report.assessment.id}
            />
          ))}
      </main>
    </div>
  );
};

export default AllReports;
