<?php
require_once('pdoclient.php');
require_once('common.php');

class QuizEditor
{
	use PDOClient;

	private $response;

	public function __construct()
	{
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

	private function updatequestion($q,$questionid)
	{
		$dbconn = $this->db_connect();
		$sql = "CALL UpdateQandA(:id,:question,:answer1,:answer2,:answer3,:answer4,:correct)";
		$sth = $dbconn->prepare($sql);
		$sth->execute([":id"=>$questionid, ":question"=>$q["question"], ":answer1"=>$q["answer1"], ":answer2"=>$q["answer2"], ":answer3"=>$q["answer3"], ":answer4"=>$q["answer4"], ":correct"=>$q["selected"]]);
	}


	private function insertquestion($q)
	{
		$dbconn = $this->db_connect();
		$dbconn->beginTransaction();

		$sql = "CALL InsertQandA(:q,:a1,:a2,:a3,:a4,:c,@id)";
		$sth = $dbconn->prepare($sql);
		
		$sth->execute([":q"=>$q["question"], ":a1"=>$q["answer1"], ":a2"=>$q["answer2"], ":a3"=>$q["answer3"], ":a4"=>$q["answer4"], ":c"=>$q["selected"]]);
	
		$sql = "SELECT @id";
		$pdoso = $dbconn->query($sql);	
		$out_params = $pdoso->fetch(PDO::FETCH_ASSOC);

        $id = $out_params["@id"];

		$dbconn->commit();

		$this->setresponse(["questionid"=>$id]);
	}


	public function handleRequest($request)
	{
		$this->response = [];
		
		if(array_key_exists("command",$request))
		{
			$command = $request["command"];
			
			if($command == "loadpage")
			{
				$qanda = $this->selectAllQandA();
				$this->setresponse(["questions"=>$qanda]);
			}
			else if($command == "savequestion")
			{
				if(array_key_exists("questiontable",$request))
				{
					$table = $request["questiontable"];

					if(array_key_exists("questionid",$table))
					{
						$questionid = $table["questionid"];
						
						if($questionid) 
						{
							$this->updatequestion($request["questiontable"],$questionid);
						}
						else
						{
							$this->insertquestion($request["questiontable"]);
						}
					}
				}
			}
			else if($command == "deletequestion")
			{
				if(array_key_exists("questionid",$request))
				{
					$this->deleteQandAWhereId($request["questionid"]);
				}
			}
		}
	}

	private function deleteQandAWhereId($id)
	{
		$dbconn = $this->db_connect();
		$sql = "CALL DeleteQandAWhereId(:id)";
		$sth = $dbconn->prepare($sql);
		$sth->execute([":id"=>$id]);
	}

	
	private function selectAllQandA()
	{
		$dbconn = $this->db_connect();
		$sql = "CALL SelectAllQandA()";
		$sth = $dbconn->prepare($sql);
		$sth->execute();
		$questions = $sth->fetchAll(PDO::FETCH_ASSOC);

		return $questions;
	}
}

?>
