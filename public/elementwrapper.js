function wrapelement(name,id)
{
	if(!this.hasOwnProperty(name))
	{
		this[name] = { 
						appendChild : function(child)
						{
							var e = document.getElementById(id);
							
							if(e)
							{
								var c = e.appendChild(child);
								return c;
							}
							else
							{
								return false;
							}
						}, 

						removeChildren : function()
						{
							var e = document.getElementById(id);
						
							if(e)
							{
								while(e.firstChild)
								{
									e.removeChild(e.firstChild);
								}
							}
						},

						getElement : function()
						{
							return document.getElementById(id);
						},

						hide : function()
						{
							var e = document.getElementById(id);
						
							if(e)
							{
								if (e.style.visibility == 'visible')
								{
									e.style.visibility = 'hidden';
								}
							}
						},

						show : function()
						{
							var e = document.getElementById(id);
						
							if(e)
							{
								if (e.style.visibility == 'hidden')
								{
									e.style.visibility = 'visible';
								}
							}
						},

						showhide : function()
						{
							var e = document.getElementById(id);
						
							if(e)
							{
								if (e.style.visibility == 'hidden')
								{
									e.style.visibility = 'visible';
								}
								else if (e.style.visibility == 'visible')
								{
									e.style.visibility = 'hidden';
								}
							}
					    }
					};
	}
}
					

					
