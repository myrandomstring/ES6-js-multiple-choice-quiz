QuestionTable.prototype = Object.create(Table.prototype);
QuestionTable.prototype.constructor = QuestionTable;

function QuestionTable(data)
{
	Table.call(this);
	this.table.setAttribute('id','questiontable');
	this.rowindex = data.rowindex;
	this.selected = 0;

	let labels = ["question","answer1","answer2","answer3","answer4"];

	for (let i=0 ; i<labels.length ; i++)
	{
		let rn = this.startrow();

		let ib = document.createElement("input");	
		ib.type = "text";
		ib.id = labels[i];

		ib.value = data[labels[i]];
		ib.readOnly = true;
		
		this.addcell(ib,rn);
		this[labels[i]] = ib;
		
		if (i > 0)
		{
			let rb = document.createElement("input");
			let rbid = 'rb'+i;

			rb.setAttribute('id',rbid);
			rb.setAttribute('type','radio');
			rb.setAttribute('name','answer');
			rb.dataset.selected = labels[i]
			rb.addEventListener("click",this.radioselected.bind(this),false);	

			this.addcell(rb,rn);
			this[rbid] = rb;
		}
	}
}

QuestionTable.prototype.clearmarks = function()
{
	var rbs = document.querySelectorAll('input[name="answer"]');

	for(let i=0 ; i<rbs.length ; i++)
	{
		rbs[i].classList.remove("correct");
		rbs[i].classList.remove("incorrect");
	}
}

QuestionTable.prototype.radioselected = function(event)
{
	if(this.selected != event.target.dataset.selected)
	{
		this.clearmarks();
	}

	this.selected = event.target.dataset.selected;
	this.selectedrb = event.target.id;
}
