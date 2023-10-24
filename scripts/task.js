const taskInput = document.querySelector('.task-input');
const subjectSelector = document.querySelector('.subject-selector');
const dateInput = document.querySelector('.date-input');
const saveBtn = document.querySelector('.save-btn');
let taskCount = document.querySelector('.task-count');
const taskBox = document.querySelector('.task-box');

taskBox.innerHTML = `<li class="no-tasks">You have no tasks to be done!</li>`;

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
    taskBox.innerHTML = div;
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
    <button class="editBtn">Edit</button>
    <button class="deleteBtn">Delete</button>
  </div>
</div>
`;

  taskOverlay.innerHTML = html;

  taskOverlay.classList.add('active');
  isOverlayActive.classList.toggle('active');
  main.style.opacity = '0.4';

  isOverlayActive.addEventListener('click', () => {
    taskOverlay.classList.remove('active');
    isOverlayActive.classList.remove('active');
    main.style.opacity = '1';
    taskOverlay.innerHTML = `<p class="task-overlay-title">Add Task</p>
    <input type="text" class="task-input" placeholder="What's your Task?">
    <div class="wrapper">
      <select name="subject" id="subject" class="subject-selector">
        <option>Subject</option>
        <option value="Deutsch">Deutsch</option>
        <option value="Mathe">Mathe</option>
        <option value="Englisch">Englisch</option>
        <option value="Religion">Religion</option>
        <option value="Geschichte">Geschichte</option>
      </select>
      <input type="date" name="task-date" id="date" class="date-input">
    </div>
    <button class="save-btn">Save</button>`;
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