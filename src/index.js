const TASKS_DIV = document.getElementById('tasks-div');
const CREATE_TASK_DIV = document.getElementById('create-task-div');
const EDIT_TASK_DIV = document.getElementById('edit-task-div');
// const VIEW_TASK_DIV = document.getElementById('view-task-div');


const TASK_NAME_INPUT = document.getElementById('task-name-input');
const TASK_DESCRIPTION_INPUT = document.getElementById('task-description-input');
const TASK_HEADING = document.getElementById('task-heading');
const TASK_PERA = document.getElementById('task-pera');
const VIEW_STATUS = document.getElementById('view-status');
const CREATE_STATUSES = document.getElementById('create-statuses');


const CREATE_TASK_BUTTON = document.getElementById('create-task-button');
const CLONE_TASK_BUTTON = document.getElementById('clone-task-button');
const CLOSE_CREATE_TASK_DIV_BUTTON = document.getElementById('close-create-task-div-button');
const ADD_TASK_BUTTON = document.getElementById('add-task-button');

// const CLOSE_VIEW_TASK_DIV_BUTTON = document.getElementById('close-view-task-div-button');
// const EDIT_TASK_BUTTON = document.getElementById('edit-task-button');

const CLOSE_EDIT_TASK_DIV_BUTTON = document.getElementById('close-edit-task-div-button');
const UPDATE_TASK_BUTTON = document.getElementById('update-task-button');


const LEFT_NAV = document.getElementById('left-nav');
const CREATE_TASK_BUTTONS = document.querySelectorAll('.create-task-buttons');

CREATE_TASK_BUTTONS.forEach(button => {
  button.addEventListener('click', () => {
    EDIT_TASK_DIV.classList.add('hidden');
    // VIEW_TASK_DIV.classList.add('hidden');
    cloning = false;
    CLONE_TASK_BUTTON.classList.remove('mode-copying-button');
    renderAllTasks();
    CREATE_TASK_DIV.classList.remove('hidden');
  });
});

document.getElementById('nav-menu-button').addEventListener('click', () => {
  LEFT_NAV.classList.toggle('nav-expanded');
});

const TASKS_LIST = [
  {
    name: 'Test',
    status: 'Not Started',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing…nostrum delectus ipsum veniam eaque eos explicabo'
  },

  {
    name: 'Do task',
    status: 'Not Started',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing…dem fugit autem corporis quo ipsam necessitatibus'
  },

  {
    name: 'Something',
    status: 'Not Started',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing at nemo labore facere sapiente laborum ad dolorem'
  },

  {
    name: 'Dummy task',
    status: 'Not Started',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing enetur facere minima ipsa voluptate nihil dolorem'
  },

  {
    name: 'To fill List',
    status: 'Not Started',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicin minima accusantium nesciunt ut consequatur porro'
  },

  {
    name: ':)',
    status: 'Not Started',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicingimi atque, ab maiores qui corrupti quis architect'
  }
];

var cloning = false;
var editingIndex = null;


// CREATE_TASK_BUTTON.addEventListener('click', () => {
//   EDIT_TASK_DIV.classList.add('hidden');
//   cloning = false;
//   CLONE_TASK_BUTTON.classList.remove('mode-copying-button');
//   renderAllTasks();
//   CREATE_TASK_DIV.classList.remove('hidden');
// });

CLOSE_CREATE_TASK_DIV_BUTTON.addEventListener('click', () => {
  CREATE_TASK_DIV.classList.add('hidden');
  TASK_NAME_INPUT.value = '';
  TASK_DESCRIPTION_INPUT.value = '';
});


CLONE_TASK_BUTTON.addEventListener('click', () => {
  cloning = !cloning;

  document.querySelectorAll('.task').forEach(taskDiv => {
    if (cloning) {
      CLONE_TASK_BUTTON.classList.add('mode-copying-button');
      taskDiv.classList.add('mode-copying');

    } else {
      CLONE_TASK_BUTTON.classList.remove('mode-copying-button');
      taskDiv.classList.remove('mode-copying');
    }
  });
});


ADD_TASK_BUTTON.addEventListener('click', () => {
  if (TASK_NAME_INPUT.value.trim() === '') {
    alert('Please fill in the task name.');
    return;
  }

  createNewTaskInList(TASK_NAME_INPUT.value, CREATE_STATUSES.value, TASK_DESCRIPTION_INPUT.value);
  updateLocalStorage();
  renderAllTasks();

  CREATE_TASK_DIV.classList.add('hidden');
  TASK_NAME_INPUT.value = '';
  TASK_DESCRIPTION_INPUT.value = '';
});

// CLOSE_VIEW_TASK_DIV_BUTTON.addEventListener('click', () => {
//   VIEW_TASK_DIV.classList.add('hidden');
// });

// EDIT_TASK_BUTTON.addEventListener('click', () => {
//   VIEW_TASK_DIV.classList.add('hidden');
//   openEditDiv(editingIndex);
// });

CLOSE_EDIT_TASK_DIV_BUTTON.addEventListener('click', () => {
  EDIT_TASK_DIV.classList.add('hidden');
});

UPDATE_TASK_BUTTON.addEventListener('click', () => {
  if (editingIndex === null) return;
  if (document.getElementById('task-name').value.trim() === '') {
    alert('Task name cannot be empty.');
    return;
  }

  TASKS_LIST[editingIndex].name = document.getElementById('task-name').value;
  TASKS_LIST[editingIndex].status = document.getElementById('statuses').value;
  TASKS_LIST[editingIndex].description = document.getElementById('task-description').value;

  updateLocalStorage();
  renderAllTasks();

  EDIT_TASK_DIV.classList.add('hidden');
  editingIndex = null;
});



window.onload = () => {
  document.getElementById('message').classList.toggle('hidden', TASKS_LIST.length > 0);
}

// Initial load of tasks from localStorage
loadTasksFromLocalStorage();
renderAllTasks();


// localStorage.setItem('TASKS', '[{"name":"Test","description":"testing 1,2,3.. somehting something.... something.."},{"name":"Do task","description":"do this, do that, do something, do anything..."},{"name":"Testmwymwy","description":"ttmstmswtmngoiutyrjmgdhmshgdejes.."},{"name":"Do sdf aoi","description":"fi erhgeirug iru ckvniher..."},{"name":"j ajo joasi","description":"f oha rhrhie her ierunfvk.."},{"name":"oasi oi oo","description":"eu fihf iheuhrgerhhing..."}]')
// localStorage.setItem('TASKS', '[{"name":"Test","status":"Not Started","description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem placeat nostrum delectus ipsum veniam eaque eos explicabo"},{"name":"Do task","status":"Completed","description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Id at quidem fugit autem corporis quo ipsam necessitatibus"},{"name":"Something","status":"Not Started","description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti fugiat nemo labore facere sapiente laborum ad dolorem"},{"name":"Dummy task","status":"In Progress","description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis tenetur facere minima ipsa voluptate nihil dolorem"},{"name":"To fill List","status":"Completed","description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae id minima accusantium nesciunt ut consequatur porro"},{"name":":)","status":"On Hold","description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus cumque animi atque, ab maiores qui corrupti quis architect"},{"name":".................","status":"Blocked","description":"hello\\nhi\\nyo\\nsomething\\n...   ...\\n...   ...\\n  .....\\n  .....\\n ..   ..\\n ..   .."},{"name":"BITSAT DOUBTS","status":"In Progress","description":"1.) Q.22, page no. 285\\n"}]');
