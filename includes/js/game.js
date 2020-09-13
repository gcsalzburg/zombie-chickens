$(function(){
	$("#zc_username").focus(function(){
		if($(this).val()=="Enter your name"){
			$(this).val("");
		}
		$(this).removeClass();
	});
	
	$("#play_link").click(function(e){
		e.preventDefault();
		init();
		$("#splash_img").fadeOut('slow',function(){
			//play game here!
		});
	});
	$("#sound_link").click(function(e){
		e.preventDefault();
		toggleaudio();
		$(this).toggleClass('sound_on sound_off');
	});
	$("#reset_link").click(function(e){
		e.preventDefault();
		reset=true;	
	});
	$("#add_link").click(function(e){
		e.preventDefault();
		$("#score").text(enemies.length);
		$("#save_highscore").fadeIn();
	});
	$("#save_link").click(function(e){
		e.preventDefault();
		$("#score_loading").show();
		$.ajax({
			type: "POST",
			url: "includes/scores/add_score.php",
			data: "username="+$("INPUT#zc_username").val()+"&score="+$("#score").text(),
			success: function(msg){
				$("#score_loading").hide();
				if(msg == "0"){
					$("#zc_username").addClass("score_added");
					$("#save_highscore").delay(1000).fadeOut();
				}else{
					$("#zc_username").addClass("score_error");
				}
			}
		});		
	});
	
	$("#close_link").click(function(e){
		e.preventDefault();
		$("#save_highscore").fadeOut();
	});
});

$.preLoadImages("images/static/highscore_bg.png","game/images/base1.png","game/images/bg.jpg","game/images/blood.png","game/images/chicken.png","game/images/egg.png","game/images/fog.png","game/images/rain.png","game/images/sight.png","game/images/turret1.png");