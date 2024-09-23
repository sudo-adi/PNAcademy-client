export interface StartAssessmentAttemptProps {
  assessmentId: string;
}

export interface StartAssessmentAttemptResponse {
  status: 'success' | 'error';
  message: string;
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

export interface StartAssessmentSectionResponse {
  status: 'success' | 'error';
  message: string;
  questions?: AssessmentQuestion[];
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


