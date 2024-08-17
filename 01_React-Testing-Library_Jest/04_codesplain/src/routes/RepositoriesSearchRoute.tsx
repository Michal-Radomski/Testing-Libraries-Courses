import { useSearchParams } from "react-router-dom";
import useRepositories from "../hooks/useRepositories";
import RepositoriesListItem from "../components/repositories/RepositoriesListItem";

function RepositoriesSearchRoute(): JSX.Element {
  const [params] = useSearchParams();
  const { data: repositories, isLoading, error } = useRepositories(params.get("q") as string);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return error.message;
  }

  const renderedRepositories = repositories.map((r: Repository) => {
    return <RepositoriesListItem key={r.id} repository={r} />;
  });

  return <div className="container mx-auto">{renderedRepositories}</div>;
}

export default RepositoriesSearchRoute;
