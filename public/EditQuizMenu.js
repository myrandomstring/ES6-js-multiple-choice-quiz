var EditQuizMenu = 
{
    save_delete_button : null,
    
    show : function()
    {
        header.removeChildren();

        let next = fromhtml("<button id='nextquestion'>next question</button>");
        let previous = fromhtml("<button id='previousquestion'>previous question</button>");
        let play = fromhtml("<button id='playquiz'>play quiz</button>");
        let insert = fromhtml("<button id='insertquestion'>add question</button>");
    
        let save_delete_button = fromhtml("<button id='savedeletequestion' data-action='delete'>delete</button>");

        next = header.appendChild(next);
        previous = header.appendChild(previous);
        play = header.appendChild(play);
        insert = header.appendChild(insert);
    
        EditQuizMenu.save_delete_button = header.appendChild(save_delete_button);

        next.addEventListener("click",EditQuizMenu.nextquestion,false);
        previous.addEventListener("click",EditQuizMenu.previousquestion,false);
        play.addEventListener("click",EditQuizMenu.playquiz,false);
        insert.addEventListener("click",EditQuizMenu.insertquestion,false);

        EditQuizMenu.save_delete_button.addEventListener("click",EditQuizMenu.savedeletequestion,false);
    },
    
    nextquestion : function(event)
    {
        window.quizeditor.render_next_question();
    },

    previousquestion : function(event)
    {
        window.quizeditor.render_previous_question();
    },

    playquiz : function(event)
    {
        Application.loadquiz().then( () => {
            content.removeChildren();
            PlayQuizMenu.show();
            PlayQuizMenu.nextquestion();
        });
    },

    insertquestion : function(event)
    {
        // TODO alternatively use mutation observer on the content pane
        // or dispatch a custom event when a new table is added
        EditQuizMenu.toggledelete();

        window.quizeditor.insert_question();
    },
    
    togglesave : function(event)
    {
        EditQuizMenu.save_delete_button.textContent = "save";    
        EditQuizMenu.save_delete_button.dataset.action = "save";
    },

    toggledelete : function(event)
    {
        EditQuizMenu.save_delete_button.textContent = "delete";    
        EditQuizMenu.save_delete_button.dataset.action = "delete";
    },

    setSaveDeleteState : function(question)
    {
        if(question.questiontable.state.state == "delete")
        {
            EditQuizMenu.toggledelete();
        }
        else if(question.questiontable.state.state == "save")
        {
            EditQuizMenu.togglesave();
        }
    },
    
    savedeletequestion : function(event)
    {
        let action = EditQuizMenu.save_delete_button.dataset.action;

        if(action == "delete")
        {
            window.quizeditor.delete_question();
        }
        else if(action == "save")
        {
            window.quizeditor.save_question();
        }
    }
}
