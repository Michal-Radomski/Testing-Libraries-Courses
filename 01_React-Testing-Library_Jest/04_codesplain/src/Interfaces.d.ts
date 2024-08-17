// Types and Interfaces

type GitHubRepoUrl = `https://github.com/${string}/${string}`;

interface Repository {
  id?: string;
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
  // html_url?: string;
  html_url?: GitHubRepoUr;
}
