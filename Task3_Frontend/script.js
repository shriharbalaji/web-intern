const token = localStorage.getItem("token");
const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
};

if (!token) {
    window.location.href = "login.html";
}

const API_URL = 'http://localhost:5000/api/tasks';

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const priorityInput = document.getElementById('priority-input');
const list = document.getElementById('task-list');
const summary = document.getElementById('task-summary');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';
let tasks = [];

// Fetch all tasks from backend
async function fetchTasks() {
  try {
    const res = await fetch(API_URL, {
      headers
    });
    tasks = await res.json();
    render();
  } catch (err) {
    console.error('Failed to load tasks. Is the backend running on port 5000?', err);
    summary.textContent = 'Could not connect to backend server.';
  }
}

// Add a new task
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;

  await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
        title,
        priority: priorityInput.value
    })
});

  input.value = '';
  fetchTasks();
});

// Toggle complete
async function toggleTask(id) {
  await fetch(`${API_URL}/${id}/toggle`, {
    method: 'PUT',
    headers
});
  fetchTasks();
}

// Delete task
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers
});
  fetchTasks();
}

// Filters
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

function render() {
  let filtered = tasks;
  if (currentFilter === 'active') filtered = tasks.filter(t => !t.completed);
  if (currentFilter === 'completed') filtered = tasks.filter(t => t.completed);

  list.innerHTML = filtered.map(task => `
    <li class="task-item ${task.completed ? 'completed' : ''}">
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask('${task.id}')">
      <span class="task-title">${escapeHtml(task.title)}</span>
      <span class="priority-tag priority-${task.priority}">${task.priority}</span>
      <button class="delete-btn" onclick="deleteTask('${task.id}')">🗑</button>
    </li>
  `).join('');

  const completedCount = tasks.filter(t => t.completed).length;
  summary.textContent = `${tasks.length} tasks · ${completedCount} completed`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Expose functions for inline onclick handlers
window.toggleTask = toggleTask;
window.deleteTask = deleteTask;

// Logout
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");

        window.location.href = "login.html";
    });
}

fetchTasks();
