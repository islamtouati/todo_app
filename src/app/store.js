import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "features/todo/todoSlice";
import addTaskReducer from "features/add_task/addTaskSlice";
import addNestedTaskReducer from "features/add_nested_task/addNestedTaskSlice";
import updateTaskReducer from "features/update_task/updateTaskSlice";
import updateNestedTaskReducer from "features/update_nested_task/updateNestedTaskSlice";

export default configureStore({
  reducer: {
    todo: todoReducer,
    addTask: addTaskReducer,
    addNestedTask: addNestedTaskReducer,
    updateTask: updateTaskReducer,
    updateNestedTask: updateNestedTaskReducer,
  },
});
