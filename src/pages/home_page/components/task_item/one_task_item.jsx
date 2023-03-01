import { CalendarIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useState } from "react";
import ActionsListCard from "../actions_card";
// import ActionsListCard from "../actions_card";

function OneTaskItem(params) {
  const { task, setTaskList, handleUpdate, index, addNestedTask } = params;
  const [isChecked, setIsChecked] = useState(task.completed);
  const handleOnChange = () => {
    axios
      .patch(`http://localhost:3001/todos/${task.id}`, {
        completed: !isChecked,
      })
      .then((res) => {
        setIsChecked(!isChecked);
      });
  };
  const handleAddNestedTask = () => addNestedTask(task.id);

  const handleUpdateTask = () => handleUpdate(index);

  const deleteTask = () => {
    axios.delete(`http://localhost:3001/todos/${task.id}`).then((res) => {
      setTaskList([]);
    });
  };

  return (
    <div className="relative flex w-full items-center group justify-start space-x-3 rounded-lg bg-gray-100 px-4 py-2 text-left hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
      <input
        id="remember-me"
        name="remember-me"
        type="checkbox"
        checked={isChecked}
        onChange={handleOnChange}
        className="h-5 w-5 rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      <div className="flex-1 flex w-full flex-col space-y-2">
        <div className="flex space-x-5 items-center justify-between">
          <span
            className={`${
              isChecked ? "line-through" : ""
            } text-md font-bold text-indigo-900`}
          >
            {task.title}
          </span>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-gray-600" />
            <p className="font-normal text-xs text-gray-600">{task.endDate} </p>
          </div>
        </div>

        <p className="font-normal text-md text-indigo-400">
          {task.description}{" "}
        </p>
      </div>
      <ActionsListCard
        handleNewTask={handleAddNestedTask}
        handleUpdateTask={handleUpdateTask}
        handleDeleteTask={deleteTask}
      />
    </div>
  );
}
export default OneTaskItem;
