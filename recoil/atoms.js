import { atom } from "recoil";

// Atom to store the task list
export const taskListState = atom({
  key: "taskListState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial state)
});
