To-Do List<br><br>
A simple To-Do List app built using React Native, TypeScript, and Recoil for state management. This app allows users to add, delete, and mark tasks as completed.

Table of Contents - 
Features, 
Tech Stack,
Getting Started
Prerequisites
Installation
Usage
Documentation
Testing
Contributing
License
Contact
Features
Add new tasks to your list.
Delete existing tasks.
Toggle task completion status.
View completed and pending tasks using Recoil selectors.
Tech Stack
React Native: For building the mobile application.
TypeScript: For static typing and better development experience.
Recoil: For state management.
Getting Started
Follow these instructions to get a local copy of the project up and running on your device.

Prerequisites
Node.js (v14 or later)
Expo CLI: Install Expo CLI
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/HitenAnand16/TODOApp
Navigate to the project directory:

bash
Copy code
cd todo-list
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
expo start
Usage
Open the app in your Expo Go app on your device or in an emulator.
Add new tasks using the input field and press the "Add" button.
Toggle task completion by tapping on the task.
Delete a task using the delete button next to each task.
Documentation
State Management with Recoil
Atoms
taskListState: Manages the list of tasks.

ts
Copy code
export const taskListState = atom<Task[]>({
  key: 'taskListState',
  default: [],
});
Selectors
completedTasksSelector: Derives a list of completed tasks.

ts
Copy code
export const completedTasksSelector = selector<Task[]>({
  key: 'completedTasksSelector',
  get: ({ get }) => {
    const tasks = get(taskListState);
    return tasks.filter((task) => task.isComplete);
  },
});
pendingTasksSelector: Derives a list of pending tasks.

ts
Copy code
export const pendingTasksSelector = selector<Task[]>({
  key: 'pendingTasksSelector',
  get: ({ get }) => {
    const tasks = get(taskListState);
    return tasks.filter((task) => !task.isComplete);
  },
});
Firebase Interaction
Firebase was initially considered for data persistence but is not included in the current implementation. You can integrate Firebase in future versions for data storage and synchronization across devices.

Testing
The app includes automated tests using Playwright. The following test cases are covered:

Adding tasks.
Deleting tasks.
Marking tasks as complete/incomplete.
Verifying tasks persist across app sessions.
Running Tests
Install Playwright:

bash
Copy code
npm install -D @playwright/test
Run the tests:

bash
Copy code
npx playwright test
Contributing
Contributions are welcome! Follow these steps to contribute:

Fork the project.
Create your feature branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -m 'Add SomeFeature').
Push to the branch (git push origin feature/YourFeature).
Open a Pull Request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
Your Name - hitenanand2402@gmail.com

Project Link: https://github.com/HitenAnand16/TODOApp

