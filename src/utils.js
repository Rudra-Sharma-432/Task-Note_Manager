function addTaskToDOM(name, status, description, index) {
  const newTaskDiv = document.createElement('div');
  newTaskDiv.classList.add('task');
  newTaskDiv.id = `task-${index}`;

  newTaskDiv.addEventListener('click', (e) => {
    if (e.target === deleteButton) return;
    if (cloning) {
      const index = parseInt(newTaskDiv.id.split('-')[1]);
      const taskToClone = TASKS_LIST[index];

      createNewTaskInList('(Copy) ' + taskToClone.name, taskToClone.status, taskToClone.description);
      updateLocalStorage();
      renderAllTasks();

      cloning = false;
      CLONE_TASK_BUTTON.classList.remove('mode-copying-button');
    } else {
      openViewDiv(index);
    }
  });

  const newTaskName = document.createElement('h3');
  newTaskName.textContent = name;

  const newSpan = document.createElement('span');
  newSpan.innerText = ` ${status}`;
  newSpan.classList.add('status');
  newSpan.style.fontSize = '14px';
  newSpan.style.color = '#888';

  const newTaskDescription = document.createElement('p');
  newTaskDescription.textContent = description;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '✖';
  deleteButton.classList.add('x-button');
  deleteButton.onclick = () => deleteThisTask(index, name);

  newTaskDiv.appendChild(newTaskName);
  newTaskDiv.appendChild(newSpan);
  newTaskDiv.appendChild(deleteButton);
  newTaskDiv.appendChild(newTaskDescription);
  TASKS_DIV.appendChild(newTaskDiv);
}

function createNewTaskInList(name, status, description) {
  const newTaskId = TASKS_LIST.length;
  TASKS_LIST[newTaskId] = {
    name,
    status,
    description
  };
}

function deleteThisTask(index, taskName) {
  const confirmation = confirm(`Are you sure you want to delete ${taskName}?`);
  if (confirmation) {
    // Remove from TASKS_LIST
    TASKS_LIST.splice(index, 1);

    // Remove from localStorage
    updateLocalStorage();

    // Re-render tasks to update indices and DOM
    renderAllTasks();

  }
}

function updateLocalStorage() {
  localStorage.setItem('TASKS', JSON.stringify(TASKS_LIST));
}

function loadTasksFromLocalStorage() {
  const saved = localStorage.getItem('TASKS');
  if (saved) {
    TASKS_LIST.length = 0;
    try {
      JSON.parse(saved).forEach(task => TASKS_LIST.push(task));
    } catch (e) {
      console.warn('Failed to load tasks from localStorage.');
    }
  }
}

function renderAllTasks() {
  TASKS_DIV.innerHTML = ''; // Clear existing tasks in the DOM
  TASKS_LIST.forEach((task, index) => {
    addTaskToDOM(task.name, task.status, truncate(task.description, 120), index);
  });
}

function openViewDiv(index) {
  CREATE_TASK_DIV.classList.add('hidden');
  EDIT_TASK_DIV.classList.add('hidden');

  editingIndex = index;
  TASK_HEADING.innerText = TASKS_LIST[index].name;
  VIEW_STATUS.innerText = `Status: ${TASKS_LIST[index].status}`;
  TASK_PERA.innerText = TASKS_LIST[index].description;
  VIEW_TASK_DIV.classList.remove('hidden');
}

function openEditDiv(index) {
  CREATE_TASK_DIV.classList.add('hidden');
  VIEW_TASK_DIV.classList.add('hidden');

  editingIndex = index;
  document.getElementById('task-name').value = TASKS_LIST[index].name;
  document.getElementById('statuses').value = TASKS_LIST[index].status;
  document.getElementById('task-description').value = TASKS_LIST[index].description;
  EDIT_TASK_DIV.classList.remove('hidden');
}

function truncate(description, n) {
  if (!description) return ""; // Handle if description doesn't exist
  return description.length > n 
    ? description.slice(0, n) + "..." 
    : description;
}