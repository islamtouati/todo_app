import NewNestedTaskFragment from "./fragments/new_nested_task";
import NewTaskFragment from "./fragments/new_task";
import UpdateNestedTaskFragment from "./fragments/update_nested_task";
import UpdateTaskFragment from "./fragments/update_task";

function ModelsCard() {
  return (
    <>
      <NewTaskFragment />
      <UpdateTaskFragment />
      <NewNestedTaskFragment />
      <UpdateNestedTaskFragment />
    </>
  );
}

export default ModelsCard;
