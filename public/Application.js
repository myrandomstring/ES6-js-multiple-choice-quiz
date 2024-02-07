var Application =
{
	createDOM : function()
	{
		document.body = document.createElement("body");

		const header = ce('div',{'id':'header'});
		const content = ce('div',{'id':'content'});
		const footer = ce('div',{'id':'footer'});

		document.body.appendChild(header);
		document.body.appendChild(content);
		document.body.appendChild(footer);

		wrapelement("header","header");
		wrapelement("content","content");
		wrapelement("footer","footer");
	},

	loadquizeditor : async function()
	{
		const response = await doFetch('QuizEditor','loadpage');
		
		let questions = await response.json();
		questions = questions.questions;

		let quizeditor = new QuizEditor();

		for(let i=0 ; i<questions.length ; i++)
		{
			let editable_question = new EditableQuestion(questions[i]);
			quizeditor.addquestion(editable_question);
		}

		window.quizeditor = quizeditor;
	},

	loadquiz : async function()
	{
		const response = await doFetch('Quiz','loadpage');
		
		let questions = await response.json();
		questions = questions.questions;
	
		let quiz = new Quiz();

		for(let i=0 ; i<questions.length ; i++)
		{
			let question = new Question(questions[i]);
			quiz.addquestion(question);
		}

		window.quiz = quiz;
	},

	renderfooter : function()
	{
		let humour = ["client-side rendering ... nice",
					  "time for the browser to do the work",
					  "separation of concerns ... gotcha",
					  "fetch API ... what? no callbacks?"];
		
		function animate()
		{
			footer.getElement().innerHTML = humour[0];
			// pop first element
			let front = humour.shift();
			humour.push(front);
		}

		animate();
		setInterval(animate,3000);
	}
}
