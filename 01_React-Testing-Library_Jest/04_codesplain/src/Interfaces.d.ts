// Types and Interfaces

declare module "@exuanbo/file-icons-js/dist/js/file-icons";

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

interface ObjectI {
  [key: string]: string | string[];
}

interface Entry {
  type?: string;
  name?: string;
}

interface Folder extends Entry {
  path?: string;
}

interface File extends Entry {
  path?: string;
}
