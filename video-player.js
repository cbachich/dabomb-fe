document.addEventListener("DOMContentLoaded", function() { initVideoPlayer(); }, false);

var videoPlayer,progressBar;;

function initVideoPlayer() {
  videoPlayer = document.getElementById('video');
  progressBar = document.getElementById('progress-bar');
  videoPlayer.controls = false;
  videoPlayer.addEventListener('timeupdate', updateProgressBar, false);
}

function updateProgressBar() {
  var percentage = pointOnProgressBar(videoPlayer.currentTime);
  progressBar.value = percentage;
  progressBar.innerHTML = percentage + '% played';
}

function pointOnProgressBar(time) {
  return (100 / videoPlayer.duration) * time;
}

function togglePlayPause() {
  (videoPlayer.paused || videoPlayer.ended) ? playVideo() : pauseVideo();
}

function changePlayPauseButton(type) {
  var btn = document.getElementById('play-pause-button');
  changeButtonType(btn,type);
}

function playVideo() {
  changePlayPauseButton('pause');
  videoPlayer.play();
}

function pauseVideo() {
  changePlayPauseButton('play');
  videoPlayer.pause();
}

function changeButtonType(btn, type) {
  btn.title = btn.innerHTML = btn.className = type;
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
  changeButtonType(btn, 'unmute');
  videoPlayer.muted = true;
}

function unmute() {
  var btn = document.getElementById('mute');
  changeButtonType(btn, 'mute');
  videoPlayer.muted = false;
}
