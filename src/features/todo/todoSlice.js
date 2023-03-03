import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    user: null,
    todoList: [],
    nestedList: {},
  },
  reducers: {
    initUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },

    initTodoList: (state, action) => {
      state.todoList = action.payload;
    },
    addTask: (state, action) => {
      state.todoList.push(action.payload);
    },
    updateTask: (state, action) => {
      state.todoList.forEach((element, index) => {
        if (element.id === action.payload.id) {
          state.todoList[index] = { ...action.payload };
          return;
        }
      });
    },
    deleteTask: (state, action) => {
      state.todoList.forEach((element, index) => {
        if (element.id === action.payload) {
          state.todoList.splice(index, 1);
          delete state.nestedList[action.payload];
          return;
        }
      });
    },

    rearrangeTasks: (state) => {
      state.todoList.sort(function (x, y) {
        return x.pos - y.pos;
      });
    },

    initNestedTask: (state, action) => {
      state.nestedList[action.payload.todoID] = action.payload.nestedList;
    },
    addNestedTask: (state, action) => {
      state.nestedList[action.payload.todoId].push(action.payload);
    },
    updateNestedTask: (state, action) => {
      state.nestedList[action.payload.todoId].forEach((element, index) => {
        if (element.id === action.payload.id) {
          state.nestedList[action.payload.todoId][index] = {
            ...action.payload,
          };
          return;
        }
      });
    },
    deleteNestedTask: (state, action) => {
      state.nestedList[action.payload.todoId].forEach((element, index) => {
        if (element.id === action.payload.id) {
          state.nestedList[action.payload.todoId].splice(index, 1);
          return;
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initUser,
  logout,
  initTodoList,
  addTask,
  updateTask,
  deleteTask,
  rearrangeTasks,
  initNestedTask,
  addNestedTask,
  updateNestedTask,
  deleteNestedTask,
} = todoSlice.actions;

export default todoSlice.reducer;
