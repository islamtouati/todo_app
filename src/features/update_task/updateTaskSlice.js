import { createSlice } from "@reduxjs/toolkit";

const updateTaskSlice = createSlice({
  name: "update",
  initialState: {
    isOpen: false,
    task: null,
  },
  reducers: {
    openModel: (state, action) => {
      state.isOpen = true;
      state.task = action.payload;
    },
    closeModel: (state) => {
      state.isOpen = false;
      state.task = null;
    },
  },
});
export const { openModel, closeModel } = updateTaskSlice.actions;
export default updateTaskSlice.reducer;
