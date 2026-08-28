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
    name: 'Welcome',
    status: 'Completed',
    description: 'Hello,\nI am Rudra Sharma, the creator of this web-app.\nThank You for using this.'
  },

  {
    name: 'Create new Task',
    status: 'In Progress',
    description: 'Click the "Create New Task" on the home screen or "Create" in the side-navigation panel.\nType the Heading, Select the Status of your task, and write the description.\nAND "ADD THE TASK"!!\n\nNow you know how to create a new task!!'
  },

  {
    name: 'Side-Navigation Panel',
    status: 'Not Started',
    description: 'The side nav or navigation panel is not completely functional yet.\n\nButtons which works:\nMenu-Toggle :- toggles the view of the nav-bar to be minimal or maximized.\nHome :- sends you to home/main menu of the current Task-Manager.\nCreate :- same as the "Create New Task" in the home menu.\n\nButtons Idea for future:\nCreate :- this would have functionality to create folders.\nPlus :- and this would have option to create a normal text file or a TODO style page, etc.\nDelete :- click this and you would go the the deleting mode and you could delete multiple files at the same time.\nSetting :- Customize the whole Task-Management (at lest most useful and important features and themes).'
  },

  {
    name: 'Features',
    status: 'Completed',
    description: "There are some following features in this web-app.\n\nConfirmation:\n - if you mistakenly click the cross(X) button, then the task won't be deleted\n - if you are editing an existing task and clicked 'X' you will have to confirm about losing your edited data."
  },

  {
    name: 'Things Which Should Be In This',
    status: 'On Hold',
    description: 'if you mistakenly click the cross button while creating New Task then unfortunately if wont confirm you and simply delete your progress. SO SHOULD I ADD THE CONFIRMATION THERE?\n{I need motivation for that, please give me :) }'
  },

  {
    name: 'Task Manager Updates',
    status: 'In Progress',
    description: `'Edit Panel' Plan :\n[ ] - add a conformation popup(if there were any changes) when closing a edited task.\n[ ] - don't exit when 'Update Task' clicked each time -- feels inaccurate.\n[ ] - should be able to scroll the whole page not only the 'text-area'\n[ ] - CSS\n      - [ ] - smooth opening/closing animation\n      - [ ] -\n\n\nUI/UX :\n[ ] - Add smooth animations.\n[ ] -\n\n\nFunctions :\n[ ] - Add fondleable buttons.\n      -- the delete button should work.\n\n[ ] - Add Filters.\n      -- Not Started, In Progress, Completed, On Hold, Blocked\n\n[ ] - Settings\n      -- Make most of the things customizable.\n\n[ ] - SAVE/LOAD: save/load the entire file locally.`
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
  const isTaskEdited = (document.getElementById('task-name').value !== TASKS_LIST[editingIndex].name) ||
    (document.getElementById('task-description').value !== TASKS_LIST[editingIndex].description) ||
    (document.getElementById('statuses').value !== TASKS_LIST[editingIndex].status);
  if (isTaskEdited) {
    const confirmation = confirm(`The Changes you made will be lost. Are you sure you want to close?`);
    if (!confirmation) {
      return;
    }
  }
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

  if (window.innerWidth <= 768) {
    LEFT_NAV.classList.remove('nav-expanded');
  }
}

// window.addEventListener('DOMContentLoaded', () => {
//   // Check if screen width is mobile size
//   if (window.innerWidth <= 768) {
//     const myDiv = document.getElementById('my-div');
//     myDiv.classList.add('mobile-only-class');
//   }
// });


// Initial load of tasks from localStorage
loadTasksFromLocalStorage();
renderAllTasks();


// localStorage.setItem("TASKS", `[{"name":"Welcome","status":"Completed","description":"Hello,\\nI am Rudra Sharma, the creator of this web-app.\\nThank You for using this."},{"name":"Create new Task","status":"In Progress","description":"Click the \\"Create New Task\\" on the home screen or \\"Create\\" in the side-navigation panel.\\nType the Heading, Select the Status of your task, and write the description.\\nAND \\"ADD THE TASK\\"!!\\n\\nNow you know how to create a new task!!"},{"name":"Side-Navigation Panel","status":"Not Started","description":"The side nav or navigation panel is not completely functional yet.\\n\\nButtons which works:\\nMenu-Toggle :- toggles the view of the nav-bar to be minimal or maximized.\\nHome :- sends you to home/main menu of the current Task-Manager.\\nCreate :- same as the \\"Create New Task\\" in the home menu.\\n\\nButtons Idea for future:\\nCreate :- this would have functionality to create folders.\\nPlus :- and this would have option to create a normal text file or a TODO style page, etc.\\nDelete :- click this and you would go the the deleting mode and you could delete multiple files at the same time.\\nSetting :- Customize the whole Task-Management (at lest most useful and important features and themes)."},{"name":"Features","status":"Completed","description":"There are some following features in this web-app.\\n\\nConformation:\\n - if you mistakenly click the cross(X) button, then the task won't be deleted\\n - if you are editing an existing task and clicked 'X' you will have to confirm about losing your edited data."},{"name":"Things Which Should Be In This","status":"On Hold","description":"if you mistakenly click the cross button while creating New Task then unfortunately if wont confirm you and simply delete your progress. SO SHOULD I ADD THE CONFIRMATION THERE?\\n{I need motivation for that, please give me :) }"},{"name":"Task Manager Updates","status":"In Progress","description":"'Edit Panel' Plan :\\n[ ] - add a conformation popup(if there were any changes) when closing a edited task.\\n[ ] - don't exit when 'Update Task' clicked each time -- feels inaccurate.\\n[ ] - should be able to scroll the whole page not only the 'text-area'\\n[ ] - CSS\\n      - [ ] - smooth opening/closing animation\\n      - [ ] -\\n\\n\\nUI/UX :\\n[ ] - Add smooth animations.\\n[ ] -\\n\\n\\nFunctions :\\n[ ] - Add fondleable buttons.\\n      -- the delete button should work.\\n\\n[ ] - Add Filters.\\n      -- Not Started, In Progress, Completed, On Hold, Blocked\\n\\n[ ] - Settings\\n      -- Make most of the things customizable.\\n\\n[ ] - SAVE/LOAD: save/load the entire file locally."}]`);