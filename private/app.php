<?php
require_once('extDOMImplementation.php');

class App
{
    private $doc;

    public function __construct()
    {
        $extDOMImp = new extDOMImplementation();    
        $this->doc = $extDOMImp->createDocument();

        $head = $this->doc->appendElement("head");

        $charset = $head->appendElement("meta");
        $charset->setAttributes(["charset"=>"UTF-8"]);

        $viewport = $head->appendElement("meta");
        $viewport->setAttributes(["name"=>"viewport","content"=>"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=0"]);

        $quizjs = $head->appendElement("script");
        $quizjs->setAttributes(["src"=>"Quiz.js"]);

        $quizeditorjs = $head->appendElement("script");
        $quizeditorjs->setAttributes(["src"=>"QuizEditor.js"]);

        $questionjs = $head->appendElement("script");
        $questionjs->setAttributes(["src"=>"Question.js"]);

        $editablequestionjs = $head->appendElement("script");
        $editablequestionjs->setAttributes(["src"=>"EditableQuestion.js"]);

        $tablejs = $head->appendElement("script");
        $tablejs->setAttributes(["src"=>"Table.js"]);

        $questiontablejs = $head->appendElement("script");
        $questiontablejs->setAttributes(["src"=>"QuestionTable.js"]);

        $editablequestiontablejs = $head->appendElement("script");
        $editablequestiontablejs->setAttributes(["src"=>"EditableQuestionTable.js"]);

        $elementwrapper = $head->appendElement("script");
        $elementwrapper->setAttributes(["src"=>"elementwrapper.js"]);

        $onapploadjs = $head->appendElement("script");
        $onapploadjs->setAttributes(["src"=>"onappload.js"]);

        $utilitiesjs = $head->appendElement("script");
        $utilitiesjs->setAttributes(["src"=>"utilities.js"]);
        
        $playquizmenujs = $head->appendElement("script");
        $playquizmenujs->setAttributes(["src"=>"PlayQuizMenu.js"]);
        
        $editquizmenujs = $head->appendElement("script");
        $editquizmenujs->setAttributes(["src"=>"EditQuizMenu.js"]);
        
        $applicationjs = $head->appendElement("script");
        $applicationjs->setAttributes(["src"=>"Application.js"]);
        
        $savedeletestatejs = $head->appendElement("script");
        $savedeletestatejs->setAttributes(["src"=>"SaveDeleteState.js"]);
        
        $appcss = $head->appendElement("link",["rel"=>"stylesheet","type"=>"text/css","href"=>"app.css"]);
    }    

    public function saveHTML()
    {
        header("Content-Type:text/html;charset:UTF-8");
        return "<!DOCTYPE html>\n".$this->doc->saveHTML();
    }
}

?>
