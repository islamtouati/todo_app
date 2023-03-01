import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import NewTaskFragment from "./fragments/new_task";
import TaskList from "./task_list";

function BodyCard(params) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { userID } = params;
  const [taskList, setTaskList] = useState([]);

  return (
    <main className="flex flex-col max-w-5xl mx-auto min-h-full w-full p-5 bg-white shadow-lg rounded-lg mt-5 space-y-5">
      <div className="flex justify-between items-center w-full ">
        <h4 className="font-bold text-lg">My Taskes</h4>
        <div
          className="flex items-center justify-center py-2 px-4 rounded-lg bg-green-100 space-x-3 cursor-pointer"
          onClick={openModal}
        >
          <PlusCircleIcon
            className="text-green-600 h-5 w-5
            "
          />
          <p className="font-medium text-green-600">New Task</p>
        </div>
      </div>
      <TaskList userID={userID} taskList={taskList} setTaskList={setTaskList} />
      <NewTaskFragment
        isOpen={isOpen}
        closeModal={closeModal}
        userID={userID}
        setTaskList={setTaskList}
        taskList={taskList}
      />
    </main>
  );
}

export default BodyCard;
