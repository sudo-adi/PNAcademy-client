// interface for createOption props
export interface CreateOptionProps {
  question_id: string;
  description: string;
  is_correct: boolean;
}

export interface Option {
  id: string;
  question_id: string;
  description: string;
  is_correct: boolean;
  updatedAt: string;
  createdAt: string;
}

// interface for createOption response
export interface CreateOptionResponse {
  message: string;
  data: Option;
}

// interface for updateOption props
export interface UpdateOptionProps {
  id: string;
  description: string;
  is_correct: boolean;
}

// interface for updateOption response
export interface UpdateOptionResponse {
  message: string;
  data: Option;
}



// interface for deleteOption props
export interface DeleteOptionProps {
  id: string;
}

// interface for deleteOption response
export interface DeleteOptionResponse {
  message: string;
  data: boolean;
}
