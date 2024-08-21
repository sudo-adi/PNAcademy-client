// Create Question types
export interface CreateQuestionProps {
  assessment_id: string;
  description: string;
  marks: number;
  section: number;
}

export interface CreateQuestionResponse {
  message: string;
  data: {
    id: string;
    assessment_id: string;
    description: string;
    marks: number;
    section: number;
    updatedAt: string;
    createdAt: string;
  };
}

// Get Question by ID types
export interface GetQuestionByIdProps {
  id: string;
}

export interface GetQuestionResponse {
  message: string;
  data: {
    id: string;
    assessment_id: string;
    description: string;
    marks: number;
    section: number;
    updatedAt: string;
    createdAt: string;
  };
}

// Update Question types
export interface UpdateQuestionProps {
  id: string;
  description: string;
  marks: number;
}

export interface UpdateQuestionResponse {
  message: string;
  data: {
    id: string;
    assessment_id: string;
    description: string;
    marks: number;
    section: number;
    createdAt: string;
    updatedAt: string;
  };
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
