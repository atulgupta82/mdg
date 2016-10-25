$( document ).ready(function() {


	$("#expandBtn").click(function() {
		if(fullScreenModeOn == false){
    		expandVideoFullScreen();
   		}
	});

});

	function expandVideoFullScreen(){
		  var video = document.getElementById("video0");
		  var video1 = document.getElementById("video1");
		  if (video.requestFullscreen) {
		    video.requestFullscreen();
			video1.requestFullscreen();
		  } else if (video.mozRequestFullScreen) {
		    video.mozRequestFullScreen();
			video1.mozRequestFullScreen();
		  } else if (video.webkitRequestFullscreen) {
		    video.webkitRequestFullscreen();
			video1.mozRequestFullScreen();
		  } else if (video.msRequestFullscreen) {
		    video.msRequestFullscreen();
			video1.mozRequestFullScreen();
		  }

		/* fullScreenModeOn = true;
		$("#expandBtn").unbind("click");
		
		$("#expandBtn").click(function() {
	   		if(fullScreenModeOn == true){
	   			contractVideoFullScreen();
	   		}
		}); */

	}
	
	function contractVideoFullScreen(){
		  var video = document.getElementById("video0"); 		
		  if (video.requestFullscreen) {
		    document.cancelFullScreen();
		  } else if (video.mozRequestFullScreen) {
		    document.mozCancelFullScreen();
		  } else if (video.webkitRequestFullscreen) {
		    document.webkitCancelFullScreen();
		  } else if (video.msRequestFullscreen) {
		    document.msExitFullscreen();
		  }
		
		fullScreenModeOn = false;
		$("#expandBtn").unbind("click");

		$( "#expandBtn" ).click(function() {
			if(fullScreenModeOn == false){
				$("#expandBtn").unbind("click");
	    		expandVideoFullScreen();
	   		}
		});
	}



