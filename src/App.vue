<template>

<h1 class="text-center font-bold text-4xl my-8">Todo List</h1>

<form @submit.prevent="addTodo">
  <div class="my-10 mx-20">
  <div class="flex gap-x-2">
    <input type="text" v-model="inputContent" name="todo" id="todo" class="shadow-sm block w-full rounded-md border-red-500 p-4 border-2 border-gray-400" placeholder="Clean your bedroom">
    <button :disabled="!(inputContent)" class="disabled:bg-gray-400 bg-blue-500 rounded-md text-sm p-4 text-white ">AJOUTER</button>
  </div>
</div>
</form>

<div v-for="todo in todos" class="shadow-md p-4 my-5 mx-20 rounded-md" :class="todo.done ? 'bg-green-200' :'' ">
  <div class="flex justify-between items-center">
    <p :class="todo.done ? 'line-through' :''">
      {{ todo.content }}
    </p>
    <div class="flex gap-x-2">
      <button @click="toggleDone(todo.id)" class="bg-green-500 text-white px-4 py-2 rounded-md">&check;</button>
      <button @click="deleteTodo(todo.id)" class="bg-red-500 text-white px-4 py-2 rounded-md">&cross;</button>
    </div>
  </div>
</div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid'
import { db } from '@/firebase' 
import { collection, getDocs, doc, onSnapshot, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'

const todos = ref([])

const inputContent = ref('');

const addTodo = async () => {
  await addDoc(collection(db, "todos"), {
    content: inputContent.value,
    done: false
  });

  inputContent.value = '';
}

const deleteTodo = (id) => {
  deleteDoc(doc(db, "todos", id));
}

const toggleDone = async (id) => {
  const index = todos.value.findIndex(todo => todo.id === id);
  
  await updateDoc(doc(db, "todos", id), {
    done: !todos.value[index].done
  })
}

onMounted(async () => {

  // const collectionRef = collection(db, 'todos');
  // const docSnap = await getDocs(collectionRef);
  // docSnap.forEach(doc => {
  //   todos.value.push({
  //     id: doc.id,
  //     content: doc.data().content,
  //     done: doc.data().done
  //   })
  // })

  onSnapshot(collection(db, 'todos'), (querySnapshot) => {
    const temp = [];
    querySnapshot.forEach((doc) => {
      temp.push({
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done
      })
    todos.value = temp;
    });

  });

  
})


</script>