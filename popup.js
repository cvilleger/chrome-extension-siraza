'use strict';

const xhr = new XMLHttpRequest();

function reqListener () {
    let data = JSON.parse(this.response).data;
    console.log(data);
    let statusImg = document.querySelector('#title img');
    if (0 === data.length){
        console.log('off');
        statusImg.src = 'images/icon-red.png';
    } else {
        statusImg.src = 'images/icon-green.png';
        data = data['0'];
        console.log(data.title);
        console.log(data.game_id);
        console.log(data.viewer_count);
        console.log(data.thumbnail_url);
    }
}

xhr.addEventListener("load", reqListener);
xhr.open("GET", "https://api.twitch.tv/helix/streams?user_login=siraza");
xhr.setRequestHeader('Client-ID', '4s5z6mqls50fwh5w42ig1zlfmrv5d4');
xhr.send();

window.addEventListener("DOMContentLoaded", (event) => {

});
