document.addEventListener("DOMContentLoaded", function() { initVideoPlayer(); }, false);

var videoPlayer;

function initVideoPlayer() {
  videoPlayer = document.getElementById('video');
  videoPlayer.controls = false;
}

function togglePlayPause() {
  var btn = document.getElementById('play-pause-button');

  if (videoPlayer.paused || videoPlayer.ended) {
    setButtonType('pause');
    videoPlayer.play();
  } else {
    setButtonType('play');
    videoPlayer.pause();
  }
}

function setButtonType(btn, type) {
  btn.title = btn.innerHTML = btn.className = type;
}
