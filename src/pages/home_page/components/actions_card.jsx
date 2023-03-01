import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

function ActionsListCard(params) {
  const { handleNewTask, handleUpdateTask, handleDeleteTask } = params;
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
