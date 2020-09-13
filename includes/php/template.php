<?php
$prefix = "";
for($i=0; $i<$depth; $i++){ //fix to load images correctly if page is in a lower folder
	$prefix = $prefix . "../";
}
?><!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title><?php echo $title; ?></title>
<link rel="shortcut icon" href="http://www.zombiechickens.co.uk/favicon.ico" />
<link rel="stylesheet" type="text/css" href="<?=$prefix;?>includes/css/layout.css" />
<script src="<?=$prefix;?>includes/js/jquery.v1.6.js"></script>
<script src="<?=$prefix;?>includes/js/layout.js"></script>
<script>
$.preLoadImages("images/icons/loading_lhs.gif","images/icons/loading_rhs.gif","images/layout/h1_about.png","images/layout/h1_game.png","images/layout/h1_highscores.png","images/layout/h1_title.png");
</script>
</head>

<body>
<div id="wrapper">
	<h1>Zombie Chickens</h1>
	<div id="content">
		<?php print_content(); ?>
	</div>
	<div id="nav">
		<ul>
			<li id="game"<?php if(($page!="highscores")&&($page!="about")) echo ' class="current"';?>><a href="<?=$prefix;?>">Play Zombie Chickens</a></li>
			<li id="highscores"<?php if($page=="highscores") echo ' class="current"';?>><a href="<?=$prefix;?>highscores">Highscores Table</a></li>
			<li id="about"<?php if($page=="about") echo ' class="current"';?>><a href="<?=$prefix;?>about">About Zombie Chickens</a></li>
		</ul>
		
		<?php if($page == "game"){ ?>
		<div id="controls">
			<a href="#sound" id="sound_link" class="sound_on"></a>
			<?php /* <a href="#reset" id="reset_link"></a>
			<a href="#add" id="add_link"></a>*/ ?>
		</div>
		<?php
		}
		?>
	</div>
	<div id="footer">
		<div id="footer_large">Zombie Chickens artwork, graphics and concept copyright 2011: G.Cave, B.Selby, O.Williams</div>
		<div id="footer_small"><a href="http://www.designedbycave.co.uk/?ref=zombiechickens" target="_blank"></a></div>
	</div>
</div>
<div id="dev_banner"></div>
<script type="text/javascript">
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-23194499-1']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
</script>
</body>
</html>