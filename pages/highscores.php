<h2 id="highscores">Highscores</h2>
<p>Check on your progress against your friends on the highscore table below!</p>
<div id="left_arrow"><a href="#" id="left_arrow_link"></a></div>
<div id="scores_holder">
	<div class="scores_list" id="left_list">
		<?php
		$_POST['start'] = 0;
		include 'includes/scores/get_scores.php';
		?>
	</div>
	<div class="scores_list" id="right_list">
		<?php
		$_POST['start'] = 15;
		include 'includes/scores/get_scores.php';
		?>	
	</div>
	<div class="clearboth"></div>
</div>
<div id="right_arrow" data-start="30"><a href="#" id="right_arrow_link"></a></div>
<script src="includes/js/highscores.js"></script>