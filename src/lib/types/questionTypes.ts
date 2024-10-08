import { Question } from "./assessmentTypes";

// Create Question types
export interface CreateQuestionProps {
  assessment_id: string;
  description: string;
  marks: number;
  section: number;
}

export interface Queestion {
  id: string;
  assessment_id: string;
  description: string;
  marks: number;
  section: number;
  updatedAt: string;
  createdAt: string;
}

export interface CreateQuestionResponse {
  message: string;
  data: Question;
}

// Get Question by ID types
export interface GetQuestionByIdProps {
  id: string;
}

export interface GetQuestionResponse {
  message: string;
  data: Question;
}

// Update Question types
export interface UpdateQuestionProps {
  id: string;
  description: string;
  marks: number;
}

export interface UpdateQuestionResponse {
  message: string;
  data: Question;
}

// Delete Question types
export interface DeleteQuestionProps {
  id: string;
}

export interface DeleteQuestionResponse {
  message: string;
  data: boolean;
}

// Add/Remove Tag to/from Question types
export interface AddTagToQuestionProps {
  questionId: string;
  tagId: string;
}

export interface AddTagToQuestionResponse {
  status: string;
}

export interface RemoveTagFromQuestionProps {
  questionId: string;
  tagId: string;
}

export interface RemoveTagFromQuestionResponse {
  status: string;
  message: string;
}
