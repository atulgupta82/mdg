<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Test call 134 fssdsdf</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<link media="all" rel="stylesheet" href="main.css">
<script src="jquery-1.11.2.min.js"></script>
<!--<script src="fullscreen.js"></script> -->
<script src="video.js"></script>
</head>
<body>
	<div id="videoHolder">
		<video id="video0" style="left: 0px;" preload="auto" poster="images/poster.jpg" onclick="this.play();">
			<source src="411365553.mp4">
		</video>
		<video id="video1" style="left: -100%;" preload="auto">
			<source src="411364482.mp4">
		</video>
		<div id="progressBarHolder">
			<div id="progressBar"></div>
			<div style="width: 0px;" id="progressBarHover"></div>
		</div>
		<div id="controlsHolder">
			<img src="images/play_btn.png" width="20" height="20" id="playPauseBtn">
			<p id="timestamp">00:00 / 00:00</p>
			<img src="images/expand_btn.png" width="20" height="20" id="expandBtn">
		</div>
		<img id="instructions1" src="images/screensaver-3.png" width="1920" height="344" alt=""/>
		<img id="letter-e-1" class="blinking" src="images/e3.png" width="1920" height="344" alt=""/>
	</div>
</body>
</html>