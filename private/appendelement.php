<?php
require_once("extDOMElement.php");

trait AppendElement
{
    public function appendElement($name,$attributes = null)
    {
        $child = $this->appendChild(new extDOMElement($name));
        $child->setAttributes($attributes);
        return $child;
    }
}

?>
