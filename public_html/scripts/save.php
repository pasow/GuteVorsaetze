<?php
	$json = $_POST['json'];
	$file = "../json/".$json.".json";
	$params = $_POST['params'];
	//$jsonObject = json_encode($params);
	file_put_contents($file, $params, LOCK_EX);
?>