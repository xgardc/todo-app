import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  doc,
  deleteDoc,
  addDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1Yl60NulAu4yYjlXefvCqaKSpbD-37r4",
  authDomain: "quard-f0be6.firebaseapp.com",
  databaseURL:
    "https://quard-f0be6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "quard-f0be6",
  storageBucket: "quard-f0be6.appspot.com",
  messagingSenderId: "387577641436",
  appId: "1:387577641436:web:ef713e2a6ed8bf16bdb719",
  measurementId: "G-EQPZCCZRQ6",
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const database = collection(firestore, "todos");

export async function getTodos(author) {
  const getQuery = query(database);
  const response = await getDocs(database, getQuery);
  const todos = [];
  response.forEach((data) => todos.push({ id: data.id, ...data.data() }));
  return todos.filter((todo) => todo.author === author);
}

export async function deleteTodo(id) {
  await deleteDoc(doc(database, id));
}

export async function newTodo({ author, title }) {
  await addDoc(database, { author, title, done: false });
}

export async function changeDone(id) {
  const todo = await getDoc(doc(database, id));
  await setDoc(doc(database, id), { ...todo.data(), done: !todo.data().done });
}
