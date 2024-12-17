import { Loader } from "lucide-react";
import { AssessmentReportCard } from "../cards/assessment-report-card";
import { useEffect } from "react";
import { AssessmentResult } from "@/lib/types/reportTypes";

interface AllAssessmentReportsTabProps {
  loading: boolean;
  reportsData: AssessmentResult[];
}

const AllAssessmentReportsTab: React.FC<AllAssessmentReportsTabProps> = ({
  loading,
  reportsData,
}) => {
  useEffect(() => {
    reportsData && console.log(reportsData);
  }, [reportsData, loading]);

  return (
    <div className="flex h-[calc(100vh-12rem)] w-full overflow-y-auto scrollbar-thin">
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xxl:grid-cols-4 gap-2 p-2">
          {reportsData && reportsData.length > 0 ? (
            reportsData.map((report) => (
              <AssessmentReportCard
                key={report.assessment_id}
                assessmentName={report.assessment.name || ""}
                isPublished={report.is_published || false} // Example: dynamically assign
                assessmentId={report.assessment_id || ""}
                totalParticipants={report.total_participants || 0}
                totalMarks={report.total_marks || 0}
                assessmentDate={report.createdAt || ""}
                averageMarksPercentage={report.average_marks_percentage || 0}
                averageMarks={report.average_marks || 0}
              />
            ))
          ) : (
            <div className="flex w-full items-center justify-center text-gray-500">
              No reports available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllAssessmentReportsTab;
