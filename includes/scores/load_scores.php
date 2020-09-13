<?php
if(!function_exists("db_connect")){
	include '/home/zc_gcave/db_inc/db.php';
	db_connect('zombie_chickens');
}

$query = "SELECT * FROM scores ORDER BY score DESC LIMIT 50";
$result = mysql_query($query);
if(mysql_num_rows($result) > 0){
	while($row = mysql_fetch_array($result)){
		echo $row['name'] . " [".$row['score']."]<br />";
	}
}else{
	echo '<p>No scores found!</p>';
}
?>