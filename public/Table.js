class Table
{
	constructor(id,classname)
	{
		this.table = document.createElement("table");
		this.cellattributes = {};
		this.cellstyle = {};	
		this.rows = [];
		this.mouseEnterHandler = null;
		this.mouseLeaveHandler = null;

		if(classname)
		{
			this.table.className = classname;
		}
		
		if(id)
		{
			this.table.id = id;
		}
	}
}

Table.prototype.startrow = function(id,classname,datasets)
{
	let tr = document.createElement("tr");

	if(id)
	{
		tr.id = id;
	}

	if(classname)
	{
		tr.className = classname;
	}

	if(datasets !== undefined)
	{
		for(let prop in datasets)
		{
			tr.dataset[prop] = datasets[prop];
		}
	}

	this.rows.push(this.table.appendChild(tr));

	return this.rows.length - 1;
}

Table.prototype.addcell = function(content,rownum)
{
	let td = document.createElement("td");

	if(this.mouseEnterHandler)
	{
		td.addEventListener('mouseenter',this.mouseEnterHandler,false);
	}

	if(this.mouseLeaveHandler)
	{
		td.addEventListener('mouseleave',this.mouseLeaveHandler,false);
	}

	if(typeof content === 'string' || content instanceof String || typeof content === 'number')
	{
		td.appendChild(document.createTextNode(content));
	}
	else if(content instanceof HTMLElement)
	{
		td.appendChild(content);
	}

	for(let att in this.cellattributes)
	{
		td[att] = this.cellattributes[att];
	}

	for(let prop in this.cellstyle)
	{
		td.style[prop] = this.cellstyle[prop];
	}

	if (rownum === undefined)
	{	
		rownum = this.rows.length - 1;
	}

	this.td = td;	
	this.rows[rownum].appendChild(td);
}

Table.prototype.add_to_cell = function(content)
{
	if(typeof content === 'string' || content instanceof String || typeof content === 'number')
	{
		this.td.appendChild(document.createTextNode(content));
	}
	else if(content instanceof HTMLElement)
	{
		this.td.appendChild(content);
	}
}

Table.prototype.cell_attribute = function(attr,value)
{
	this.cellattributes[attr] = value;
}

Table.prototype.clear_cell_attributes = function()
{
	this.cellattributes = {};
}

Table.prototype.cell_style = function(property,value)
{
	this.cellstyle[property] = value;
}

Table.prototype.clear_cell_style = function()
{
	this.cellstyle = {};
}

Table.prototype.set_cell_mouse_enter = function(handler)
{
	if(typeof handler === 'function')
	{
		this.mouseEnterHandler = handler;
	}
}

Table.prototype.set_cell_mouse_leave = function(handler)
{
	if(typeof handler === 'function')
	{
		this.mouseLeaveHandler = handler;
	}
}

Table.prototype.clear_cell_mouse_enter = function()
{
	this.mouseEnterHandler = null;
}

Table.prototype.clear_cell_mouse_leave = function()
{
	this.mouseLeaveHandler = null;
}

