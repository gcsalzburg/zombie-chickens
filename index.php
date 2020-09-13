<?php
$depth = 0;
$page = "game";
$mod = "";
$title = "Zombie Chickens | ";


include 'db.php';
include 'includes/php/common.php';
db_connect('zombie_chickens');


if(isset($_GET['page'])){
	$page = ($_GET['page'] == "") ? $page : $_GET['page'];
}
$page = preg_replace("/[^a-zA-Z0-9_\-]/","",$page);

$include_page_path = "pages/".$page.".php";
$depth = 0;

/*
if(!file_exists($include_page_path)){
	$include_page_path = "pages/error-404.php";
	$page = "error-404";
}*/
		
// SORT TITLES...
$title .= ucfirst(str_replace("-"," ",$page));

/*
function print_head(){
	global $page;
	if($page == "error-404"){
		echo "<style type=\"text/css\">";
		echo "#bg_image1{background-image: url(../../images/backgrounds/cs10_black_smaller.jpg);}";
		echo "#content{width:355px;}";
		echo "</style>";
	}elseif($page == "contact"){
		echo "<style type=\"text/css\">";
		echo "#bg_image1{background-image: url(../../images/backgrounds/nc40_black_bw.jpg);}";
		echo "#content{width:500px; padding-left:410px;}";
		echo "</style>";
	}elseif($page != "home"){
		echo "<style type=\"text/css\">";
		echo "#bg_image1{background-image: none;}";
		echo "</style>";
	}
}*/

function print_content(){
	global $include_page_path;
	include $include_page_path;
}

include 'includes/php/template.php';
?>