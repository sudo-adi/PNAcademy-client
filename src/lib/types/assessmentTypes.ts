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


// interface for getAssessment response
export interface GetAssessmentByIdResponse {
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
  questions: any[];
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


// interface for getAssignedAssessments Data
export interface GetAssignedAssessmentsData {
  assessments: Assessment[];
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
  assessments: Assessment[];
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

// interface for getAssessment response
export interface GetAssessmentByIdResponse {
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
  questions: any[];
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