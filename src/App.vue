<script setup lang="ts">
import { onMounted } from 'vue'
import getData from './fetch.ts'
import { useTodoStore } from './stores/todo.ts'

const todoStore = useTodoStore()

onMounted(() => {
  todoStore.initiate()
})

onMounted(async () => {
  console.log(await getData())
})
</script>

<template>
  <div class="create-task">
    <input v-model="todoStore.inputValue" type="text" placeholder="Опишите задачу">
    <button @click="todoStore.addTask()">Добавить задачу</button>
  </div>
  <ul>
    <li
      v-for="(task, i) in todoStore.tasks"
      :key="task.id"
      :class="{'done': task.done}"
    >
      <div class="task__item">
        <span v-if="!task.editable" class="task__text">{{ task.value }}</span>
        <input v-model="task.value" v-if="task.editable" type="text">
        <div class="task__buttons">
          <button v-if="!task.editable" @click="todoStore.setEditable(i)">Редактировать</button>
          <button v-if="task.editable" @click="todoStore.setEditable(i)">Сохранить</button>
          <button @click="todoStore.doneTask(i)">Выполнить</button>
          <button @click="todoStore.removeTask(i)">X</button>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

li {
  padding: 5px 10px;
  margin-bottom: 15px;
  border: 1px solid rgb(171, 171, 171);
  border-radius: 10px;
}

span {
  display: inline-flex;
  align-items: center;
  height: 40px;
}

input {
  width: 300px;
  height: 40px;
}

.create-task {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.task__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.task__text {
  width: 300px;
  margin: 0;
  word-wrap: break-word;
}

.task__buttons {
  display: flex;
  gap: 10px;
}

.done {
  background-color: rgb(6, 115, 24);
}
</style>
