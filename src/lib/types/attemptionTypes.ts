export interface StartAssessmentAttemptProps {
  assessmentId: string;
}

export interface StartAssessmentSectionProps {
  assessmentId: string;
  section: number;
}

export interface QuestionOption {
  id: string;
  description: string;
  question_id: string;
}

export interface AssessmentQuestion {
  id: string;
  description: string;
  marks: number;
  section: number;
  assessment_id: string;
  options: QuestionOption[];
}

// Define the request and resposnse types
export interface AttemptQuestionProps {
  assessmentId: string;
  questionId: string;
  selectedOptionId: string;
}

export interface AttemptQuestionResponse {
  status: 'success' | 'error';
  message: string;
}

// Define the request and response types
export interface EndSectionProps {
  assessmentId: string;
  section: number;
}

export interface EndSectionResponse {
  status: 'success' | 'error';
  message: string;
}

export interface EndAssessmentProps {
  assessmentId: string;
}

export interface EndAssessmentResponse {
  status: 'success' | 'error';
  message: string;
}


export interface GetAssessmentTimeDetailsProps {
  id: string;
}

export interface GetAssessmentTimeDetailsResponse {
  status: string;
  data: {
    duration: number;
    server_time: string;
    start_at: string;
  };
}

export interface AssessmentStartSectionStatus {
  section: number;
  status: "started" | "not-started" | "submitted";
}

export interface StartAssessmentAttemptResponse {
  status: string;
  message: string;
  sections: AssessmentStartSectionStatus[];
}


export interface AssignedAssessmentOption {
  id: string;
  description: string;
  question_id: string;
}

export interface AssignedAssessmentQuestion {
  id: string;
  description: string;
  marks: number;
  section: number;
  assessment_id: string;
  options: AssignedAssessmentOption[];
  selectedOptionId: string | null;
}

export interface StartAssessmentSectionResponse {
  status: string;
  message: string;
  questions: AssignedAssessmentQuestion[];
}
