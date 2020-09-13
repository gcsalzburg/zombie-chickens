<?php
if(!function_exists("db_connect")){
	include '/home/zc_gcave/db_inc/db.php';
	db_connect('zombie_chickens');
}

if(!isset($_POST['score']) || !isset($_POST['username'])){
	$failure = 3;
	echo $failure;
	exit();
}
$score = $_POST['score'];
$username = $_POST['username'];

if(($score == '')||($username == '')){
	$failure = 4;
	echo $failure;
	exit();
}elseif(!is_numeric($score)){
	$failure = 5;
	echo $failure;
	exit();
}

// Clean usernames and score!!
$username = preg_replace("/[^a-zA-Z0-9_\-!#* ]/","",$username);
$score = preg_replace("/[^0-9]/","",$score);

$username = trim($username);

if(strlen($username) > 40){ //<- 60 picked as sensible limit. Could be much higher
	$failure = 6;
	echo $failure;
	exit();
}
if($username == "Enter your name"){
	$failure = 7;
	echo $failure;
	exit();
}

// Now insert the score at last!
$query = "INSERT INTO scores (name,score,ip,ts) VALUES ('".$username."','".$score."','".$_SERVER['REMOTE_ADDR']."','".time()."')";

$result = mysql_query($query);
if($result){
	$failure = 0;
}else{
	$failure = 1;
	echo $failure;
	exit();
}

$is_ajax = array_key_exists('HTTP_X_REQUESTED_WITH', $_SERVER) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest';

if(!$is_ajax){
	header('Location: ../../index.php');
}else{
	echo $failure;
}
?>