const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const darkToggle = document.getElementById("darkModeToggle");
const body = document.body;

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let isDark = localStorage.getItem("darkMode") === "true";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function saveTask(index) {
    const input = document.getElementById(`edit-input-${index}`);
    const newText = input.value.trim();

    if (newText !== "") {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
}

function renderTasks() {
    todoList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
           <span id="text-${index}">${task.text}</span>
          <div class="actions">
            <button class="done" onclick="editTask(${index})">🖊️</button>
            <button class="delete" onclick="deleteTask(${index})">🗑️</button>
          </div>
        `;

        todoList.appendChild(li);
    });
}
function editTask(index) {
    const span = document.getElementById(`text-${index}`);
    const currentText = tasks[index].text;

    span.innerHTML = `
        <input type="text" class="editInput" id="edit-input-${index}" value="${currentText}">
        <button class="editBtn" onclick="saveTask(${index})">✓</button>
    `;
}



function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    tasks.push({ text, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleDarkMode() {
    isDark = !isDark;
    localStorage.setItem("darkMode", isDark);
    updateDarkMode();
}

function updateDarkMode() {
    if (isDark) {
        body.classList.add("dark");
        darkToggle.textContent = "☀️";
    } else {
        body.classList.remove("dark");
        darkToggle.textContent = "🌙";
    }
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});
darkToggle.addEventListener("click", toggleDarkMode);

renderTasks();
updateDarkMode();

window.toggleComplete = toggleComplete;
window.deleteTask = deleteTask;
window.editTask = editTask;
window.saveTask = saveTask;