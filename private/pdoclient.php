<?php
require_once("common.php");
trait PDOClient
{
    private function db_connect()
    {
        try
        {
            $dbconn = new PDO(DBHOST.DBNAME,STORED_PROC_USER,STORED_PROC_PWD);
            $dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $dbconn; 
        }
        catch(PDOException $e)
        {
            trigger_error($e->getMessage(),E_USER_WARNING);
            sendresponse(array("alert"=>DBERROR));
        }
        catch(Exception $e)
        {
            trigger_error($e->getMessage(),E_USER_WARNING);
            sendresponse(array("alert"=>ERROR));
        }
    }
}
?>
