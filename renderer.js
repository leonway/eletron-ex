const { ipcRenderer } = require("electron");
const Timer = require("timer.js");

function startWork(params) {
  let workTimer = new Timer({
    ontick: () => {
      updateTime();
    },
    onend: () => {
      notification;
    },
  });
  workTimer.start(10);
}

function updateTime(ms) {
  let timerContainer = document.getElementById("timer-container");
  timerContainer.innerText = ms;
}

async function name(params) {
  let res = await ipcRenderer.invoke("work-notification");
  if (res === "reset") {
    setTimeout(() => {
      alert("休息");
    }, 5 * 1000);
  } else if (res === "work") {
    startWork();
  }
}

startWork();
