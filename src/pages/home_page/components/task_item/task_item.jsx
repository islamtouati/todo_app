/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { initNestedTask } from "features/todo/todoSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NestedTaskItem from "./nested_task_item";
import OneTaskItem from "./one_task_item";

function TaskItemCard(params) {
  const { task, ...draggable } = params;
  const dispatch = useDispatch();
  const nestedTaskList =
    useSelector((state) => state.todo.nestedList[task.id]) ?? [];
  useEffect(() => {
    axios
      .get(`http://localhost:3001/nestedTodos?todoId=${task.id}`)
      .then((res) => {
        dispatch(initNestedTask({ todoID: task.id, nestedList: res.data }));
      });
  }, []);
  return (
    <div className="flex" {...draggable}>
      <div className="px-4 bg-indigo-50 flex justify-center items-center rounded-lg cursor-move mr-2">
        <ArrowsUpDownIcon className="h-5 w-5 text-indigo-900" />
      </div>
      {nestedTaskList.length === 0 ? (
        <OneTaskItem task={task} />
      ) : (
        <NestedTaskItem task={task} nestedTaskList={nestedTaskList} />
      )}
    </div>
  );
}

export default TaskItemCard;
