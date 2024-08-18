import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FileIcon from "./FileIcon";

function File({ file, repoName, owner }: { file: File; repoName: string; owner: string }): JSX.Element {
  return (
    <Link
      to={`/repositories/${owner}/${repoName}/${file.path}`}
      className="cursor-default whitespace-nowrap hover:font-bold"
    >
      <FileIcon name={file.name} />
      {file.name}
    </Link>
  );
}

File.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  repoName: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

export default File;
