// Types and Interfaces

interface Repository {
  language?: string;
  stargazers_count?: number;
  forks?: number;
  open_issues?: number;
  full_name?: string;
  description?: string;
  owner?: {
    login?: string;
  };
  name?: string;
  html_url?: string;
}
