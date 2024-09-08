import React from "react";

import "./NewTask.scss";

function NewTask({ onAddTask, onCancel }: { onAddTask: (arg0: Task) => void; onCancel: () => void }): JSX.Element {
  const titleRef = React.useRef<HTMLInputElement | null>(null);
  const summaryRef = React.useRef<HTMLTextAreaElement | null>(null);
  const categoryRef = React.useRef<HTMLSelectElement | null>(null);

  const [formInvalid, setFormInvalid] = React.useState<boolean>(false);

  function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();

    const enteredTitle = titleRef.current?.value as string;
    const enteredSummary = summaryRef.current?.value as string;
    const chosenCategory = categoryRef.current?.value as string;

    if (enteredTitle?.trim().length === 0 || enteredSummary.trim().length === 0) {
      setFormInvalid(true);
      return;
    }

    const taskData = {
      title: enteredTitle,
      summary: enteredSummary,
      category: chosenCategory,
    };
    onAddTask(taskData);
  }

  return (
    <form id="new-task-form" onSubmit={submitHandler}>
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </p>
      <p>
        <label htmlFor="summary">Summary</label>
        <textarea id="summary" rows={5} ref={summaryRef} />
      </p>
      <p>
        <label htmlFor="category">Category</label>
        <select id="category" ref={categoryRef} defaultValue="moderate">
          <option value="urgent">🚨 Urgent</option>
          <option value="important">🔴 Important</option>
          <option value="moderate">🔵 Moderate</option>
          <option value="low">🟢 Low</option>
        </select>
      </p>
      {formInvalid && <p className="error-message">Please provide values for task title, summary and category!</p>}
      <p className="actions">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Add Task</button>
      </p>
    </form>
  );
}

export default NewTask;
