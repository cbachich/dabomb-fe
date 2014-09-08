document.addEventListener("DOMContentLoaded", function() { initVideoPlayer(); }, false);

var videoPlayer;

function initVideoPlayer() {
  videoPlayer = document.getElementById('video');
  videoPlayer.controls = false;
}

function togglePlayPause() {
  var btn = document.getElementById('play-pause-button');

  if (videoPlayer.paused || videoPlayer.ended) {
    btn.title = 'pause';
    btn.innerHTML = 'pause';
    btn.className = 'pause';
    videoPlayer.play();
  } else {
    btn.title = 'play';
    btn.innerHTML = 'play';
    btn.className = 'play';
    videoPlayer.pause();
  }
}
