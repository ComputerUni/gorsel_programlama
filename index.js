// index.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const localStorage = require('localStorage');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL(`file://${__dirname}/index.html`);

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

// Add task event listener
document.getElementById('add-task-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const taskName = document.getElementById('task-name').value;
  const frequency = document.getElementById('frequency').value;
  const dueDate = document.getElementById('due-date').value;
  addTask(taskName, frequency, dueDate);
});

// Add goal event listener
document.getElementById('add-goal-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const goalName = document.getElementById('goal-name').value;
  const targetDate = document.getElementById('target-date').value;
  addGoal(goalName, targetDate);
});

// Add task function
function addTask(taskName, frequency, dueDate) {
  const tasks = localStorage.getItem('tasks') || [];
  tasks.push({ name: taskName, frequency, dueDate });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Add goal function
function addGoal(goalName, targetDate) {
  const goals = localStorage.getItem('goals') || [];
  goals.push({ name: goalName, targetDate });
  localStorage.setItem('goals', JSON.stringify(goals));
  renderGoals();
}

// Render tasks function
function renderTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
}