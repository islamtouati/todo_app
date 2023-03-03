import { Disclosure } from "@headlessui/react";
import { CalendarIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { updateTask } from "features/todo/todoSlice";
import { useDispatch } from "react-redux";
import ActionsListCard from "../actions_card";
import NestedTaskChild from "./nested_task_child";

function NestedTaskItem(params) {
  const { task, nestedTaskList } = params;
  const dispatch = useDispatch();
  const isChecked = task.completed;
  const handleOnChange = () => {
    axios
      .patch(`http://localhost:3001/todos/${task.id}`, {
        completed: !isChecked,
      })
      .then((res) => {
        dispatch(updateTask(res.data));
      });
  };
  return (
    <Disclosure>
      {({ open }) => (
        <div className="flex-1 flex-col space-y-2">
          <div className="relative group flex w-full items-center justify-start space-x-3 rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-black-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={isChecked}
              onChange={handleOnChange}
              className="h-5 w-5 rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <Disclosure.Button className="flex-1 flex w-full flex-col space-y-2  text-left text-ellipsis">
              <div className="flex space-x-5 items-start justify-between w-full">
                <span
                  className={`${
                    isChecked ? "line-through" : ""
                  } text-md font-bold text-indigo-900`}
                >
                  {task.title}
                </span>
                <div className="flex items-center space-x-2">
                  {task.endDate && (
                    <>
                      <CalendarIcon className="h-4 w-4 text-gray-600" />
                      <p className="font-normal text-xs text-gray-600">
                        {task.endDate}{" "}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-between w-full">
                <p className="font-normal text-md text-indigo-400">
                  {task.description}{" "}
                </p>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-indigo-500`}
                />
              </div>
            </Disclosure.Button>
            <ActionsListCard task={task} />
          </div>
          <Disclosure.Panel className="pl-6 pb-2 text-sm space-y-2">
            {nestedTaskList.map((item, index) => (
              <NestedTaskChild task={item} key={index} />
            ))}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
export default NestedTaskItem;
