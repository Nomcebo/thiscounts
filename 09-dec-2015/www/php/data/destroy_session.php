<?php 
	session_id('eml');
	session_start();
	session_destroy();
	session_commit();
?>
