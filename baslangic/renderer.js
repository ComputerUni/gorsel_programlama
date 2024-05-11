const { ipcRenderer } = require('electron');

const todos = [
    { text: 'Günlük hedef', interval: 'daily' },
    { text: 'Haftalık hedef', interval: 'weekly' },
    { text: 'Aylık hedef', interval: 'monthly' },
    { text: 'Yıllık hedef', interval: 'yearly' }
];

const todoList = document.getElementById('todos');

todos.forEach(todo => {
    const todoElement = document.createElement('div');
    todoElement.textContent = todo.text;
    todoList.appendChild(todoElement);
    setTimeout(() => {
        ipcRenderer.send('show-message-box', `Bu hedefi tamamladınız mı? "${todo.text}"`);
    }, getTimeInterval(todo.interval));
});

function getTimeInterval(interval) {
    switch (interval) {
        case 'daily':
            return 24 * 60 * 60 * 1000; // 1 day
        case 'weekly':
            return 7 * 24 * 60 * 60 * 1000; // 1 week
        case 'monthly':
            return 30 * 24 * 60 * 60 * 1000; // 1 month
        case 'yearly':
            return 365 * 24 * 60 * 60 * 1000; // 1 year
        default:
            return 24 * 60 * 60 * 1000; // default to daily
    }
}
