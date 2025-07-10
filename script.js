// JavaScript for Shreeyans Raj's Personal Hub

// Motivational Quotes
const quotes = [
    "Believe in yourself and all that you are.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "Your limitation—it's only your imagination."
];

// Display a random motivational quote
document.getElementById('motivational-quote').innerText = quotes[Math.floor(Math.random() * quotes.length)];

// Display current date and time
function updateDateTime() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('current-date-time').innerText = now.toLocaleString(undefined, options);
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// To-Do List Functionality
const todoInput = document.getElementById('todoInput');
const addTodo = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo;
        li.addEventListener('click', () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });
        todoList.appendChild(li);
    });
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

addTodo.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (text) {
        todos.push(text);
        saveTodos();
        todoInput.value = '';
        renderTodos();
    }
});

// Initialize todos
renderTodos();

// Notes Functionality
const notesContainer = document.getElementById('notesContainer');
const addNoteBtn = document.getElementById('addNote');

notesContainer.addEventListener('click', (e) => {
    const noteHeader = e.target.closest('.note-header');
    if (noteHeader) {
        noteHeader.nextElementSibling.classList.toggle('note-content');
    }
});

addNoteBtn.addEventListener('click', () => {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';
    
    const noteHeader = document.createElement('div');
    noteHeader.className = 'note-header';
    noteHeader.innerHTML = '<span>New Note</span>';
    
    const noteContent = document.createElement('div');
    noteContent.className = 'note-content';
    noteContent.contentEditable = true;
    noteContent.textContent = 'Click to edit your note...';
    
    noteDiv.appendChild(noteHeader);
    noteDiv.appendChild(noteContent);
    notesContainer.appendChild(noteDiv);
});

// Study Timer Functionality
const studyTimeInput = document.getElementById('studyTime');
const startTimerBtn = document.getElementById('startTimer');
const timerDisplay = document.getElementById('timerDisplay');

startTimerBtn.addEventListener('click', () => {
    let time = parseInt(studyTimeInput.value) * 60;
    if (isNaN(time) || time <= 0) return;

    const interval = setInterval(() => {
        if (time <= 0) {
            clearInterval(interval);
            alert("Time's up!");
            return;
        }
        time--;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
});
