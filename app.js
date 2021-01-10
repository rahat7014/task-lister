// Difine UI Constant.

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');


// add a mathod.

loadEventListeners();

function loadEventListeners() {

    document.addEventListener('DOMContentLoaded', getTasks);

    //add Task
    form.addEventListener('submit', addTask);

    //add Remove task
    taskList.addEventListener('click', removeTask);

    // add Clear
    clearBtn.addEventListener('click', clearTask);

    //add Filter

    filter.addEventListener('keyup', filterTask);
}


function addTask(e) {
    if (taskInput.value === '') {
        alert('Add A task');
    } else {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement('a');
        link.className = 'removeTask secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);

        //store local storage

        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';


        e.preventDefault();

    }

}



function storeTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}


function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'removeTask secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);

    });

}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('removeTask')) {
        if (confirm('Are You Sure')) {
            e.target.parentElement.parentElement.remove();

            removeFromLocalStroage(e.target.parentElement.parentElement);
        }
    }
}

function removeFromLocalStroage(taskItem) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTask(e) {

    taskList.innerHTML = '';

    e.preventDefault();

    //clear from LS
    clearTasksFromLocalStorage();


}

//clear Task from LS

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTask(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });

}
