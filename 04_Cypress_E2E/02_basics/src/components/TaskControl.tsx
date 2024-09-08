import Filter from "./Filter";

import "./TaskControl.scss";

function TaskControl({
  onStartAddTask,
  onSetFilter,
}: {
  onStartAddTask: () => void;
  onSetFilter: (arg0: string) => void;
}): JSX.Element {
  return (
    <div id="task-control">
      <button onClick={onStartAddTask} data-cy="start-add-task-button">
        Add Task
      </button>
      <Filter onFilterChange={onSetFilter} />
    </div>
  );
}

export default TaskControl;
