document.addEventListener("DOMContentLoaded", function() { initVideoPlayer(); }, false);

var videoPlayer;

function initVideoPlayer() {
  videoPlayer = document.getElementById('video');
  videoPlayer.controls = false;
}

function playPause() {
  var btn = document.getElementById('play-pause-button');

  if (videoPlayer.paused || videoPlayer.ended) {
    setButtonType(btn, 'pause');
    videoPlayer.play();
  } else {
    setButtonType(btn, 'play');
    videoPlayer.pause();
  }
}

function setButtonType(btn, type) {
  btn.title = btn.innerHTML = btn.className = type;
}

function stop() {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  videoPlayer.load();
}
