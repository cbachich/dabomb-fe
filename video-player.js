(function() {
  angular.module('player', ['nouislider'])

  .controller('VideoController', function() {
    var video = this;

    var videoPlayer,progressBar,headline;
    videoPlayer = document.getElementById('video');
    progressBar = document.getElementById('progress-bar');
    headline = document.getElementById('headline');
    videoPlayer.controls = false;
    videoPlayer.addEventListener('timeupdate', update, false);
    progressBar.addEventListener('click', clickProgressBar, false);

    video.annotations = [];
    video.annotationCurrentId = 1;

    video.addAnnotation = function () {
      video.annotations.push({ id: video.annotationCurrentId++, start: currentPercent(), end: currentPercent()+10, text: "Enter annotation here...", active: true, display: false });
    };

    video.deleteAnnotation = function (annotateId) {
      video.annotations.splice(annotateId, 1);
    };

    video.toggleAnnotationDisplay = function (annotateId) {
      video.annotations[annotateId].active = !video.annotations[annotateId].active;
    }

    function update() {
      updateHeadline();
      updateProgressBar();
    }

    function updateHeadline() {
      var annotations = [];
      for (i = 0; i < video.annotations.length; i++) {
        var annotation = video.annotations[i];
        var step = videoPlayer.duration / 100;
        var startTime = step * annotation.start;
        var endTime = step * annotation.end;
        document.getElementById("headline-" + video.annotations[i].id).style.display = (startTime <= videoPlayer.currentTime) && (endTime >= videoPlayer.currentTime) ? 'block' : 'none';
      }
    }

    function updateProgressBar () {
      var percentage = currentPercent();
      progressBar.value = percentage;
      progressBar.innerHTML = percentage + '% played';
    }

    function currentPercent() {
      return (100 / videoPlayer.duration) * videoPlayer.currentTime;
    }

    function clickProgressBar (e) {
      var progressDiv = document.getElementById('progress-div');
      var position = e.clientX - progressDiv.offsetLeft - e.target.offsetLeft;
      var percent = ((100 / e.target.offsetWidth) * position).toFixed(0);
      videoPlayer.currentTime = (videoPlayer.duration / 100) * percent;
    }

    video.togglePlayPause = function () {
      (videoPlayer.paused || videoPlayer.ended) ? video.playVideo() : video.pauseVideo();
    }

    video.playVideo = function () {
      var btn = document.getElementById('play-pause-button');
      btn.title = 'pause';
      document.getElementById('play-pause-icon').className = 'glyphicon glyphicon-pause';
      videoPlayer.play();
    }

    video.pauseVideo = function () {
      var btn = document.getElementById('play-pause-button');
      btn.title = 'play';
      document.getElementById('play-pause-icon').className = 'glyphicon glyphicon-play';
      videoPlayer.pause();
    }

    function changeButtonType(btn, type) {
      btn.title = btn.innerHTML = type;
    }

    video.stopVideo = function () {
      video.pauseVideo();
      videoPlayer.currentTime = 0;
      progressBar.value = 0;
    }

    video.replayVideo = function () {
      video.stopVideo();
      video.playVideo();
    }

    video.changeVolume = function (direction) {
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

    video.toggleMute = function () {
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

  })

  .directive('annotateTimeline', function() {
    return {
      restrict: 'E',
      templateUrl: 'annotate-timeline.html'
    };
  })

  .directive('myDraggable', function() {
    return {
      restrict: 'A',
      link: function(scope, elem, attr, ctrl) {
        elem.draggable({containment: "#video-container"});
      }
    };
  });
})();
