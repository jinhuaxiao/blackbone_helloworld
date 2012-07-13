<?php
try {

	$content = array();

	//$con = mysql_connect('localhost', 'USERNAME', 'PASSWORD');
	$con = mysql_connect('localhost', '', '');
	mysql_select_db('test', $con);
    mysql_query("INSERT INTO log SET date=NOW(), content='GET=".json_encode($_GET)."\nPOST=".json_encode($_POST)."';");


	/** READ **/
	if ( $_SERVER['REQUEST_METHOD'] == "GET" ) {
		// If the ID is set, get the record with that ID
		$extra = array_key_exists('id', $_GET) ? " WHERE id = ".$_GET['id'] : null;
		$r = mysql_query("SELECT * FROM people".$extra);
		
		if ($extra) {
			// If the ID is set, fetch one record
			$content = mysql_fetch_assoc($r);
		}
		else {
			// Fetch all of the records if no ID is set
			for($i = mysql_num_rows($r); $i > 0 ; $i--) {
				$content[] = mysql_fetch_assoc($r);
			}

			echo $content;
		}
		// Encode it as JSON and ship it back
		echo json_encode($content);
	}
	/** UPDATE or DELETE **/
	else if ( array_key_exists ("_method", $_POST) ) {
		// Don't bother doing anything here. We don't really need it for the demo
	}
	/** CREATE **/
	else {
		// Just return a model. Don't bother actually creating it and returning the new record
		$data = array( "id" => 1, "name" => "Joe Zim", "age" => 23 );
		// Encode it as JSON and ship it back
		echo json_encode($data);
	}
	


} catch(Exception $e) {
	echo $e."\n";
}

