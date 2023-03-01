/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import NewNestedTaskFragment from "./fragments/new_nested_task";
import UpdateTaskFragment from "./fragments/update_task";
import TaskItemCard from "./task_item/task_item";

export default function TaskList(params) {
  const { userID, taskList, setTaskList } = params;
  const [taskToUpdate, setTaskToUpdate] = useState();
  const [taskID, setTaskID] = useState();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(index) {
    setTaskToUpdate(taskList[index]);
    setIsOpen(true);
  }
  let [isNewNestedTaskOpen, setIsNewNestedTaskOpen] = useState(false);

  function closeNewNestedTaskModal() {
    setIsNewNestedTaskOpen(false);
  }

  function openNewNestedTaskModal(taskID) {
    setTaskID(taskID);
    setIsNewNestedTaskOpen(true);
  }
  useEffect(() => {
    axios.get(`http://localhost:3001/todos?userId=${userID}`).then((res) => {
      const task_list = res.data;
      task_list.sort(function (x, y) {
        return x.pos - y.pos;
      });
      setTaskList(task_list);
    });
  }, [taskList.length]);
  return (
    <div className="w-full space-y-2">
      {taskList.length === 0 ? (
        <div>No Data to show </div>
      ) : (
        <>
          {taskList.map((item, index) => (
            <TaskItemCard
              task={item}
              key={index}
              setTaskList={setTaskList}
              addNestedTask={openNewNestedTaskModal}
              handleUpdate={openModal}
              index={index}
            />
          ))}
        </>
      )}
      <UpdateTaskFragment
        isOpen={isOpen}
        closeModal={closeModal}
        task={taskToUpdate}
        setTaskList={setTaskList}
        taskList={taskList}
      />
      <NewNestedTaskFragment
        isOpen={isNewNestedTaskOpen}
        closeModal={closeNewNestedTaskModal}
        taskID={taskID}
        taskList={taskList}
        setTaskList={setTaskList}
      />
    </div>
  );
}
