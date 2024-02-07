Question.prototype.constructor = Question;

function Question(rows)
{
	this.questiontable = new QuestionTable(rows);
}

Question.prototype.markquestion = async function()
{
	let srb = this.questiontable.selectedrb;

	const response = await doFetch('Quiz','markanswer', {
			'selected':this.questiontable.selected,
			'rowindex':this.questiontable.rowindex
		});


	const markedanswer = await response.json();

	this.applymark(markedanswer.iscorrect,srb);
}

Question.prototype.applymark = function(iscorrect,selectedrb)
{
	if(selectedrb)
	{
		if(iscorrect)
		{
			this.questiontable[selectedrb].classList.remove("incorrect");
			this.questiontable[selectedrb].classList.add("correct");
		}
		else
		{
			this.questiontable[selectedrb].classList.remove("correct");
			this.questiontable[selectedrb].classList.add("incorrect");
		}
	}
}

