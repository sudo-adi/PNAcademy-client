export interface GetMyResultsProps {
  page: number;
  pageSize: number;
  sortBy: "name" | "correct_answer_count" | "marks_scored" | "correct_percentage" | "wrong_answer_count";
  order: 'ASC' | 'DESC';
}
export interface MyAssessmentResult {
  correct_answers_count: number;
  marks_scored: number;
  correct_percentage: number;
  wrong_answers_count: number;
  assessment: {
    id: string;
    name: string;
    description: string;
    total_marks: number;
  };
}

export interface GetMyResultsData {
  results: MyAssessmentResult[];
  totalPages: number;
}

export interface GetMyResultsResponse {
  status: 'success' | 'error';
  data: GetMyResultsData;
}

// Interface for request parameters
export interface GetAssessmentResultsProps {
  page: number;
  pageSize: number;
  sortBy?: 'name'
  | 'total_marks'
  | 'average_marks'
  | 'createdAt'
  | 'updatedAt'
  | 'total_participants'
  | 'average_marks_percentage'
  | 'is_published'
  | 'assessment_id';
  order?: 'ASC' | 'DESC';
}

// Interface for assessment object in response
export interface Assessment {
  name: string;
}

// Interface for each result entry in the results array
export interface AssessmentResult {
  assessment_id: string;
  total_marks: number;
  total_participants: number;
  average_marks: number;
  average_marks_percentage: number;
  is_published: boolean;
  createdAt: string;
  updatedAt: string;
  assessment: Assessment;
}

// Interface for the response data
export interface GetAssessmentResultsResponse {
  status: 'success' | 'error';
  data: {
    results: AssessmentResult[];
    totalPages: number;
  };
  message?: string;
}


// Interface for the assessment details within the response
export interface AssessmentAnalyticsInfo {
  name: string;
  description: string;
}

// Interface for the main assessment analytics data
export interface AssessmentAnalyticsData {
  assessment_id: string;
  total_marks: number;
  total_participants: number;
  average_marks: number;
  average_marks_percentage: number;
  is_published: boolean;
  createdAt: string;
  updatedAt: string;
  assessment: AssessmentAnalyticsInfo;
}

// Interface for the successful response of the assessment analytics API
export interface GetAssessmentAnalyticsResponseSuccess {
  status: 'success';
  data: AssessmentAnalyticsData;
}

// Interface for the error response of the assessment analytics API
export interface GetAssessmentAnalyticsResponseError {
  status: 'error';
  message: string;
}

// Union type for either a success or error response
export type GetAssessmentAnalyticsResponse =
  | GetAssessmentAnalyticsResponseSuccess
  | GetAssessmentAnalyticsResponseError;



// Define the props for the request
export interface GetAnalyticsChartProps {
  metric: string;
  start_date: string;
  end_date: string;
}

// Define the response type for a successful request
export interface GetAnalyticsChartResponse {
  status: string;
  data: Array<{
    createdAt: string;
    metricValue: number;
  }>;
}

// Define the response type for an error
export interface GetAnalyticsChartErrorResponse {
  status: string;
  message: string;
}






export interface KeyMetrics {
  totalParticipants: number;
  totalMarks: number;
  averageMarks: number;
  averageMarksPercentage: number;
}

export interface UsersAttemptedVsUsersUnAttempted {
  usersAttempted: number;
  usersUnAttempted: number;
}

export interface AvgPercentage {
  avgPercentage: number;
}

export interface ScoreDistribution {
  [key: string]: number; // Allows for dynamic keys like "0-20", "20-40", etc.
}

export interface EachGroupAvgScore {
  [key: string]: number; // Allows for dynamic group names like group1, group2, etc.
}

export interface UsersAttemptedFromEachGroupPercentage {
  [key: string]: number; // Allows for dynamic group names like group1, group2, etc.
}



export interface singleUserReport {
  username: string;
  email: string;
  group: string;
  correctAnswers: number;
  wrongAnswers: number;
  totalScore: number;
  percentage: number;
}




