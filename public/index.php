<?php
require_once('app.php');

session_start();

$app = new App();

echo($app->saveHTML());
?>
