const taskOverlay = document.querySelector('.task-overlay');
const addTaskBtn = document.querySelector('.add-task');
const main = document.querySelector('main');
const isOverlayActive = document.querySelector('.is-overlay-active');

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


addTaskBtn.addEventListener('click', () => {
  taskOverlay.classList.add('active');
  isOverlayActive.classList.toggle('active');
  taskOverlay.children[1].value = '';
  taskOverlay.children[2].children[0].value = 'Subject';
  taskOverlay.children[2].children[1].value = getCurrentDate();
  taskInput.focus();
  main.style.opacity = '0.4';
});

saveBtn.addEventListener('click', () => {
  taskOverlay.classList.remove('active');
  isOverlayActive.classList.remove('active');
  main.style.opacity = '1';
});

isOverlayActive.addEventListener('click', () => {
  taskOverlay.classList.remove('active');
  isOverlayActive.classList.remove('active');
  main.style.opacity = '1';
});

