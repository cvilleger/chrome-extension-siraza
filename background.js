const tickRate = 60000; // 1min
const xhr = new XMLHttpRequest();

function notify() {
  if (Notification.permission === "granted") {
    new Notification("Sir-Aza is now live !");
  } else {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        new Notification("Sir-Aza is now live !");
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
        // notify();
      }else{
        chrome.browserAction.setIcon({path:"images/icon-red.png"});
      }
      setTimeout(checkStream, tickRate)
    }
  };
  xhr.send();
}

checkStream();
