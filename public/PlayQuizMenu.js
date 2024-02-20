var PlayQuizMenu = 
{
    show : function()
    {
        header.removeChildren();

        let next = fromhtml("<button id='nextquestion'>next question</button>");
        let previous = fromhtml("<button id='previousquestion'>previous question</button>");
        let mark = fromhtml("<button id='markquestion'>mark question</button>");
        let edit = fromhtml("<button id='editquiz'>edit quiz</button>");

        next = header.appendChild(next);
        previous = header.appendChild(previous);
        mark = header.appendChild(mark);
        edit = header.appendChild(edit);

        next.addEventListener("click",PlayQuizMenu.nextquestion,false);
        previous.addEventListener("click",PlayQuizMenu.previousquestion,false);
        mark.addEventListener("click",PlayQuizMenu.markquestion,false);
        edit.addEventListener("click",PlayQuizMenu.editquiz,false);
    },
    
    nextquestion : function()
    {
        window.quiz.render_next_question();
    },

    previousquestion : function()
    {
        window.quiz.render_previous_question();
    },

    markquestion : function()
    {
        window.quiz.mark_question();
    },

    editquiz : function()
    {
        EditQuizMenu.show();
        window.quizeditor.render_first_question();
    }
}
