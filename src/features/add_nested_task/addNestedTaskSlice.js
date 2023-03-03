import { createSlice } from "@reduxjs/toolkit";

export const addNestedTaskSlice = createSlice({
  name: "addNestedTask",
  initialState: {
    isOpen: false,
    taskID: null,
  },
  reducers: {
    openModel: (state, action) => {
      state.isOpen = true;
      state.taskID = action.payload;
    },
    closeModel: (state) => {
      state.isOpen = false;
      state.taskID = null;
    },
  },
});

export const { openModel, closeModel } = addNestedTaskSlice.actions;

export default addNestedTaskSlice.reducer;
