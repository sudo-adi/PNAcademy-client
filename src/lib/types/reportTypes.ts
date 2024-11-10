export interface GetMyResultsProps {
  page: number;
  pageSize: number;
  sortBy: "name" | "correct_answer_count" | "marks_scored" | "correct_percentage" | "wrong_answer_count" ;
  order: 'ASC' | 'DESC';
}
export interface MyAssessmentResult {
  correct_answers_count: number;
  marks_scored: number;
  correct_percentage: number;
  wrong_answers_count: number;
  assessment: {
    name: string;
    description: string;
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

export interface assessmentReport {
  assessmentName: string;
  assessmentId: string;
  assessmentDate: string;
  totalParticipants: number;
  totalMarks: number;
  averageMarks: number;
  averageMarksPercentage: number;
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