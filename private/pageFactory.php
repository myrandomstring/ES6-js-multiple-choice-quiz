<?php
require_once('QuizEditor.php');
require_once('Quiz.php');

session_start();

class PageFactory
{
    public static function isPageSerialized($pagename)
    {
         return isset($_SESSION[session_id()][strtolower($pagename)]);
    }

    public static function serializePage($page)
    {
        $serial = base64_encode(serialize($page));
        $_SESSION[session_id()][strtolower(get_class($page))] = $serial;
    }

    public static function unserializePage($pagename)
    {            
        $page = unserialize(base64_decode($_SESSION[session_id()][strtolower($pagename)]));
        return $page;
    }

    public static function producePage($pagename)
    {
        if (self::isPageSerialized($pagename))
        {
            $page = self::unserializePage($pagename);
        }
        else
        {
            // instantiate given name of class
            $page = new $pagename();
            
            // PHP<7.4 uses Serializable interface later versions use __magic methods
            if (isset(class_implements($pagename)['Serializable']) || array_key_exists("serializeObjectTrait",class_uses($page)))
            {
                self::serializePage($page);
            }
        }

        return $page;
    }    
}

?>
