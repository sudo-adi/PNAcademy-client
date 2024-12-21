export interface Option {
  id: string;
  description: string;
  is_correct: boolean;
  is_selected: boolean;
}

export interface Question {
  id: string;
  description: string;
  marks: number;
  section: number;
  options: Option[];
}

export interface Section {
  questions: Question[];
  sectionNumber: number;
}

export interface AnswerKeyResponseData {
  sections: Question[][];
  totalPages: number;
}

export interface GetAnswerKeyResponse {
  status: string;
  data: AnswerKeyResponseData;
}

// Type for getting user responses for a specific assessment
export interface GetAnswerKeyProps {
  assessmentId: string;  // The unique identifier of the assessment
  userId?: string; // The unique identifier of the user
  page: number;         // The page number for pagination (optional)
  pageSize: number;     // The number of results per page (optional)
  order: "ASC" | "DESC"; // The order of results (ascending or descending) (optional)
}


export interface ExplainAnswerProps {
  questionId: string;
}

export interface ExplainAnswerResponse {
  status: string;
  data: {
    explanation: string;
  }
}
