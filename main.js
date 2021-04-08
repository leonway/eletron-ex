const { app, ipcMain, Notification, BrowserWindow } = require("electron");

let win;
app.on("ready", () => {
  win = new BrowserWindow({
    width: 300,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile("./index.html");
  handleIPC();
});

function handleIPC(params) {
  ipcMain.handle("work-notification", async function () {
    let res = await new Promise((resolve, reject) => {
      let notification = new Notification({
        title: "任务结束了",
        body: "是否开始休息？",
        actions: [
          {
            text: "开始休息",
            type: "button",
          },
        ],
        closeButtonText: "继续工作",
      });
      notification.show();
      notification.on("action", () => {
        resolve("reset");
      });
      notification.on("close", () => {
        resolve("work");
      });
    });
    return res;
  });
}
