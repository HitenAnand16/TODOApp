// firebaseService.ts
import { db } from './firebaseConfig'; // Ensure you have this configured correctly
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';

const tasksCollection = collection(db, 'tasks');

// Add a new task
export const addTaskToFirestore = async (task: { title: string; completed: boolean }) => {
  const docRef = await addDoc(tasksCollection, task);
  return { id: docRef.id, ...task }; // Return the task with its Firestore ID
};

// Delete a task
export const deleteTaskFromFirestore = async (id: string) => {
  await deleteDoc(doc(db, 'tasks', id));
};

// Toggle task completion
export const toggleTaskCompletionInFirestore = async (id: string, completed: boolean) => {
  await updateDoc(doc(db, 'tasks', id), { completed });
};

// Fetch tasks
export const fetchTasksFromFirestore = async () => {
  const querySnapshot = await getDocs(tasksCollection);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
