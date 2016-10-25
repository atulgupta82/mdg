var currentVideo = 0;
var videos = [];

var hasGoneNegative = false;
var hasGoneNegative2 = false;
var flashMode = false;
var mobileMode = false;
var tabletMode = false;
var fullScreenModeOn = true;

var videoHeight = 460;
var videoWidth = 840;

var videoPlaying = false;

//video.currentTime
android = (new RegExp('Android')).test(navigator.appVersion); 
iphone = (new RegExp('iPhone')).test(navigator.appVersion);
ipad = (new RegExp('iPad')).test(navigator.appVersion);
playbook = (new RegExp('PlayBook')).test(navigator.appVersion);
other = (new RegExp('Linux')).test(navigator.appVersion);
ie = (new RegExp('MSIE')).test(navigator.appVersion);
mobileSafari = (new RegExp('Mobile')).test(navigator.appVersion);


function isIE(userAgent) {
  userAgent = userAgent || navigator.userAgent;
  return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1;
}

var interval;
var interval2;
$(document).ready(function(){
	flashMode = isIE();
	//flashMode = true;
	
	$('#instructions1').css('display', 'none');
    $('#letter-e-1').css('display', 'none');
				
				
    if(ipad == true)
    {//iPad static path
    	tabletMode = true;
		$('#videoHolder').replaceWith('<iframe src="https://player.vimeo.com/external/139727834.mobile.mp4?s=c856076796abc1dea06c9dea00c09555&profile_id=116" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
		);

	}
	else if(android == true || iphone == true || playbook == true || other == true || mobileSafari == true)
	{//mobile static path
		mobileMode = true;
		$('#videoHolder').replaceWith('<iframe src="https://player.vimeo.com/external/139727834.hd.mp4?s=516539f65a7f61fb74bd3cc10e25d4f8&profile_id=113" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
		);
	}
	else
	{//desktop path
		desktopBehavior();
	
		if(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) 
		{//Test Safari for full screen
			$('#expandBtn').css('display', 'none');
		}

		$('#progressBarHolder').click(seekVideoPos);
		$('#progressBarHolder').hover(previewSeekPos, resetSeekPos);
		$('#progressBarHolder').mousemove(previewSeekPos);

	}		
	
			
});
	function mobileBehavior(){
		//vimeo player controls
	}
	function desktopBehavior(){
		$('#expandBtn').css('display', 'block');
		$('#expandBtn').click(enlargeVideoDesktop);
		if(flashMode != true)	
		{	
			$("video").click(playVideoFromStart);
			$("#playPauseBtn").click(playVideoFromStart);
		

			$('video').on('ended',function(){
				$('video')[0].autoplay=false;
		  		$('video')[0].load();
		  		$("video").unbind("click");
			
				$("#playPauseBtn").unbind("click");
			
		  		$("video").click(playVideoFromStart);
			
				$("#playPauseBtn").click(playVideoFromStart);
			
		  		window.clearInterval(interval);
		  		window.clearInterval(interval2);
				$('#instructions1').css('display', 'none');
				$('#letter-e-1').css('display', 'none');
					  
	  		})
				
				//video0 = $("video")[0]
				//video1 = $("video")[1]
				
				videos.push($("video")[0]);
				videos.push($("video")[1]);
				
				updateVideoPos();
				$(document).keydown( swapVideo );
				$(document).keyup( stopSwapVideo );
				
		}else{
			$('#expandBtn').css('display', 'none');
			initFlashMode();	
			$(document).keydown( swapVideoFlash );
			$(document).keyup( stopSwapVideoFlash );
		}
		//normal behavior code end
	}
	function enlargeVideoDesktop(){
		$("#videoHolder").css('background-color','#000');
		$("#controlsHolder").css('background-color','#000');
		$("#videoHolder").width( $( document ).width()-100 );
		//$("#videoHolder").height( $( document ).height()-100 );
		$("body").css('background-color','#000');
		$("#videoHolder").css('z-index','100');
		$('#instructions1').css('top', $("video").height() );

		updateVideoPos();

		$('#expandBtn').css('display', 'block');
		$('#expandBtn').click(reduceVideoDesktop);
	}
	function reduceVideoDesktop(){
		$("#videoHolder").css('background-color','#f4f4f4');
		$("#controlsHolder").css('background-color','#f4f4f4');
		$("#videoHolder").width( 840 );
		$("#videoHolder").height( 460 );
		$("body").css('background-color','#fff');
		$('#expandBtn').click(enlargeVideoDesktop);
	}
	
	
	
	function tabletBehavior(){
	    $('#instructions1').attr("src","images/touch_tablet.png");
	    $('#letter-e-1').remove();

	    $("video").click(playVideoFromStart);
		$("#playPauseBtn").click(playVideoFromStart);

		readyTabletVideoFromStart();
	
		$('video').on('ended',function(){
	  		$("video").unbind("click");
			$("#playPauseBtn").unbind("click");
		
	  		$("video").click(playVideoFromStart);
			$("#playPauseBtn").click(playVideoFromStart);

			reduceVideoHolder();
  		});

		videos.push($("video")[0]);
		videos.push($("video")[1]);
		
		updateVideoPos();
 
	}

	function readyTabletVideoFromStart(){
		$('#expandBtn').css('display', 'none');
		
		$('video')[0].autoplay=false;
	  	$('video')[1].autoplay=false;
	  	$('video')[0].load();
	  	$('video')[1].load();

		$("video").click(function() {
			if(fullScreenModeOn == false){
	    		enlargeVideoHolder();
	    		fullScreenModeOn = true;
	    		setupInstructionPrompt(); 
	   		}
		});
	}

	function enlargeVideoHolder(){
		$("#videoHolder").css('background-color','#000');
		$("#controlsHolder").css('background-color','#000');
		$("#videoHolder").width( $( document ).width() );
		$("#videoHolder").height( $( document ).height() );
		$("body").css('background-color','#000');
		$("#videoHolder").css('z-index','100');

		$('#videoHolder').bind( "touchstart", function(e){
		    swapVideo();
		});
		

		$('#videoHolder').bind( "touchend", function(e){
		    stopSwapVideo();
		});

		$('#instructions1').css('top', $("video").height() + 20 );

		updateVideoPos();

		$('#expandBtn').css('display', 'block');
		$('#expandBtn').click(reduceVideoHolder);
	}
	function reduceVideoHolder(){
		$("#videoHolder").css('background-color','#f4f4f4');
		$("#controlsHolder").css('background-color','#f4f4f4');
		$("#videoHolder").width( 640 );
		$("#videoHolder").height( 400 );
		$("body").css('background-color','#fff');
		
		fullScreenModeOn = false;
		$('video')[0].autoplay=false;
	  	$('video')[0].load();
	  	readyTabletVideoFromStart();

	}

	function playVideoFromStart(){
		$("video").each( function(){ 
			$(this)[0].play();  
		});
		$('video').eq(0).bind("ended", videoIsStopped);
		
		setupInstructionPrompt();

		videoPlaying = true;
		$("#playPauseBtn").attr("src", "images/pause_btn.png");
		$("#playPauseBtn").unbind('click');
		$("video").unbind('click');
		$("video").click(toggleVideo);
		$("#playPauseBtn").click(toggleVideo);
				
	}
			
	function setupInstructionPrompt()
	{
		hasGoneNegative = false;
				interval = setInterval( recursiveInstructions, 8000);
	}
	
	function recursiveInstructions()
	{
		window.clearInterval(interval);
		if(hasGoneNegative == false)
		{ 
			$('#instructions1').css('display', 'block');
			$('#letter-e-1').css('display', 'block');
			interval2 = setInterval(function(){
					window.clearInterval(interval2);
					$('#instructions1').css('display', 'none');
					$('#letter-e-1').css('display', 'none');
					interval = setInterval( recursiveInstructions, 14000);
			}, 5500);
		}
	}
	
	function setupInstructionPromptbackup()
	{
		hasGoneNegative = false;
				interval = setInterval(function(){ 
				window.clearInterval(interval);
				
				if(hasGoneNegative == false){ 
				  
				  $('#instructions1').css('display', 'block');
				  $('#letter-e-1').css('display', 'block');
				//console.log(videos[0].duration);
				
						interval2 = setInterval(function(){
							window.clearInterval(interval2);
							$('#instructions1').css('display', 'none');
				  			$('#letter-e-1').css('display', 'none');
							
							interval = setInterval(function(){
								window.clearInterval(interval);
								if(hasGoneNegative == false){ 
				  
				  $('#instructions1').css('display', 'block');
				  $('#letter-e-1').css('display', 'block');
				  
				  
				         
						interval2 = setInterval(function(){
							window.clearInterval(interval2);
							$('#instructions1').css('display', 'none');
				  			$('#letter-e-1').css('display', 'none');}, 5000);
				                  
								}
								
								
								}, 15000);
							
							
							}, 4000)
				
				 }}, 8000);	
	}
	
	function toggleVideo()
	{
		videoPlaying =  !videoPlaying;
		if(videoPlaying == true)
		{
			$("video").each( function(){ 
				$(this)[0].play();  
				
				});
				$("#playPauseBtn").attr("src", "images/pause_btn.png");
		}
		else
		{
				$("video").each( function(){ 
				$(this)[0].pause();  
				
				});
				$("#playPauseBtn").attr("src", "images/play_btn.png");
		}
	}
	
	function videoIsStopped()
	{
		videoPlaying = false;
		$("#playPauseBtn").attr("src", "images/play_btn.png");
		
	}
	
	function seekVideoPos(e)
	{
		var offset = e.pageX - $(this).offset().left;
 		var offsetPercent = offset/ $(this).width();
		  
		//  console.log(offset +", "+offsetPercent);
		  
		if(flashMode != true)	
		{
		  videos[0].currentTime = offsetPercent * videos[0].duration;
		  videos[1].currentTime = offsetPercent * videos[0].duration;
		}
		else{
			seekFlashVideo(offsetPercent);
		}
		
		  
	}
	
	function previewSeekPos(e)
	{
		
		 var offset = e.pageX - $(this).offset().left;
 		 //var offsetPercent = offset/ $(this).width();
		 
		 //console.log(offset);
		 $('#progressBarHover').width(offset + "px");
	}
	
	function resetSeekPos()
	{
		 $('#progressBarHover').width("0");
	}
	
	function updateVideoTime(e)
	{
		 
		var mainVideoProgress = videos[+ currentVideo].currentTime/videos[+ currentVideo].duration;
		$('#progressBar').css("width", Math.round(mainVideoProgress*1000)/10+"%");
		
		//console.log( videos[+ !currentVideo].currentTime- videos[+ currentVideo].currentTime);
		
		if( videos[+ currentVideo].currentTime - videos[+ !currentVideo].currentTime > .1 ||  videos[+ currentVideo].currentTime - videos[+ !currentVideo].currentTime < -.1 )
		{
			 videos[+ !currentVideo].currentTime =  videos[+ currentVideo].currentTime;
		}
		
		//timestamp
		var minutes = Math.floor(videos[+ currentVideo].currentTime/60);
		minutes =  "0" + String(minutes);
	
		var seconds = Math.floor(videos[+ currentVideo].currentTime % 60);
		if(seconds<10) seconds = "0" + String(seconds);
		
		
		$('#timestamp').html(minutes+":"+seconds+" / 02:04");
		
		
	}
	
	
	function swapVideo(e)
	{ 
		if(e.keyCode == 69 && currentVideo == 0)
		{
			currentVideo = 1;
			updateVideoPos();
		}
		
		if(hasGoneNegative == false){ 
				  
				  $('#instructions1').css('display', 'none');
				  $('#letter-e-1').css('display', 'none');
				hasGoneNegative  = true;
				window.clearInterval(interval);  
		}
	}
	
	function stopSwapVideo(e)
	{
		if(e.keyCode == 69)
		{
			currentVideo = 0;
			updateVideoPos();
		}
	}

	function updateVideoPos()
	{
			
		videos[+ currentVideo].volume = 1;
		videos[+ currentVideo].style.left = "0px";
		videos[+ !currentVideo].volume = 0;	
		videos[+ !currentVideo].style.left = "-100%";	
		
		$(videos[+ currentVideo]).bind("timeupdate", updateVideoTime);
		$(videos[+ !currentVideo]).unbind("timeupdate", updateVideoTime);
		
		
		if( videos[+ currentVideo].currentTime - videos[+ !currentVideo].currentTime > .1 ||  videos[+ currentVideo].currentTime - videos[+ !currentVideo].currentTime < -.1 )
		{
		 	videos[+ currentVideo].currentTime =  videos[+ !currentVideo].currentTime;
		}
		
		
	}
	