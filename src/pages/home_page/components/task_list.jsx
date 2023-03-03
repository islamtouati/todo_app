/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import {
  initTodoList,
  rearrangeTasks,
  updateTask,
} from "features/todo/todoSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskItemCard from "./task_item/task_item";
import addTaskImage from "assets/images/add_notes.svg";

export default function TaskList(params) {
  const userID = useSelector((state) => state.todo.user.id);
  const taskList = useSelector((state) => state.todo.todoList);
  const dispatch = useDispatch();
  const [dragging, setDragging] = useState({
    isDragging: false,
    toIndex: -1,
  });

  let todoItemDrag = useRef();
  let todoItemDragOver = useRef();

  useEffect(() => {
    axios.get(`http://localhost:3001/todos?userId=${userID}`).then((res) => {
      const task_list = res.data;
      task_list.sort(function (x, y) {
        return x.pos - y.pos;
      });
      dispatch(initTodoList(task_list));
    });
  }, []);

  function D_Start(e, index) {
    setDragging({ ...dragging, isDragging: true });
    todoItemDrag.current = index;
  }
  function D_Enter(e, index) {
    todoItemDragOver.current = index;
    if (todoItemDragOver.current !== todoItemDrag.current) {
      setDragging({ ...dragging, toIndex: index });
    }
  }
  function D_End(e) {
    if (todoItemDragOver.current !== todoItemDrag.current) {
      axios
        .patch(
          `http://localhost:3001/todos/${taskList[todoItemDrag.current].id}`,
          {
            pos: todoItemDragOver.current,
          }
        )
        .then((res) => {
          dispatch(updateTask(res.data));
        });
      axios
        .patch(
          `http://localhost:3001/todos/${
            taskList[todoItemDragOver.current].id
          }`,
          {
            pos: todoItemDrag.current,
          }
        )
        .then((res) => {
          dispatch(updateTask(res.data));
          dispatch(rearrangeTasks());
        });
    }

    setDragging({ isDragging: false, toIndex: -1 });
  }

  return (
    <div className="w-full space-y-2">
      {taskList.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-5 w-full space-y-5">
          <img src={addTaskImage} alt="add Task" className="w-28 h-auto" />
          <p className="font-bold text-base">No Task !! let's add New Task</p>
        </div>
      ) : (
        taskList.map((item, index) => (
          <div key={index} className="flex-col space-y-2">
            {dragging.isDragging &&
              dragging.toIndex === index &&
              dragging.toIndex === 0 && (
                <div className="w-full bg-gray-100 border-dashed border-gray-400 border-2 rounded-lg h-16"></div>
              )}
            <TaskItemCard
              draggable
              onDragStart={(e) => D_Start(e, index)}
              onDragEnter={(e) => D_Enter(e, index)}
              onDragEnd={(e) => D_End(e, index)}
              task={item}
            />
            {dragging.isDragging &&
              dragging.toIndex === index &&
              dragging.toIndex !== 0 && (
                <div className="w-full bg-gray-100 border-dashed border-gray-400 border-2 rounded-lg h-16"></div>
              )}
          </div>
        ))
      )}
    </div>
  );
}
