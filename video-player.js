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

function changeVolume(direction) {
  direction === 'up' ? volumeUp() : volumeDown();

  // Only allow 1 decimal place so that the increment/decrement works
  videoPlayer.volume = parseFloat(videoPlayer.volume).toFixed(1);
}

function volumeUp() {
  videoPlayer.volume += videoPlayer.volume == 1 ? 0 : 0.1;
}

function volumeDown() {
  videoPlayer.volume -= videoPlayer.volume == 0 ? 0 : 0.1;
}
