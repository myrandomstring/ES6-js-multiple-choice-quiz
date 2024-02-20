<?php
require_once("extDOMElement.php");
require_once("appendelement.php");

class extDOMDocument extends DOMDocument
{
    use AppendElement;

    public function __construct()
    {
        parent::__construct();
    }

    public function __serialize()
    {
        return ["html"=>$this->saveHTML()];
    }
    
    public function __unserialize($serialized)
    {
        $status = $this->loadHTML($serialized["html"]);
        $this->registerNodeClass('DOMElement','extDOMElement');
        return $status;
    }

    public function createElement($name,$value = null)
    {
        $element = new extDOMElement($name);
        $element = $this->importNode($element);
        return $element;
    }
}

?>
