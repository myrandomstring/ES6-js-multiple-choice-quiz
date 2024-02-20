<?php
require_once('pdoclient.php');
require_once('serializeObjectTrait.php');
require_once('common.php');

class Quiz
{
    use serializeObjectTrait;
    use PDOClient;

    private $questions;
    private $questions_with_answers;
    private $response;
    
    public function __construct()
    {
        $this->getData();
        $this->response = [];
    }

    public function sendresponse()
    {
        sendresponse($this->response);
    }

    private function setresponse($response)
    {
        $this->response = array_merge($this->response,$response);    
    }

    public function getData()
    {    
        $this->questions_with_answers = $this->selectAllQandA();
        $this->questions = $this->selectAllQ();
    }

    private function markanswer($rowindex,$selected)
    {
        if($this->questions_with_answers[$rowindex]["correct"] == $selected)
        {
            $this->setresponse(["iscorrect"=>1]);
        }
        else
        {
            $this->setresponse(["iscorrect"=>0]);
        }
    }

    public function handleRequest($request)
    {
        $this->response = [];
        
        if(array_key_exists("command",$request))
        {
            $command = $request["command"];

            if($command == "loadpage") 
            {
                $this->getData();
                $this->setresponse(["questions"=>$this->questions]);
            }
            else if($command == "markanswer")
            {
                if(array_key_exists("selected",$request) && array_key_exists("rowindex",$request))
                {
                    $selected = $request["selected"];
                    $rowindex = $request["rowindex"];
                
                    $this->markanswer($rowindex,$selected);
                }
            }
        }
    }


    private function selectAllQ()
    {
        $dbconn = $this->db_connect();
        $sql = "CALL SelectAllQ()";
        $sth = $dbconn->prepare($sql);
        $sth->execute();
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }
        

    private function selectAllQandA()
    {
        $dbconn = $this->db_connect();
        $sql = "CALL SelectAllQandA()";
        $sth = $dbconn->prepare($sql);
        $sth->execute();
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }
}

?>
