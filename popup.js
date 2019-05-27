'use strict';

const xhr = new XMLHttpRequest();

function reqListener () {
    let data = JSON.parse(this.response)['data'];

    if (0 === data.length){
        document.querySelector('#title img').src = 'images/icon-red.png';
    } else {
        document.querySelector('#title img').src = 'images/icon-green.png';
    }
}

xhr.addEventListener("load", reqListener);
xhr.open("GET", "https://api.twitch.tv/helix/streams?user_login=siraza");
xhr.setRequestHeader('Client-ID', '4s5z6mqls50fwh5w42ig1zlfmrv5d4');
xhr.send();

window.addEventListener("DOMContentLoaded", (event) => {

});
