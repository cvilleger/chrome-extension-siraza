var tickRate = 60000; // 1min

function checkStream() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.twitch.tv/helix/streams?user_login=siraza", true)
  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      if(data["stream"] === null){
        chrome.browserAction.setIcon({path:"images/icon-red.png"})
      }else{
        chrome.browserAction.setIcon({path:"images/icon-green.png"})
      }
      setTimeout(checkStream, tickRate)
    }
  };
  xhr.send()
}

checkStream();
