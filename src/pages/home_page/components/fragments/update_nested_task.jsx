import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { updateNestedTask } from "features/todo/todoSlice";
import { closeModel } from "features/update_nested_task/updateNestedTaskSlice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function UpdateNestedTaskFragment() {
  const isOpen = useSelector((state) => state.updateNestedTask.isOpen);
  const task = useSelector((state) => state.updateNestedTask.task);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      var date = task.endDate;
      if (date) {
        var dateSplitted = date.split("/");
        date = dateSplitted[2] + "-" + dateSplitted[1] + "-" + dateSplitted[0];
      }
      setEndDate(date);
    }
  }, [task]);
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    var date = endDate;
    if (endDate) {
      var dateSplitted = endDate.split("-");
      date = dateSplitted[2] + "/" + dateSplitted[1] + "/" + dateSplitted[0];
    }
    const taskToUpdate = {
      ...task,
      title: title,
      description: description,
      endDate: date,
    };
    axios
      .patch(`http://localhost:3001/nestedTodos/${task.id}`, taskToUpdate)
      .then((res) => {
        dispatch(updateNestedTask(res.data));
        dispatch(closeModel());
      });
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => dispatch(closeModel())}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Update Nested Task
                </Dialog.Title>
                <div className="mt-2">
                  <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="-space-y-px rounded-md shadow-sm">
                      <div>
                        <label htmlFor="email-address" className="sr-only">
                          Title
                        </label>
                        <input
                          id="title"
                          name="title"
                          type="text"
                          autoComplete="title"
                          required
                          className="relative block w-full appearance-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Title"
                          value={title ?? ""}
                          onChange={handleTitleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="email-address" className="sr-only">
                          Description
                        </label>
                        <input
                          id="description"
                          name="description"
                          type="text"
                          className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Description"
                          value={description ?? ""}
                          onChange={handleDescriptionChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="email-address" className="sr-only">
                          End Date
                        </label>
                        <input
                          id="end-date"
                          name="end-date"
                          type="date"
                          className=" relative block w-full appearance-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="End Date"
                          defaultValue={endDate ?? ""}
                          onChange={handleEndDateChange}
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Update Task
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
export default UpdateNestedTaskFragment;
