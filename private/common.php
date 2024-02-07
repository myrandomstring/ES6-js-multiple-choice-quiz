<?php
define("DBHOST","mysql:host=localhost;");
define("DBNAME","dbname=quiz");

define("STORED_PROC_USER","user");
define("STORED_PROC_PWD","YOURPASSWORD");

define("DBERROR","an error occured");
define("ERROR","an error occured");


function sendresponse($array)
{
	echo(json_encode($array));
	exit();
}

function json_decoder($json,$assoc = false)
{
	$decode = json_decode($json,$assoc);

	if($decode === NULL && mb_strtolower($json) !== 'null' && $json !== NULL)
	{
		trigger_error("",E_USER_NOTICE);
		throw new Exception("json_decoder error ".json_last_error_msg());
	}
	else
	{
		return $decode;
	}
}

function log_message($message=null)
{
	$message = (!is_null($message)) ? $message : caller_bt();
	error_log(print_r($message,true));
}

function caller_bt()
{
	//error_log(print_r(debug_backtrace(),true));
	$bt = debug_backtrace();
	return "file ".$bt[1]['file']." line ".$bt[1]['line']." function ".$bt[1]['function'];
}

?>
