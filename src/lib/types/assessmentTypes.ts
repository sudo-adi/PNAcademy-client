// interface for createAssessment props
export interface CreateAssessmentProps {
  name: string;
  description?: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  duration: number;
  created_by: string;
}

// interface for createAssessment response
export interface CreateAssessmentResponse {
  data: AssessmentResponse;
  message: string;
}

export interface GetAssessmentByIdProps {
  id: string;
}


export interface GetAssessmentsResponse {
  message: string;
  data: {
    assesments: Assessment[];
    totalPages: number;
  };
}

export interface GetAssessmentsProps {
  page: number;
  pageSize: number;
  sortBy: "id" | "name" | "description" | "is_active" | "start_at" | "end_at" | "duration" | "created_by" | "createdAt" | "updatedAt";
  order: 'ASC' | 'DESC';
}

// interface for Assessment (sub part of getAssessment response)
export interface Assessment {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  duration: number;
  created_by: string;
  createdAt: string;
  updatedAt: string;
}


export interface GetAssessmentsProps {
  page: number;
  pageSize: number;
  sortBy: "id" | "name" | "description" | "is_active" | "start_at" | "end_at" | "duration" | "created_by" | "createdAt" | "updatedAt";
  order: 'ASC' | 'DESC';
}

// interface for Assessment (sub part of getAssessment response)
export interface Assessment {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  duration: number;
  created_by: string;
  createdAt: string;
  updatedAt: string;
}


// interface for updateAssessments props
export interface UpdateAssessmentProps {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  duration: number;
}

// interface for updateAssessments response
export interface UpdateAssessmentResponse {
  message: string;
  data: {
    id: string;
    name: string;
    description: string;
    is_active: boolean;
    start_at: string;
    end_at: string;
    duration: number;
    created_by: string;
    createdAt: string;
    updatedAt: string;
  };
}


export interface DeleteAssessmentProps {
  id: string;
}

//  interface for deleteAssessment response
export interface DeleteAssessmentResponse {
  message: string;
  data: boolean;
}
// interface for addGroupToAssessment props
export interface AddGroupToAssessmentProps {
  assessmentId: string;
  groupId: string;
}

// interface for addGroupToAssessment response
export interface AddGroupToAssessmentResponse {
  status: string;
}



export interface AssignedAssessment {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  isSubmitted: boolean;
  duration: number;
  created_by: string;
  createdAt: string;
  updatedAt: string;
}


// interface for getAssignedAssessments Data
export interface GetAssignedAssessmentsData {
  assessments: AssignedAssessment[];
  totalPages: number;
}

// interface for getAssignedAssessments response
export interface GetAssignedAssessmentsResponse {
  message: string;
  data: GetAssignedAssessmentsData;
}

// interface for getAssignedAssessments props
export interface GetAssignedAssessmentsProps {
  page: number;
  pageSize: number;
  sortBy: "id" | "name" | "description" | "is_active" | "start_at" | "end_at" | "duration" | "created_by" | "createdAt" | "updatedAt";
  order: "ASC" | "DESC";
}

// Function to Remove Group from Assessment
export interface RemoveGroupFromAssessmentProps {
  assessmentId: string;
  groupId: string;
}


export interface RemoveGroupFromAssessmentResponse {
  status: string;
  message: string;
}


// interface for getAssignedAssessments Data
export interface GetAssignedAssessmentsData {
  assessments: AssignedAssessment[];
  totalPages: number;
}

// interface for getAssignedAssessments response
export interface GetAssignedAssessmentsResponse {
  message: string;
  data: GetAssignedAssessmentsData;
}

// interface for getAssignedAssessments props
export interface GetAssignedAssessmentsProps {
  page: number;
  pageSize: number;
  sortBy: "id" | "name" | "description" | "is_active" | "start_at" | "end_at" | "duration" | "created_by" | "createdAt" | "updatedAt";
  order: "ASC" | "DESC";
}


// interface for deleteAssessment props
export interface DeleteAssessmentProps {
  id: string;
}

//  interface for deleteAssessment response
export interface DeleteAssessmentResponse {
  message: string;
  data: boolean;
}

// interface for updateAssessments props
export interface UpdateAssessmentProps {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  // duration: number;
}

// interface for updateAssessments response
export interface UpdateAssessmentResponse {
  message: string;
  data: {
    id: string;
    name: string;
    description: string;
    is_active: boolean;
    start_at: string;
    end_at: string;
    duration: number;
    created_by: string;
    createdAt: string;
    updatedAt: string;
  };
}


// interface for getAssessment props
export interface GetAssessmentByIdProps {
  id: string;
}

// Interface for getAssessment response
export interface GetAssessmentByIdResponse {
  message: string;
  data: GetAssessmentByIdData;
}

export interface GetAssessmentByIdData {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  duration: number;
  created_by: string;
  createdAt: string;
  updatedAt: string;
  sections: Question[][];
}



export interface Question {
  id: string;
  assessment_id: string;
  description: string;
  marks: number;
  section: number;
  createdAt: string;
  updatedAt: string;
  options: Option[];
}

export interface Option {
  id: string;
  question_id: string;
  description: string;
  is_correct: boolean;
  createdAt: string;
  updatedAt: string;
}

// interface for createAssessment props
export interface CreateAssessmentProps {
  name: string;
  description?: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  duration: number;
  created_by: string;
}

// interface for createAssessment response
export interface AssessmentResponse {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  duration: number;
  created_by: string;
  updatedAt: string;
  createdAt: string;
}

// interface for addGroupToAssessment props
export interface AddGroupToAssessmentProps {
  assessmentId: string;
  groupId: string;
}

// interface for addGroupToAssessment response
export interface AddGroupToAssessmentResponse {
  status: string;
}


export interface SearchAssessmentsProps  {
  page: number;        // Page number to fetch, e.g., 1
  pageSize: number;    // Number of items per page, e.g., 10
  order: 'ASC' | 'DESC'; // Sort order, either 'ASC' or 'DESC'
  query: string;       // The query string or ID for the search, e.g., "8dac33f2-e389-4f8d-8d8d-02da412b9b0a"
};


export interface SearchAssessmentResult  {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  start_at: string;        // ISO date string
  end_at: string;          // ISO date string
  duration: number;        // Duration in milliseconds
  created_by: string;
  createdAt: string;       // ISO date string
  updatedAt: string;       // ISO date string
};

export interface SearchAssessmentsData  {
  searchResults: SearchAssessmentResult[];
  totalPages: number;
};

export interface SearchAssessmentsResponse{
  message: string;
  data: SearchAssessmentsData;
};
