// Defne UI Variables
const form = document.querySelector("#task-form");
const tasklist = document.querySelector(".collection");
const clearbtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
// Load all event listeners

loadEventListeners();



// Load all event listeners
function loadEventListeners() {
    form.addEventListener('submit', addTask);
    // Remove Task Event
    tasklist.addEventListener("click", removeTask);
    clearbtn.addEventListener("click", clearTask);
    filter.addEventListener('keyup', filterSearch);
    document.addEventListener('DOMContentLoaded', getTasks);
}



// Function addTask
function addTask(e) {
    if (taskInput.value === '') {
        alert('No Task Added');
    }
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement("a");
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    tasklist.appendChild(li);
    // Store in Local Storage
    store_task(taskInput.value);
    taskInput.value = "";
    e.preventDefault();
}
function removeTask(e) {
    // console.log(e.target);
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove()
    }
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}
function clearTask(e) {

    //    tasklist.innerHTML = "";
    while (tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
        // removeTaskFromLocalStorage(tasklist.firstChild.)
    }
    clearTasksFromLocalStorage();
}
function clearTasksFromLocalStorage(){
    localStorage.clear();
}
function filterSearch(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            }
            else {
                task.style.display = 'none';
            }
        }
    );
}
function store_task(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        // console.log(tasks);
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(tasks);
}
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        // console.log(tasks);
    }
    tasks.forEach(function(task) {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));
        const link = document.createElement("a");
        link.className = 'delete-item secondary-content';
        link.innerHTML = link.innerHTML = '<i class = "fa fa-remove"></i>';
        li.appendChild(link);
        tasklist.appendChild(li);
    })
}
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks' === null ))
    {
        tasks  = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));       
    }
    tasks.forEach(function(task,index){
            if(task === taskItem.textContent){
                    tasks.splice(index,1);
            }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));    
}