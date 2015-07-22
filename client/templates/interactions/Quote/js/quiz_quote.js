Template.quizQuote.helpers({
    question_label: function () {
      if(this.question && this.question.length > 0){
        return this.question;
      }
      return this.quote;
    }
});
