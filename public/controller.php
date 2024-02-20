<?php
require_once("common.php");
require_once("pageFactory.php");

try
{
    $request = file_get_contents("php://input");
    $request = json_decoder($request,true);
    
    if(array_key_exists("request",$request))
    {
        $request = $request["request"];
        
        if(array_key_exists("pagename",$request))
        {
            $pagename = $request["pagename"];    
            $page = PageFactory::producePage($pagename);
            $page->handleRequest($request);    
            PageFactory::consumePage($page);
            $page->sendresponse();
        }
    }
    else
    {
        sendresponse(["success"=>0]);
    }
}
catch(Exception $e)
{
    trigger_error($e->getTraceAsString(),E_USER_NOTICE);
    sendresponse(array("alert"=>ERROR));
}
?>
