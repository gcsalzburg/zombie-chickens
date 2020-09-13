<?php
include '/home/zc_gcave/db_inc/db.php';
db_connect('zombie_chickens');
?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="shortcut icon" href="http://www.zc.insaniak.com/favicon.ico" />
<title>Zombie CHICKENS</title>
<style>
BODY{background: #B10505 url('images/teaser_bg.jpg') no-repeat center top;}
SECTION#scores{margin:590px auto 0; width:930px;}

BODY{
	color:#470101;
	font-family:"Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	font-size:15px;
	text-transform:uppercase;
}
#score_loading{width:16px; height:16px; display:none; background: url(images/icons/loading1.gif) no-repeat left top;}
.error{background: url(images/icons/32_cross.png) no-repeat left 50%; min-height:36px; margin:8px 0; padding-left:40px; font-weight:bold; line-height:36px; cursor:pointer;}
</style>
<script src="includes/js/jquery.v1.6.js"></script>
</head>

<body>

<section id="scores">
	<form id="add_score" method="post" action="includes/scores/add_score.php">
		<label for="name">Username:</label><input type="text" name="username" id="username" /><br />
		<label for="score">Score:</label><input type="score" name="score" id="score" /><br />
		<input type="submit" value="Add Score" /><div id="score_loading"></div>
	</form>
	<div id="scores_table">
		<?php include 'includes/scores/load_scores.php'; ?>
	</div>
</section>
<script>
$(function(){
	$("#add_score").submit(function(){
		$("#score_loading").show();
		$.ajax({
			type: "POST",
			url: $(this).attr('action'),
			data: "username="+$("INPUT#username").val()+"&score="+$("INPUT#score").val(),
			success: function(msg){
				if(msg == "0"){
					$("#scores_table").load('includes/scores/load_scores.php',function(){
						$("#score_loading").hide();
					});
				}else{
					$("#score_loading").hide();
					$("FORM#add_score").after("<p class='error'>Could not update your score. Please try again.</p>");
				}
			}
		});
		return false;
	});
	
	$("P.error").live("click",function(){
		$(this).fadeOut('fast');
	});
});
</script>
<footer>

</footer>
</body>
</html>