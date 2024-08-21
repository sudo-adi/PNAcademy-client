// interface for createTag props
export interface CreateTagProps {
  name: string;
}

// interface for createTag response
export interface CreateTagResponse {
  message: string;
  data: {
    id: string;
    name: string;
    updatedAt: string;
    createdAt: string;
  };
}

// interface for getTagById props
export interface GetTagProps {
  id: string;
}

// interface for getTagById response
export interface GetTagByIdResponse {
  status: string;
  data: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

// interface for getTags props
export interface GetTagsProps {
  page: number;
  pageSize: number;
  sortBy: "id" | "name" | "createdAt" | "updatedAt";
  order: "ASC" | "DESC";
}

// interface for Tag
export interface Tag {
  id: string;
  name: string;
  // Add other properties of a tag if needed
}

// interface for getTags response
export interface GetTagsResponse {
  message: string;
  data: {
    tags: Tag[];
    totalPages: number;
  };
}

// interface for updateTag props
export interface UpdateTagProps {
  id: string;
  name: string;
}

// interface for updateTag response
export interface UpdateTagResponse {
  message: string;
  data: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

// interface for deleteTag props
export interface DeleteTagProps {
  id: string;
}

// interface for deleteTag response
export interface DeleteTagResponse {
  message: string;
  data: boolean;
}
