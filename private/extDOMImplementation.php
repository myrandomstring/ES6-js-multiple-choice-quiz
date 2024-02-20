<?php
require_once("extDOMDocument.php");
class extDOMImplementation extends DOMImplementation
{   
    public function __construct()
    {
        //return $this->createDocument();
    }

    public function createDocument($namespaceURI=null, $qualifiedName='html', DOMDocumentType $docType=null)
    {    
        $doc = new extDOMDocument();
        $doc->appendChild(parent::createDocumentType('html','',''));
        $doc->registerNodeClass('DOMElement','extDOMElement');
        //$doc->validate();
        
        return $doc;
    }
}
?>
