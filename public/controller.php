<?php
require_once("common.php");
require_once("pageFactory.php");

try
{
    $request = file_get_contents("php://input");
    $request = json_decoder($request,true);
    $request = $request["request"];
    $pagename = $request["pagename"];    
    $page = PageFactory::producePage($pagename);
    $page->handleRequest($request);    
    PageFactory::consumePage($page);
}
catch(Exception $e)
{
    trigger_error($e->getTraceAsString(),E_USER_NOTICE);
}

?>
