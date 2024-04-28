const draggableListItems = document.querySelectorAll('.draggable-list li');
const endMessage = document.getElementById('endMessage');
const wrongMessage = document.getElementById('wrongMessage');

// current phrase being dragged
let selectedId;

// target phrase
let dropTargetId;

// counter for correct phrases
let matchingCounter = 0;

addEventListeners();

function dragStart() {
  selectedId = this.id;
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragOver(ev) {
  ev.preventDefault();
}

function dragDrop() {
  dropTargetId = this.id;

  if (checkForMatch(selectedId, dropTargetId)) {
    document.getElementById(selectedId).style.display = 'none';
    document.getElementById(dropTargetId).style.display = 'flex';
    matchingCounter++;
  } /*else if (checkForMatch2(selectedId, dropTargetId)) {
    document.getElementById(selectedId).style.display = 'none';
    document.getElementById(dropTargetId).style.display = 'none';
    matchingCounter++;
  }
*/
  if (matchingCounter === 5) {
    endMessage.style.display = 'block';
  }
  
  this.classList.remove('over');
}

function checkForMatch(selected, dropTarget) {
  switch (selected) {
    case 'e1':
      return dropTarget === 's1' ? true : false;

    case 'e2':
      return dropTarget === 's1' ? true : false;

    case 'e3':
      return dropTarget === 's1' ? true : false;

    case 'e4':
      return dropTarget === 's1' ? true : false;

    case 'e5':
      return dropTarget === 's1' ? true : false;

    default:
      return false;
  }
}
/*
function checkForMatch2(selected, dropTarget) {
  switch (selected) {
    case 's6':
      return dropTarget === 's1' ? true : false;

    case 's2':
      return dropTarget === 's1' ? true : false;

    case 's3':
      return dropTarget === 's1' ? true : false;

    case 's4':
      return dropTarget === 's1' ? true : false;

    case 's5':
      return dropTarget === 's1' ? true : false;

    default:
      return false;
  }
}
*/

const sound = new Audio("../sounds/mixkit-animated-small-group-applause-523.wav")
               
function playAgain() {
  matchingCounter = 0;
  endMessage.style.display = 'none';
  draggableListItems.forEach(item => {
    document.getElementById(item.id).style.display = 'flex';
  });
  sound.play();
  setTimeout(() => {
      window.location.replace("http://127.0.0.1:5501/static/templates/home.html");
  }, 3000);
}

function addEventListeners() {
  draggableListItems.forEach (item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragleave', dragLeave);
  })
}