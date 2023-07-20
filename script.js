let tasks = [];
let taskNumber = 1;

const inputField = document.getElementById('todo-input');  // <----------
inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

const addTask = () => {
    const input = document.getElementById('todo-input');
    const newTask = input.value.trim();
    input.value = '';

    if (newTask === '')
        return;

    const duplicate = tasks.find(task => task.name === newTask);
    if (duplicate) {
        alert('Task already exists!');
        return;
    }
    
    tasks.push({
        id: taskNumber,
        name: newTask,
        done: false
    });
    taskNumber++;
    saveTasksToLocalStorage(tasks);
    refreshTasks();
}

const removeTask = (index) => {
    tasks.splice(index, 1);
    saveTasksToLocalStorage(tasks);
    refreshTasks();
}

const toggleDone = (index) => {
    tasks[index].done = !tasks[index].done;
    saveTasksToLocalStorage(tasks);
    refreshTasks();
}

const refreshTasks = () => {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    tasks.forEach((task, i) => {
        const li = document.createElement('li');
        
        if (task.done) {
            li.style.textDecoration = 'line-through';
        }
        
        li.innerHTML = `
            <strong>${task.id}.</strong>
            ${task.name} 
            <button class="done-btn" onclick="toggleDone(${i})">Mark Done</button>
            <button class="remove-btn" onclick="removeTask(${i})">Remove</button>`;
            
        todoList.appendChild(li);
    });
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if(storedTasks) {
        return JSON.parse(storedTasks);
    }else{
        return [];
    }
}

const appTitle = document.getElementById('app-title');
appTitle.addEventListener('click', () => {
    tasks = [];
    taskNumber = 1;
    saveTasksToLocalStorage(tasks);
    refreshTasks();
});

document.addEventListener("DOMContentLoaded", () => {
    tasks = getTasksFromLocalStorage();
    refreshTasks();
});
