import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBtAelmRAYDj_NlAmS-NKxAyFl7uwpX5s",
  authDomain: "vue-todo-list-b8557.firebaseapp.com",
  projectId: "vue-todo-list-b8557",
  storageBucket: "vue-todo-list-b8557.appspot.com",
  messagingSenderId: "386137137723",
  appId: "1:386137137723:web:cd66c66524a443bdfa721e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
