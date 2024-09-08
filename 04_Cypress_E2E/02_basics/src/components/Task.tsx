import "./Task.scss";

const CATEGORY_ICONS = {
  urgent: "🚨",
  important: "🔴",
  moderate: "🔵",
  low: "🟢",
};

function Task({ category, title, summary }: Task): JSX.Element {
  return (
    <li className="task">
      <span className="task-category">{CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS]}</span>
      <div>
        <h2>{title}</h2>
        <p>{summary}</p>
      </div>
    </li>
  );
}

export default Task;
