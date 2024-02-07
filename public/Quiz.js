Quiz.prototype.constructor = Quiz;

function Quiz()
{
	this.questions = [];
	this.current_question_index = -1;
}

Quiz.prototype.addquestion = function(question)
{
	this.questions.push(question);
}

Quiz.prototype.render_next_question = function()
{
	if (this.questions.length)
	{
		this.current_question_index = this.current_question_index < this.questions.length-1 ? ++this.current_question_index : this.current_question_index;
		let question = this.questions[this.current_question_index];

		content.removeChildren();
		content.appendChild(question.questiontable.table);
	}
}

Quiz.prototype.render_previous_question = function()
{
	if (this.questions.length)
	{
		this.current_question_index = this.current_question_index > 0 ? --this.current_question_index : 0;
		let question = this.questions[this.current_question_index];

		content.removeChildren();
		content.appendChild(question.questiontable.table);
	
	}
}

Quiz.prototype.mark_question = function()
{
	if (this.questions.length)
	{
		this.questions[this.current_question_index].markquestion();
	}
}	
