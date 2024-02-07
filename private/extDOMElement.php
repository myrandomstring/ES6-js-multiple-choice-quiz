<?php
require_once("extDOMDocument.php");
require_once("serializeObjectTrait.php");
require_once("appendelement.php");

class extDOMElement extends DOMElement
{
	use AppendElement;
    
	public function setAttributes($att_val)
    {
		if(is_array($att_val))
		{
			foreach($att_val as $att=>$val)
			{
				$attribute = $this->setAttribute($att,$val);
			}
		}
    }

	public function removeAttributes($atts)
	{
		foreach($atts as $att)
		{
			$this->removeAttribute($att);
		}
	}

	public function setStyle($style)
	{
		$s = "";

		foreach($style as $attr=>$value)
		{
			$s .= $attr.":".$value.";";
		}
		
		$this->setAttribute("style",$s);
	}

    public function setNodeValue($strvalue)
    {
		$this->nodeValue = htmlspecialchars($strvalue);
	}

    public function appendNodeValue($strvalue)
    {
		$this->nodeValue .= htmlspecialchars($strvalue);
    }
}
?>
