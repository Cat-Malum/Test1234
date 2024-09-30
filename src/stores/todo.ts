import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface TaskItem {
  id: number,
  value: string,
  done: boolean,
  editable: boolean
}

export const useTodoStore = defineStore('todo', () => {
  const tasks = ref<TaskItem[]>([])
  const inputValue = ref('')
  
  const initiate = () => {
    try {
      tasks.value = JSON.parse(localStorage.getItem('tasks') || '[]')
    } catch (e) {
      tasks.value = []
    }
    
    watch(tasks, () => {
      localStorage.setItem('tasks', JSON.stringify(tasks.value))
    }, { deep: true })
  }

  const addTask = () => {
    if (inputValue.value !== '') {
      const task = {
        id: Date.now(),
        value: inputValue.value,
        done: false,
        editable: false
      }
      tasks.value.push(task)
      inputValue.value = ''
    }
  }

  const removeTask = (taskIdx: number) => {
    tasks.value.splice(taskIdx, 1)
  }

  const setEditable = (taskIdx: number) => {
    const task = tasks.value[taskIdx]
    task.editable = !task.editable
  }

  const doneTask = (taskIdx: number) => {
    const task = tasks.value[taskIdx]
    task.done = !task.done
  }

  return {
    tasks,
    inputValue,
    initiate,
    addTask,
    removeTask,
    setEditable,
    doneTask,
  }
})
