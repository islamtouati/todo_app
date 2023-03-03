import { createSlice } from "@reduxjs/toolkit";

export const addTaskSlice = createSlice({
  name: "addTask",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openModel: (state) => {
      state.isOpen = true;
    },
    closeModel: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModel, closeModel } = addTaskSlice.actions;

export default addTaskSlice.reducer;
