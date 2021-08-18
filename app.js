// Defining UI variables from html source
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearButton = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Loading event listeners 
loadeventlisteners()

// Create a function that loads all eventlisteners 
function loadeventlisteners(){
// add eventlistener to the form which activates on submit and triggers the addTask function
    form.addEventListener('submit', addTask)
// remove task event
    taskList.addEventListener('click', removeTask)
// remove all tasks event 
    clearButton.addEventListener('click', clearTasks)
// filter all tasks based on user input
    filter.addEventListener('keyup', filterTasks)
}
// addTask function checks if the value the input is empty or not if it is, an alert will pop up
function addTask(event){
    if(taskInput.value === ''){
        alert('Add A Task!')
    }
// creating the list element (li) if the input is not empty
    const li = document.createElement('li')
// assigning a class name to li and assigning it as is because materialize makes 'collection-items' look better
    li.className = 'collection-item'
// creating a new textNode and appending it to the li so that the user input is visible on the screen after it is submitted
    li.appendChild(document.createTextNode(taskInput.value))
// need the link element so that the red X icon is visible 
    const link = document.createElement('a')
// pressing the link removes the input from the list, secondary-content makes the red X appear on the right of the list element
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i class="fa fa-remove"></i>'
// appending link to the li 
    li.appendChild(link)
// appending the li to the ul
    taskList.appendChild(li)
// clear input by making the default to a string
    taskInput.value = ''
    event.preventDefault()
}

// remove a task
function removeTask(event){
    if(event.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
        event.target.parentElement.parentElement.remove()
        }
    }
}

// remove all tasks
// look up why this does not need an 'event' argument 
function clearTasks() {
// while the taskList has a child element, remove that child until nothing is left
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
}

// filter Tasks
function filterTasks(event) {
// set a variable to equal the value of the target of the event, converted to lower case
    const userInput = event.target.value.toLowerCase();
// selecting all elements with a class of 'collection-item, iterating through it
// querySelectorAll returns a NodeList, array methods can be used on it
    document.querySelectorAll('.collection-item').forEach(function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(userInput) != -1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
  }