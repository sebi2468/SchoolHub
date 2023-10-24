const taskInput = document.querySelector('.task-input');
const subjectSelector = document.querySelector('.subject-selector');
const dateInput = document.querySelector('.date-input');
const saveBtn = document.querySelector('.save-btn');
const saveEditBtn = document.querySelector('.save-edit-btn');
let taskCount = document.querySelector('.task-count');
const taskBox = document.querySelector('.task-box');
const taskDetailsOverlay = document.querySelector('.task-details-overlay');
const editTaskOverlay = document.querySelector('.edit-task-overlay');

let tasks = JSON.parse(localStorage.getItem('task-list'));

function showTasks() {
let div = "";
  if (tasks) {
    tasks.forEach((task, id) => {
      let originalDate = task.date;

      // Parse the original date string
      let parts = originalDate.split("-");
      let year = parts[0].slice(-2); // Get the last two digits of the year
      let month = parts[1];
      let day = parts[2];

      // Create the formatted date string
      let formattedDate = `${day}.${month}.${year}`;

      let isDone = task.status === 'done' ? 'checked' : '';

      div += `<div class="task ${isDone}">
                <div class="task-grid" onclick="showTaskDetails(${id})">
                    <div class="subject">${task.subject.substring(0, 3).toUpperCase()}</div>
                    <div class="task-name">${task.name}</div>
                    <div class="task-date">${formattedDate}</div>
                </div>
                <input type="checkbox" onclick="updateStatus(this), countTasks()" id="${id}" ${isDone} class="task-check">
                <label for="${id}" class="checkbox">
                  <svg viewBox="0 0 22 16" fill="none">
                    <path d="M1 6.85L8.09677 14L21 1" />
                  </svg>
                </label>
          </div>`
    })
    taskBox.innerHTML = div || `<div class="no-tasks">You have no tasks right now!</div>`;
  }
};

showTasks()

function countTasks() {

  if (tasks) {
    let pendingTaskCount = tasks.reduce((count, task) => {
      if (task.status === 'pending') {
        return count + 1;  
      }
      return count;
    }, 0);
    
    taskCount.innerHTML = pendingTaskCount;  
  }

  
}

countTasks()

function updateStatus(selectedTask) {

  if (selectedTask.checked) {

    setTimeout(() => {
      if (selectedTask.checked) {
        selectedTask.parentElement.style.opacity = '.4';
      }
    }, 1000)

    tasks[selectedTask.id].status = 'done';

  } else {
    selectedTask.parentElement.style.opacity = '1';
    tasks[selectedTask.id].status = 'pending';
  }

  localStorage.setItem('task-list', JSON.stringify(tasks));

}


function showTaskDetails(id) {

  let originalDate = tasks[id].date;

      // Parse the original date string
      let parts = originalDate.split("-");
      let year = parts[0].slice(-2); // Get the last two digits of the year
      let month = parts[1];
      let day = parts[2];

      // Create the formatted date string
      let formattedDate = `${day}.${month}.${year}`;

  html = `
  <p class="task-overlay-title">Task Details</p>
  <div class="info">
    <div class="text-wrapper">
      <p class="name">${tasks[id].name}</p>
      <p class="subj"><span>in</span> ${tasks[id].subject}</p></div>
      <p class="date">${formattedDate}</p>
  </div>
  <div class="btn-wrapper">
    <button class="editBtn" onclick="editTask(${id}, '${tasks[id].name}')">Edit</button>
    <button class="deleteBtn" onclick="deleteTask(${id})">Delete</button>
  </div>
</div>
`;

  taskDetailsOverlay.innerHTML = html;

  taskDetailsOverlay.classList.add('active');
  isOverlayActive.classList.toggle('active');
  main.style.opacity = '0.4';

  isOverlayActive.addEventListener('click', () => {
    taskDetailsOverlay.classList.remove('active');
    isOverlayActive.classList.remove('active');
    main.style.opacity = '1';
  });
}

function deleteTask(deleteId) {
  tasks.splice(deleteId, 1);
  localStorage.setItem('task-list', JSON.stringify(tasks));
  showTasks();
  taskDetailsOverlay.classList.remove('active');
  isOverlayActive.classList.remove('active');
  main.style.opacity = '1';
  countTasks();
}

function editTask(taskId, taskName) {
  console.log(taskId, taskName);

  taskDetailsOverlay.classList.remove('active');
  editTaskOverlay.classList.add('active');
  isOverlayActive.classList.add('active');
  editTaskOverlay.children[1].value = taskName;
  editTaskOverlay.children[2].children[0].value = tasks[taskId].subject;
  editTaskOverlay.children[2].children[1].value = tasks[taskId].date;
  taskInput.focus();
  main.style.opacity = '0.4';

  isOverlayActive.addEventListener('click', () => {
    editTaskOverlay.classList.remove('active');
    isOverlayActive.classList.remove('active');
    main.style.opacity = '1';
  });

  saveEditBtn.addEventListener('click', () => {
    editTaskOverlay.classList.remove('active');
    isOverlayActive.classList.remove('active');
    main.style.opacity = '1';

    tasks[taskId].name = editTaskOverlay.children[1].value.trim();
    tasks[taskId].subject = editTaskOverlay.children[2].children[0].value;
    tasks[taskId].date = editTaskOverlay.children[2].children[1].value;
    localStorage.setItem('task-list', JSON.stringify(tasks));
    showTasks();

  });

}


saveBtn.addEventListener('click', () => {
  let userTask = taskInput.value.trim();
  let subject = subjectSelector.value;
  let date = dateInput.value;

  if (userTask && subject && date) {

    if (!tasks) {
      tasks = [];
    }

    let taskInfo = { name: userTask, subject: subject, date: date, status: 'pending' };
    tasks.push(taskInfo);
    localStorage.setItem('task-list', JSON.stringify(tasks));
    showTasks();
    countTasks();
  }
})