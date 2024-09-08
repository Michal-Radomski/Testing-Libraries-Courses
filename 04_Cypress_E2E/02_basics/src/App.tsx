import React from "react";

import Modal from "./components/Modal";
import NewTask from "./components/NewTask";
import Header from "./components/Header";
import TaskControl from "./components/TaskControl";
import TaskList from "./components/TaskList";

function App(): JSX.Element {
  const [isAddingTask, setIsAddingTask] = React.useState<boolean>(false);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [appliedFilter, setAppliedFilter] = React.useState<string>("all");

  const displayedTasks = tasks.filter((task: Task) => {
    if (appliedFilter === "all") {
      return true;
    }
    return task.category === appliedFilter;
  });

  function startAddTaskHandler() {
    setIsAddingTask(true);
  }

  function cancelAddTaskHandler() {
    setIsAddingTask(false);
  }

  function addTaskHandler(taskData: Task) {
    setTasks((prevTasks) => {
      return [
        ...prevTasks,
        {
          id: Math.random().toString(),
          ...taskData,
        },
      ];
    });
    setIsAddingTask(false);
  }

  function setFilterHandler(category: string) {
    setAppliedFilter(category);
  }

  return (
    <React.Fragment>
      {isAddingTask && (
        <Modal onClose={cancelAddTaskHandler}>
          <NewTask onAddTask={addTaskHandler} onCancel={cancelAddTaskHandler} />
        </Modal>
      )}
      <Header />
      <main>
        <TaskControl onStartAddTask={startAddTaskHandler} onSetFilter={setFilterHandler} />
        <TaskList tasks={displayedTasks} />
      </main>
    </React.Fragment>
  );
}

export default App;
