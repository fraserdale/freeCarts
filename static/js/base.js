(function () {
  const config = require('../config.json')
  document.getElementById('server').value = config.server
  document.getElementById('private').value = config.privateChannel
  document.getElementById('public').value = config.publicChannel
  document.getElementById('bot').value = config.botToken
  document.getElementById('quantityCart'.value = config.quantityCart)
  if (config.deleteAfterReact) {
    document.getElementById('deleteAfterReact').checked = true
  }
})();
const electron = require('electron');
const {
  ipcRenderer
} = electron;

function stop() {
  document.getElementById('server').disabled = false
  document.getElementById('private').disabled = false
  document.getElementById('public').disabled = false
  document.getElementById('bot').disabled = false
  document.getElementById('quantityCart').disabled = false
  document.getElementById('deleteAfterReact').disabled = false
  document.getElementById('botsname').innerHTML = ''
  document.getElementById('name').innerHTML = ''
  document.getElementById("icon").src = 'https://pbs.twimg.com/profile_images/999669687112749056/WK1RT5lY_400x400.jpg'

}
ipcRenderer.on('message', function (start, i) {
  console.log('x')
})

ipcRenderer.on('cartsTotal', function (cartsTotal, cartNum) {
  //alert(i)
  document.getElementById('total').innerHTML = cartNum
})
ipcRenderer.on('liveTotal', function (liveTotal, liveNum) {
  //alert(i)
  document.getElementById('live').innerHTML = liveNum
})
ipcRenderer.on('redeemedTotal', function (redeemedTotal, redeemedNum) {
  //alert(i)
  document.getElementById('redeemed').innerHTML = redeemedNum
})
ipcRenderer.on('serverImg', function (serverImg, img) {
  //alert(i)
  document.getElementById("icon").src = img
})
ipcRenderer.on('serverName', function (serverName, name) {
  //alert(i)
  document.getElementById('name').innerHTML = name
})
ipcRenderer.on('serverName', function (serverName, name) {
  //alert(i)
  document.getElementById('name').innerHTML = name
})
ipcRenderer.on('botName', function (botName, bname) {
  //alert(i)
  document.getElementById('botsname').innerHTML = bname
})
ipcRenderer.on('loginError', function (loginError, x) {
  //alert(i)
  alert('Login details incorrect')
  stop()
})

function save() {
  const server = document.querySelector('#server').value;
  const private = document.querySelector('#private').value;
  const public = document.querySelector('#public').value;
  const bot = document.querySelector('#bot').value;
  const quantityCart = document.getElementById('quantityCart').value;
  const deleteAfterReact = document.getElementById('deleteAfterReact').checked
  config = `{"server":"${server}","privateChannel":"${private}","publicChannel":"${public}","botToken":"${bot}","quantityCart":${quantityCart},"deleteAfterReact":${deleteAfterReact}}`
  console.log(config)
  ipcRenderer.send('configSave', config);
}

function start() {
  //save()
  document.getElementById('server').disabled = true
  document.getElementById('private').disabled = true
  document.getElementById('public').disabled = true
  document.getElementById('bot').disabled = true
  document.getElementById('quantityCart').disabled = true
  document.getElementById('deleteAfterReact').disabled = true
  ipcRenderer.send('start');
}

function showSettings() {
  var x = document.getElementById("settings");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
