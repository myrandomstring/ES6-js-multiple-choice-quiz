EditableQuestionTable.prototype = Object.create(Table.prototype);
EditableQuestionTable.prototype.constructor = EditableQuestionTable;

function EditableQuestionTable(data={})
{
	Table.call(this);
	this.table.setAttribute('id','questiontable');

	// JSON stringify won't handle null so use 0
	this.questionid = 0;

	// default is to select first answer
	this.selected = 'answer1';

	this.selectedrb = null;
	this.map_answerid_rbid = [];
	this.state = new SaveDeleteState();

	let rn = this.startrow();
	
	let ib = document.createElement("input");	
	ib.type = "text";
	ib.id = "question";
	ib.value = "question"; 
	ib.addEventListener("focus",this.textinputselected.bind(this),false);
	this.addcell(ib,rn);
	this["question"] = ib;
	
	let labels = ["answer1","answer2","answer3","answer4"];
	
	for (let i=0 ; i<labels.length ; i++)
	{
		let rn = this.startrow();
		
		let ib = document.createElement("input");	
		ib.type = "text";
		ib.id = labels[i];
		ib.value = labels[i]; 
		ib.addEventListener("focus",this.textinputselected.bind(this),false);
		this.addcell(ib,rn);
		
		let rb = document.createElement("input");
		let rbid = 'rb'+i;
		
		rb.setAttribute('id',rbid);
		rb.setAttribute('type','radio');
		rb.setAttribute('name','answer');
		rb.dataset.selected = labels[i];
		
		if (i==0) rb.setAttribute('checked','checked');
		
		rb.addEventListener("click",this.radioselected.bind(this),false);	

		this.addcell(rb,rn);
		
		this[rbid] = rb;
		this[labels[i]] = ib;
		this.map_answerid_rbid[labels[i]] = rb;
	}

	this.populate(data);
}

EditableQuestionTable.prototype.populate = function(data)
{
	if(Object.keys(data).length)
	{
		this.question.value = data.question;
		
		this.answer1.value = data.answer1;
		this.answer2.value = data.answer2;
		this.answer3.value = data.answer3;
		this.answer4.value = data.answer4;
		
		this.questionid = data.id;
		this.selected = data.correct;
		
		this['rb0'].setAttribute("checked","unchecked");
		this.map_answerid_rbid[data.correct].setAttribute("checked","checked");
	}
}

EditableQuestionTable.prototype.textinputselected = function(event)
{
	EditQuizMenu.togglesave();
	this.state.setsave();
}

EditableQuestionTable.prototype.radioselected = function(event)
{
	if(this.selectedrb != event.target.id)
	{
		EditQuizMenu.togglesave();
		this.state.setsave();
	}

	this.selected = event.target.dataset.selected;
	this.selectedrb = event.target.id;
}

EditableQuestionTable.prototype.stringify = function(event)
{
	let qtstr = {
		'questionid':this.questionid,
		'question':this.question.value,
		'answer1':this.answer1.value,
		'answer2':this.answer2.value,
		'answer3':this.answer3.value,
		'answer4':this.answer4.value,
		'selected':this.selected
	};
	
	return qtstr;
}
