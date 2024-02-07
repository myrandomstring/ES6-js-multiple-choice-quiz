<?php
require_once('utilities.php');

class QuestionValidator
{
	private function __construct() {}

	public static function validate($record)
	{
        $valid = true;
        self::$last_error = "";


		Utilities::validate_keys(["id","answer1","answer2","answer3","],$record);
        if(array_key_exists("id",$record))
        {
			// check is int
            //trigger_error("",E_USER_NOTICE);
            //$valid = false;
        }
        else
        {
			
            if(!is_string($record["mcq"]))
            {
                $valid = false;
                trigger_error("",E_USER_NOTICE);
            }
            else
            {
                if(strlen($record["mcq"]) > EXERCISES_TABLE_ANSWERS_LENGTH)

