const tickRate = 60000; // 1min
const xhr = new XMLHttpRequest();
sessionStorage.setItem('status', 'offline');

function notify(title) {
  if (Notification.permission === "granted") {
    new Notification(title);
  } else {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        new Notification(title);
      }
    });
  }
}

function checkStream() {
  xhr.open("GET", "https://api.twitch.tv/helix/streams?user_login=siraza", true);
  xhr.setRequestHeader('Client-ID', '4s5z6mqls50fwh5w42ig1zlfmrv5d4');
  xhr.onreadystatechange = function () {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      if(data["data"].length > 0){
        chrome.browserAction.setIcon({path:"images/icon-green.png"});
        if ('offline' === sessionStorage.getItem('status')){
          notify('Sir-Aza is now live !');
          sessionStorage.setItem('status', 'live');
        }
      }else{
        chrome.browserAction.setIcon({path:"images/icon-red.png"});
        if ('live' === sessionStorage.getItem('status')){
          sessionStorage.setItem('status', 'offline');
        }
      }
      setTimeout(checkStream, tickRate)
    }
  };
  xhr.send();
}

checkStream();
