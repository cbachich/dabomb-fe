(function() {
  angular.module('player', ['nouislider'])

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])

  .controller('VideoController', [ '$http', function($http) {
    var video = this;

    var videoPlayer,progressBar,headline;
    videoPlayer = document.getElementById('video');
    progressBar = document.getElementById('progress-bar');
    headline = document.getElementById('headline');
    videoPlayer.controls = false;
    videoPlayer.addEventListener('timeupdate', update, false);
    progressBar.addEventListener('click', clickProgressBar, false);

    video.saveButtonActive = false;

    video.annotations = [];

    video.refreshAnnotations = function() {
      video.annotations = [];
      $http.get('http://localhost:3000/annotations').success(function(data) {
        video.annotations = data;
        updateSaveButton();
      });
    }

    function updateSaveButton() {
      video.saveButtonActive = (video.annotations.length > 0);
    }

    video.tempId = 1;
    video.addAnnotation = function () {
      video.annotations.push({ id: "temp" + video.tempId++, start_video: currentPercent(), end_video: currentPercent()+10, text: "Enter annotation here...", active: true, display: false, color: '#CC46EB', left_align: "35%", top_align: "40%", newToDB: true });
    }

    video.deleteAnnotation = function (index) {
      $http.delete(
          'http://localhost:3000/annotations/' + video.annotations[index].id
      ).success(function(data) {
        video.annotations.splice(index, 1);
      });
    };

    video.toggleAnnotationDisplay = function (index) {
      video.annotations[index].active = !video.annotations[index].active;
    }

    video.saveToServer = function() {
      if (video.annotations.length > 0) updateServerAnnotation(0);
    }

    function updateServerAnnotation(index) {
      if (index >= video.annotations.length) return;
      video.annotations[index].newToDB ? saveNewAnnotation(index) : saveUpdatedAnnotation(index);
    }

    function savableAttributes(index) {
      var annotation = video.annotations[index];
      var headlineDiv = $('#headline-' + video.annotations[index].id);
      var attributes = {
          annotation:
          {
            start_video: annotation.start_video,
            end_video: annotation.end_video,
            text: annotation.text,
            top_align: headlineDiv.css("top"),
            left_align: headlineDiv.css("left"),
            color: annotation.color
          }
        };
      return attributes;
    }

    function saveNewAnnotation(index) {
      $http.post(
        'http://localhost:3000/annotations',
        savableAttributes(index),
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      ).success(function(annotation) {
        updateServerAnnotation(index+1);
      });
    };


    function saveUpdatedAnnotation(index) {
      $http.put(
        'http://localhost:3000/annotations/' + video.annotations[index].id,
        savableAttributes(index),
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      ).success(function(annotation) {
        updateServerAnnotation(index+1);
      });
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
        var startTime = step * annotation.start_video;
        var endTime = step * annotation.end_video;
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

  }])

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
