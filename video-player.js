document.addEventListener("DOMContentLoaded", function() { initVideoPlayer(); }, false);

var videoPlayer;

function initVideoPlayer() {
  videoPlayer = document.getElementById('video');
  videoPlayer.controls = false;
}

function playPause() {
  (videoPlayer.paused || videoPlayer.ended) ? play() : pause();
}

function play() {
  setButtonType('pause');
  videoPlayer.play();
}

function pause() {
  setButtonType('play');
  videoPlayer.pause();
}

function setButtonType(type) {
  var btn = document.getElementById('play-pause-button');
  btn.title = btn.innerHTML = btn.className = type;
}

function stop() {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
}
