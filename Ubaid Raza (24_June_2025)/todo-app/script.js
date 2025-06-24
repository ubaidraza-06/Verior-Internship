const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;
    const btn = document.createElement('button');
    btn.textContent = '❌';
    btn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

form.onsubmit = (e) => {
  e.preventDefault();
  tasks.push(input.value);
  input.value = '';
  saveTasks();
};

renderTasks();