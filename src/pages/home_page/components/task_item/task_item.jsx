import axios from "axios";
import { useEffect, useState } from "react";
import NestedTaskItem from "./nested_task_item";
import OneTaskItem from "./one_task_item";

function TaskItemCard(params) {
  const { task, setTaskList, handleUpdate, index, addNestedTask } = params;
  const [nestedTaskList, setNestedTaskList] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/nestedTodos?todoId=${task.id}`)
      .then((res) => {
        setNestedTaskList(res.data);
      });
  }, [task.id]);
  return nestedTaskList.length === 0 ? (
    <OneTaskItem
      task={task}
      setTaskList={setTaskList}
      handleUpdate={handleUpdate}
      addNestedTask={addNestedTask}
      index={index}
    />
  ) : (
    <NestedTaskItem
      task={task}
      setTaskList={setTaskList}
      nestedTaskList={nestedTaskList}
      handleUpdate={handleUpdate}
      addNestedTask={addNestedTask}
      index={index}
    />
  );
}

export default TaskItemCard;
