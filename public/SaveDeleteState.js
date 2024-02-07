SaveDeleteState.prototype.constructor = SaveDeleteState;

function SaveDeleteState()
{
	this.state = "delete";
}

SaveDeleteState.prototype.setdelete = function()
{
	this.state = "delete";
}

SaveDeleteState.prototype.setsave = function()
{
	this.state = "save";
}

SaveDeleteState.prototype.isdelete = function()
{
	if (this.state == "delete")
	{
		return true;
	}

	return false;
}

SaveDeleteState.prototype.issave = function()
{
	if (this.state == "save")
	{
		return true;
	}

	return false;
}
