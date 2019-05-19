const tickRate = 60000; // 1min

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
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.twitch.tv/helix/streams?user_login=siraza", true)
  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4) {
      let data = JSON.parse(xhr.responseText);
      if(data["stream"] === null){
        chrome.browserAction.setIcon({path:"images/icon-red.png"})
      }else{
        chrome.browserAction.setIcon({path:"images/icon-green.png"})
        // notify();
      }
      setTimeout(checkStream, tickRate)
    }
  };
  xhr.send()
}

checkStream();
