
// --------------------------------------------------- //
// ------------------ Electron Main ------------------ //
// --------------------------------------------------- //

const { BrowserWindow, app } = require('electron')
require('./app.js')

let mainWindow = null

urlString = 'http://localhost:' + process.env.PORT || 'http://localhost:8080/';

function main() {
  mainWindow = new BrowserWindow()
  mainWindow.loadURL(urlString);
  //mainWindow.loadURL(`http://localhost:8080/`)
  mainWindow.on('close', event => {
    mainWindow = null
  })
}

app.on('ready', main)