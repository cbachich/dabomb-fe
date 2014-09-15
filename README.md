# DaBomb - FE

This is a custom HTML5 video player with an annotations toolkit. Each of the
video controls make calls to the HTML5 video interface, as well as keep
track of currentTime in the video for other functions.

The annotations toolkit allows a user to add annotations on top of the video.
When adding an annotation, the time line for that annotation drops below the
video player controls. The time line can be used to indicate the start and
duration of display on the video. There is also an edit button on the right of
a time line that can be used to change the text and color of the annotation
being displayed.

The annotations can by pulled or pushed to a server running the [DaBomb-API](https://github.com/cbachich/dabomb-api). Note: In order to save to the API, you must first Sync from Server. After that point, you can make changes to the annotations and select Save to Server to push those changes to the server.
