<?php
	
	$data = json_decode(file_get_contents("php://input"));
	$dbhost= "127.0.0.1";
	$dbuser="root";
	$dbpass="";
	$dbname="mydthiscountdb";
	$dberror="could not connect to db";
	
	
	$conn= new PDO('mysql:host=127.0.0.1;dbname=mydthiscountdb;charset=utf8', 'root', '');
?>