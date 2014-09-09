document.addEventListener("DOMContentLoaded", function() { initVideoPlayer(); }, false);

var videoPlayer,progressBar;;

function initVideoPlayer() {
  videoPlayer = document.getElementById('video');
  progressBar = document.getElementById('progress-bar');
  videoPlayer.controls = false;
  videoPlayer.addEventListener('timeupdate', updateProgressBar, false);
  progressBar.addEventListener('click', clickProgressBar, false);
}

function updateProgressBar() {
  var percentage = (100 / videoPlayer.duration) * videoPlayer.currentTime;
  progressBar.value = percentage;
  progressBar.innerHTML = percentage + '% played';
}

function clickProgressBar(e) {
  var progressDiv = document.getElementById('progress-div');
  var position = e.clientX - progressDiv.offsetLeft - e.target.offsetLeft;
  var percent = ((100 / e.target.offsetWidth) * position).toFixed(0);
  videoPlayer.currentTime = (videoPlayer.duration / 100) * percent;
}

function togglePlayPause() {
  (videoPlayer.paused || videoPlayer.ended) ? playVideo() : pauseVideo();
}

function playVideo() {
  var btn = document.getElementById('play-pause-button');
  btn.title = 'pause';
  document.getElementById('play-pause-icon').className = 'glyphicon glyphicon-pause';
  videoPlayer.play();
}

function pauseVideo() {
  var btn = document.getElementById('play-pause-button');
  btn.title = 'play';
  document.getElementById('play-pause-icon').className = 'glyphicon glyphicon-play';
  videoPlayer.pause();
}

function changeButtonType(btn, type) {
  btn.title = btn.innerHTML = type;
}

function stopVideo() {
  pauseVideo();
  videoPlayer.currentTime = 0;
  progressBar.value = 0;
}

function replayVideo() {
  stopVideo();
  playVideo();
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

function toggleMute() {
  videoPlayer.muted ? unmute() : mute();
}

function mute() {
  var btn = document.getElementById('mute');
  btn.className = "btn btn-primary";
  videoPlayer.muted = true;
}

function unmute() {
  var btn = document.getElementById('mute');
  btn.className = "btn btn-default";
  videoPlayer.muted = false;
}
