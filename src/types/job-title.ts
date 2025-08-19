export interface JobTitleType {
  id: number;
  name: string;
}

export interface JobTitleResponse {
  data: JobTitleType[];
  message: string;
}

export interface FetchJobTitlesQuery {
  page?: string;
  page_size?: string;
  filter?: string;
  name?: string;
} 