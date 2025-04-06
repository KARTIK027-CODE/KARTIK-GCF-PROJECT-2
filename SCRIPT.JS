let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;
let completedSlots = 0;

const timerDisplay = document.getElementById("timer");
const slotCountDisplay = document.getElementById("slotCount");
const timeSelect = document.getElementById("time-select");

timeSelect.addEventListener("change", () => {
  resetTimer();
  minutes = parseInt(timeSelect.value);
  updateDisplay();
});

function updateDisplay() {
  let min = minutes < 10 ? "0" + minutes : minutes;
  let sec = seconds < 10 ? "0" + seconds : seconds;
  timerDisplay.textContent = `${min}:${sec}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          isRunning = false;
          completedSlots++;
          slotCountDisplay.textContent = completedSlots;
          alert("Pomodoro complete!");
          resetTimer();
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }
      updateDisplay();
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  minutes = parseInt(timeSelect.value);
  seconds = 0;
  updateDisplay();
}


function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${taskText}</span>
      <button onclick="removeTask(this)">Done</button>
    `;
    taskList.appendChild(li);
    taskInput.value = "";
  }
}

function removeTask(btn) {
  const li = btn.parentElement;
  li.remove();
}

updateDisplay();
