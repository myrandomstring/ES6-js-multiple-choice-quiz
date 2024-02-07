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

	public function serialize()
	{
		return $this->saveHTML();
	}
	
	public function unserialize($serialized)
	{
		$status = $this->loadHTML($serialized);
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