// Type for getting user assessment responses
export interface GetAssessmentResponsesProps {
  assessmentId: string;  // The unique identifier of the assessment
  userId: string;        // The unique identifier of the user
  page?: number;         // The page number for pagination (optional)
  pageSize?: number;     // The number of results per page (optional)
  order?: "ASC" | "DESC"; // The order of results (ascending or descending) (optional)
}

// Type for the response of getting user assessment responses
export interface GetAssessmentResponsesResponse {
  status: "success" | "error";
  data: {
    sections: Array<{
      id: string;
      description: string;
      marks: number;
      section: number;
      options: Array<{
        id: string;
        description: string;
        is_correct: boolean;
        is_selected: boolean;
      }>;
    }>;
    totalPages: number;
  };
}

// Type for getting user responses for a specific assessment
export interface GetMyResponsesProps {
  assessmentId: string;  // The unique identifier of the assessment
  page?: number;         // The page number for pagination (optional)
  pageSize?: number;     // The number of results per page (optional)
  order?: "ASC" | "DESC"; // The order of results (ascending or descending) (optional)
}

// Type for the response of getting user responses for a specific assessment
export interface GetMyResponsesResponse {
  status: "success" | "error";
  data: {
    sections: Array<{
      id: string;
      description: string;
      marks: number;
      section: number;
      options: Array<{
        id: string;
        description: string;
        is_correct: boolean;
        is_selected: boolean;
      }>;
    }>;
    totalPages: number;
  };
}


export interface ReportUser {
  first_name: string;
  last_name: string;
  email: string;
}

export interface AllUserReportResult {
  user_id: string;
  correct_answers_count: number;
  marks_scored: number;
  correct_percentage: number;
  wrong_answers_count: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  user: ReportUser;
}

export interface ReportData {
  results: AllUserReportResult[];
  totalPages: number;
}

export interface GetReportsByAssessmentIdResponse {
  status: string; // e.g., "success" or "error"
  data: ReportData;
}


// Parameters for the GET request
export interface GetReportsByAssessmentIdProps {
  assessmentId: string; // Path parameter
  page?: number; // Query parameter
  pageSize?: number; // Query parameter
  sortBy?: 'user_id' | 'first_name' | 'last_name' | 'email' | 'correct_answers_count' | 'marks_scored' | 'correct_percentage' | 'wrong_answers_count' | 'createdAt' | 'updatedAt'; // Query parameter
  order?: 'ASC' | 'DESC'; // Query parameter
}




export interface GetAllReportGroupsResponse {
  data: GetAllReportGroupsData;
  status: string;
}


export interface GetAllReportGroupsData {
  groups: ReportsSingleGroup[];
  totalPages: number;
}

export interface ReportsSingleGroup {
  group_id: string;
  total_assessments: string;
  group_name: string;
  total_users: string;

}

// Interface for parameters
export interface GetAllReportsByGroupProps {
  groupId: string;
  page?: number;
  pageSize?: number;
  sortBy?: 'createdAt' | 'total_marks' | 'average_marks';
  order?: 'ASC' | 'DESC';
}

// Main Response Interface
export interface GetReportsByGroupResponse {
  status: 'success' | 'error';
  data?: GroupReportData;
  message?: string;
}

// Sub-interface for Group Report Data
export interface GroupReportData {
  results: Array<GroupReportResult>;
  totalPages: number;
}

// Sub-interface for Individual Report Result
export interface GroupReportResult {
  id: string;
  assessment_id: string;
  total_marks: number;
  total_participants: number;
  average_marks: number;
  average_marks_percentage: number;
  is_published: boolean;
  createdAt: string;
  updatedAt: string;
  assessment: AssessmentDetails;
}

// Sub-interface for Assessment Details
interface AssessmentDetails {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  duration: number;
}



export interface publishReportsProps {
  assessmentId: string;
  publish: boolean;
}


export interface publishReportsResponse {
  status: string;
}