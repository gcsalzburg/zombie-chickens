<div id="splash_img">
	<a href="#go" id="play_link"><img src="images/static/instructions_splash1.jpg" /></a>
	<div id="turret_ani"><img src="images/static/turret_homepage.png" /></div>
</div>
<div id="game_div"><canvas id="canvas" width="850" height="530">Canvas not supported.</canvas></div>

<div id="save_highscore">
	<h2>Save Highscore</h2>
	<p>Congratulations! Add your highscore of <strong id="score">0</strong> to the highscore table now!</p>
	<form>
		<input type="text" name="zc_username" id="zc_username" value="Enter your name" />
	</form>
	<p style="text-align:center;"><a href="#save" id="save_link">Save score!</a><span id="score_loading"><img src="images/icons/score_loading.gif" /></span></p>
	<div id="close_button">
		<a href="#close" id="close_link"><img src="images/icons/close.png" /></a>
	</div>
</div>

<script src="game/webcontent/utilities.js"></script>
<script src="game/webcontent/physics.js"></script>
<script src="game/webcontent/globals.js"></script>
<script src="game/webcontent/objects.js"></script>
<script src="game/webcontent/sounds.js"></script>
<script src="game/webcontent/buttonactions.js"></script>
<script src="game/webcontent/zc.js"></script>
<script src="includes/js/game.js"></script>