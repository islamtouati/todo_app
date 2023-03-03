import { createSlice } from "@reduxjs/toolkit";

const updateNestedTaskSlice = createSlice({
  name: "updateNestedTask",
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
export const { openModel, closeModel } = updateNestedTaskSlice.actions;
export default updateNestedTaskSlice.reducer;
