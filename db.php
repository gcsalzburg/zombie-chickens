<?
function db_connect($db){
	$host = 'mysql.designedbycave.co.uk'; 
	$username = 'mysql_zombie'; 
	$password = 'scea0tait@KEEM'; 
	$database = $db; 
	$connection = mysqli_connect($host, $username, $password, $database); 
}
?>