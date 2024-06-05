// UI elements
let form = document.querySelector('#task_form');
let taskInput = document.querySelector('#new_task');
let showTask = document.querySelector('#show_task');
let filterTask = document.querySelector('#search_task');
let clearTask = document.querySelector('#clear_task');

// Define function for adding a task
form.addEventListener('submit', addTask);
showTask.addEventListener('click', removeTask);
clearTask.addEventListener('click', clearAllTasks);
filterTask.addEventListener('keyup', filterTasks);
document.addEventListener('DOMContentLoaded', getTasks);

function addTask(e) {
    e.preventDefault();  // Prevent form submission
    if (taskInput.value === '') {
        alert('Please add a task');
    } else {
        // Create a list item
        let li = document.createElement('li');
         li.appendChild(document.createTextNode(taskInput.value + ' '));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
        showTask.appendChild(li);
      
        storeTaskInLocalStorage(taskInput.value);


        taskInput.value = '';
    }
}

// Define function for removing a task
function removeTask(e) {
    if (e.target.hasAttribute('href')) {
        if (confirm('Are you sure you want to delete this task?')) {
            let li = e.target.parentElement;
            showTask.removeChild(li);
            removeFromLS(li);
        }
    }
}

// Define function for clearing all tasks
function clearAllTasks() {
    //showTask.innerHTML = '';

    //faster

    while (showTask.firstChild) {
        showTask.remove(showTask.firstChild)
    }
    
}

// Define function for filtering tasks
function filterTasks(e) {
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// loacl stroge

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + ' '));
       let link = document.createElement('a');
       link.setAttribute('href', '#');
       link.innerHTML = 'x';
       li.appendChild(link);
       showTask.appendChild(li);
    })
}

function removeFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild); // <a>x</a>'

    tasks.forEach((task, index) =>{
        if(li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


