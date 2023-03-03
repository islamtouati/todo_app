import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import { openModel as openNewNestedTaskModel } from "features/add_nested_task/addNestedTaskSlice";
import { deleteTask } from "features/todo/todoSlice";
import { openModel as openUpdateModel } from "features/update_task/updateTaskSlice";
import { useDispatch } from "react-redux";

function ActionsListCard(params) {
  const dispatch = useDispatch();

  const handleNewTask = () => {
    dispatch(openNewNestedTaskModel(params.task.id));
  };

  const handleUpdateTask = () => {
    dispatch(openUpdateModel(params.task));
  };

  const handleDeleteTask = () => {
    axios
      .delete(`http://localhost:3001/todos/${params.task.id}`)
      .then((res) => {
        dispatch(deleteTask(params.task.id));
      });
  };

  return (
    <div className="absolute hidden right-0 inset-y-0 h-full items-center backdrop-blur-sm bg-white/30 rounded-r-lg group-hover:flex px-5 space-x-2">
      <PlusIcon
        onClick={handleNewTask}
        className="h-5 w-5 text-green-600 cursor-pointer"
      />
      <PencilSquareIcon
        onClick={handleUpdateTask}
        className="h-5 w-5 text-orange-600 cursor-pointer"
      />
      <TrashIcon
        onClick={handleDeleteTask}
        className="h-5 w-5 text-red-600 cursor-pointer"
      />
    </div>
  );
}

export default ActionsListCard;
