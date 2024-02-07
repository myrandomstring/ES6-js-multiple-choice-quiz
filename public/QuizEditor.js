class QuizEditor
{
	constructor()
	{
		this.questions = [];
		this.current_question_index = -1;
	}
}

QuizEditor.prototype.addquestion = function(question)
{
	if(this.questions.length == 0) this.current_question_index = 0;
	this.questions.push(question);
}

QuizEditor.prototype.render_first_question = function()
{
    content.removeChildren();
    
	if(this.questions.length)
	{
		this.current_question_index = 0;
		let question = this.questions[this.current_question_index];
    	content.appendChild(question.questiontable.table);
		EditQuizMenu.setSaveDeleteState(question);
	}
}

QuizEditor.prototype.render_next_question = function()
{
	if(this.questions.length)
	{
		this.current_question_index = this.current_question_index < this.questions.length-1 ? ++this.current_question_index : this.current_question_index;
		let question = this.questions[this.current_question_index];

		content.removeChildren();
		content.appendChild(question.questiontable.table);
		EditQuizMenu.setSaveDeleteState(question);
	}
}

QuizEditor.prototype.render_previous_question = function()
{
	if(this.questions.length)
	{
		this.current_question_index = this.current_question_index > 0 ? --this.current_question_index : 0;
		let question = this.questions[this.current_question_index];

		content.removeChildren();
		content.appendChild(question.questiontable.table);
		EditQuizMenu.setSaveDeleteState(question);
	}
}

QuizEditor.prototype.insert_question = function(event)
{
	if(this.questions.length < 5)
	{
		content.removeChildren();
		let question = new EditableQuestion();
		this.addquestion(question);
		content.appendChild(question.questiontable.table);
		this.current_question_index = this.questions.length-1;
		
		// have to commit to DB at insert time or the order of questions in the DB
		// could be different to the order in quiz depending on the order in which
		// they were saved
		this.save_question();
	}
}

QuizEditor.prototype.set_question_id = function(questionindex,questionid)
{
	this.questions[questionindex].questiontable.questionid = questionid;
}

QuizEditor.prototype.save_question = async function(event)
{
	let question_index = this.current_question_index;
	
	// will only be set if question is already in DB
	let question_id = this.questions[question_index].questiontable.questionid;

	const response = await doFetch(this.constructor.name,'savequestion', {
		'questiontable':this.questions[question_index].questiontable.stringify()
		});

	// if we were inserting a new question
	if(!question_id)
	{
		const questionid = await response.json();
		window.quizeditor.set_question_id(question_index,questionid.questionid);
	}

	
	this.questions[question_index].questiontable.state.setdelete();

	// if still rendering same question
	if(question_index == this.current_question_index)
	{
		EditQuizMenu.toggledelete();
	}
}

QuizEditor.prototype.delete_question = async function(event)
{
	if(this.questions.length)
	{
		content.removeChildren();
		
		// id will only be set if the question has come from the DB
		let questionid = this.questions[this.current_question_index].questiontable.questionid;	
		this.questions.splice(this.current_question_index,1);	
		
		// if removed last question
		if(this.current_question_index == this.questions.length)
		{
			--this.current_question_index;
		}
			
		if(this.questions.length)
		{
			let question = this.questions[this.current_question_index];
			content.appendChild(question.questiontable.table);
			EditQuizMenu.setSaveDeleteState(question);
		}

		// if question came from the DB remove from DB
		if (questionid != null)
		{
			const response = await doFetch(this.constructor.name,'deletequestion', {'questionid':questionid});
		}
	}
}
