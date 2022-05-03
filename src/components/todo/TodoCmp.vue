<template>
  <div class="container">
    <h1 class="text-center" style="border-bottom: 1px solid green; padding-bottom: 5px;">Todos</h1>
   
    <div class="row">
      <div class="col-sm-8">
        <div v-if="todos.length">
          <div
            v-for="(todo, index) in todos"
            :key="todo"
            style="padding: 10px; margin-bottom: 10px"
            :class="[todo.isDone ? 'bg-success' : 'bg-light']"
          >
            <div>
              <h4 :class="{ completed: todo.isDone }">{{ todo.title }}</h4>
              <p>{{ formatDate(todo.time) }}</p>
            </div>
            <div>
              <button
                class="btn btn-danger"
                @click="removeTask(index)"
                title="Remove todo"
              >
                Remove
              </button>
              |
              <button
                v-if="!todo.isDone"
                class="btn btn-success"
                @click="taskDone(index)"
                title="Mark as done"
              >
                Mark as Done
              </button>
              <button
                v-else
                class="btn btn-warning"
                @click="taskUndo(index)"
                title="Mark as undone"
              >
                Mark as undone
              </button>
            </div>
          </div>
        </div>
        <div v-else>You dont have any task to do.</div>
      </div>

      <div class="col-sm-4">
        <div>
          <h2>Add a todo</h2>
          <input
            type="text"
            @keydown.enter="addNewItem"
            v-model="item"
            placeholder="Enter your Task and press enter"
            class="form-control"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { reactive, ref } from "@vue/reactivity";
export default {
  name: "TodoCmp",
  setup() {
    const item = ref(null); // reference to input for hold the title
    const todos = reactive([
      { id: 1, title: "One", isDone: true, time: new Date() },
    ]);
    const addNewItem = () => {
      // add a new element at the begining of the array
      todos.unshift({
        id: Math.floor(Math.random() * 100),
        title: item.value,
        isDone: false,
        time: new Date(),
      });
      item.value = "";
    };
    const taskDone = (index) => {
      todos[index].isDone = true;
    };
    const taskUndo = (index) => {
      todos[index].isDone = false;
    };
    const removeTask = (index) => {
      if (confirm("Are you sure ?")) {
        todos.splice(index, 1);
      }
    };

    const padTo2Digits = (num)  => {
      return num.toString().padStart(2, "0");
    };
    /** format date yyyy-mm-dd hh:mm:ss */
    const formatDate = (date) => {
      return (
        [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
        ].join("-") +
        " " +
        [
          padTo2Digits(date.getHours()),
          padTo2Digits(date.getMinutes()),
          padTo2Digits(date.getSeconds()),
        ].join(":")
      );
    }

    return {
      todos,
      addNewItem,
      item,
      taskDone,
      taskUndo,
      removeTask,
      formatDate
    };
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>