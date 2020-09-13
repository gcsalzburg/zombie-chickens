<?php
if(!function_exists("db_connect")){
	include '/home/zc_gcave/db_inc/db.php';
	db_connect('zombie_chickens');
}
$start = $_POST['start'];
$start = preg_replace("/[^0-9]/","",$start);
if(!is_numeric($start) || ($start=='') || ($start<0)){
	$start = 0;
}
?>
<table>
	<thead>
		<tr>
			<th colspan="2">Name</th>
			<th>Score</th>
		</tr>
	</thead>
	<tbody>
		<?php			
		$query = "SELECT * FROM scores ORDER BY score DESC LIMIT ".$start.", 15";
		$result = mysql_query($query);
		$i=$start+1;
		if(mysql_num_rows($result) > 0){
			while($row = mysqli_fetch_array($result)){
				echo '<tr><td>'.$i.'</td><td>'.$row['name'].'</td><td>'.$row['score'].'</td></tr>';
				$i++;
			}
		}else{
			echo '<tr><td>'.$i.'<td>No scores found!</td></tr>';
		}
		?>
	</tbody>
</table>
