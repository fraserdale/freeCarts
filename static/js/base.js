(function () {
  const config = require('../config.json')
  document.getElementById('server').value = config.server
  document.getElementById('private').value = config.privateChannel
  document.getElementById('public').value = config.publicChannel
  document.getElementById('bot').value = config.botToken
  document.getElementById('quantityCart').value = config.quantityCart
  if (config.deleteAfterReact) {
    document.getElementById('deleteAfterReact').checked = true
  }
  if (config.after10){
    document.getElementById('after10').checked =true
  }
})();
const electron = require('electron');
const {
  ipcRenderer
} = electron;

function stop() {
  ipcRenderer.send('stop');
  document.getElementById('server').disabled = false;
  document.getElementById('private').disabled = false;
  document.getElementById('public').disabled = false;
  document.getElementById('bot').disabled = false;
  document.getElementById('quantityCart').disabled = false;
  document.getElementById('deleteAfterReact').disabled = false;
  document.getElementById('after10').disabled = false
  document.getElementById('botsname').innerHTML = '';
  document.getElementById('name').innerHTML = '';
  document.getElementById("icon").src = 'https://is3-ssl.mzstatic.com/image/thumb/Purple124/v4/62/f8/8f/62f88f95-982b-c903-2123-0bbaf4e72482/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-7.png/246x0w.jpg'
  document.getElementById('redeemed').innerHTML = '';
  document.getElementById('live').innerHTML = '';
  document.getElementById('total').innerHTML = ''
  document.getElementById('textOut').innerHTML = ''
}
ipcRenderer.on('message', function (start, i) {
  console.log('x')
});

ipcRenderer.on('cartsTotal', function (cartsTotal, cartNum) {
  document.getElementById('total').innerHTML = cartNum
});
ipcRenderer.on('liveTotal', function (liveTotal, liveNum) {
  document.getElementById('live').innerHTML = liveNum
});
ipcRenderer.on('redeemedTotal', function (redeemedTotal, redeemedNum) {
  document.getElementById('redeemed').innerHTML = redeemedNum
});
ipcRenderer.on('serverImg', function (serverImg, img) {
  document.getElementById("icon").src = img
});
ipcRenderer.on('serverName', function (serverName, name) {
  document.getElementById('name').innerHTML = name
});
ipcRenderer.on('botName', function (botName, bname) {
  document.getElementById('botsname').innerHTML = bname
});
ipcRenderer.on('redeemedOutput', function (redeemedOutput, redeemedOut) {
  outString = '';
  redeemedOut.forEach(element => {
    outString += element.name + ': ' + element.quantityCart +'\n'
  });
  document.getElementById('textOut').innerHTML = outString
});
ipcRenderer.on('loginError', function (loginError, x) {
  alert('Login details incorrect');
  stop()
});

ipcRenderer.on('wrongVersion',function (wrongVersion,updates) {
    alert('You are not on the latest version. Please download the latest from https://github.com/fraserdale/freeCarts \nUpdates: '+updates);
    console.log('You are not on the latest update. Please go to https://github.com/fraserdale/freeCarts')
});

function save() {
  const server = document.querySelector('#server').value;
  const private = document.querySelector('#private').value;
  const public = document.querySelector('#public').value;
  const bot = document.querySelector('#bot').value;
  const quantityCart = document.getElementById('quantityCart').value;
  const deleteAfterReact = document.getElementById('deleteAfterReact').checked
  const after10 = document.getElementById('after10').checked
  config = `{"server":"${server}","privateChannel":"${private}","publicChannel":"${public}","botToken":"${bot}","quantityCart":${quantityCart},"deleteAfterReact":${deleteAfterReact},"after10":${after10}}`
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
  document.getElementById('after10').disabled = true
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

ipcRenderer.send('checkVersion');