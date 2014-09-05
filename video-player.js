document.addEventListener("DOMContentLoaded", function() { initializeMediaPlayer(); }, false);

var videoPlayer;

function initializeMediaPlayer() {
  videoPlayer = document.getElementById('video');
  videoPlayer.controls = false;
}
