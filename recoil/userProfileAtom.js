// userProfileAtom.js
import { atom } from "recoil";

// Atom to store user profile information
export const userProfileState = atom({
  key: "userProfileState", // unique ID (with respect to other atoms/selectors)
  default: { name: "", picture: "" }, // default value (aka initial state)
});
