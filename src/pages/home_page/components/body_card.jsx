import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { openModel } from "features/add_task/addTaskSlice";
import { useDispatch } from "react-redux";
import TaskList from "./task_list";

function BodyCard(params) {
  const dispatch = useDispatch();
  return (
    <main className="flex flex-col max-w-5xl mx-auto min-h-full w-full p-5 bg-white shadow-lg rounded-lg mt-5 space-y-5">
      <div className="flex justify-between items-center w-full ">
        <h4 className="font-bold text-lg">My Taskes</h4>
        <div
          className="flex items-center justify-center py-2 px-4 rounded-lg bg-green-100 space-x-3 cursor-pointer"
          onClick={() => dispatch(openModel())}
        >
          <PlusCircleIcon
            className="text-green-600 h-5 w-5
            "
          />
          <p className="font-medium text-green-600">New Task</p>
        </div>
      </div>
      <TaskList />
    </main>
  );
}

export default BodyCard;
