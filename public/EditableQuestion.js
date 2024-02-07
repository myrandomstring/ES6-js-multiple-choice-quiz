EditableQuestion.prototype.constructor = EditableQuestion;

function EditableQuestion(rows)
{
	this.questiontable = new EditableQuestionTable(rows);
}
