import { selector } from "recoil";
import { taskListState } from "./atoms";

// Selector to get pending tasks
export const pendingTasksState = selector({
  key: "pendingTasksState",
  get: ({ get }) => {
    const taskList = get(taskListState);
    return taskList.filter((task) => !task.completed);
  },
});

// Selector to get completed tasks
export const completedTasksState = selector({
  key: "completedTasksState",
  get: ({ get }) => {
    const taskList = get(taskListState);
    return taskList.filter((task) => task.completed);
  },
});
